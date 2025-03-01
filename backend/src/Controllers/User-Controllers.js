import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import fetch from "node-fetch";
import StellarSdk from "stellar-sdk";
import { Server } from "stellar-sdk/lib/horizon/server.js";
const server = new Server("https://horizon-testnet.stellar.org/");
import Admin from "../Models/Admin.js";
import Token from "../Models/Token.js";
import stripePackage from "stripe";
import dotenv from "dotenv";
import express, { response } from "express";
import sendEmail from "../Utils/NodeMailer.js";
import tokenCreation from "../Utils/TokenCreator.js";
import BookTour from "../Models/BookTour.js";
import Tour from "../Models/Tour.js";
import BookingTour from "../Models/BookingTour.js";
import ToursBookingHistory from "../Models/ToursBookingHistory.js";
import Bill from "../Models/Bill.js";
import makingTourBill from "../Models/makingTourBill.js";
import TransportBookingHistory from "../Models/TransportBookingHistory.js";
import HotelBookingHistory from "../Models/HotelBookingHistory.js";
import StellarTransaction from "../Utils/Transaction.js";
import UserStellarTransaction from "../Utils/UserTransaction.js";
import NotificationsAdmin from "../Models/NotificationsAdmin.js";
import NotificationsUser from "../Models/NotificationsUser.js";
import User from "../Models/User.js";
import UserOTP from "../Models/UserOTP.js";
import notifyUsers from "../Utils/NotifyUser.js";
const app = express();
dotenv.config();
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripe = new stripePackage(stripeSecretKey);
let success = null;

import validator from "validator";
import CreateUser from "../Models/CreateUser.js";
import Message from "../Models/Message.js";

export const createUser = async (req, res, next) => {
  const {
    userName,
    email,
    password,
    confirmPassword,
    wishList,
    bookedTour,
    bookedHotels,
    bookedTransport,
    googleSign,
  } = req.body;
  console.log("inside signup");
  let phone = " ";
  let address = " ";
  let city = " ";
  let pic = " ";

  if (!validator.isEmail(email)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid email address" });
  }

  let user = await User.findOne({ email: email });
  if (user) {
    return res
      .status(400)
      .json({ success: false, message: "User already exists" });
  }
  let hashedPassword = password;
  if (password) {
    hashedPassword = await bcrypt.hash(password, 10);
  }

  const userKeypair = StellarSdk.Keypair.random();
  let userPublicKey = userKeypair.publicKey();
  let userPrivateKey = userKeypair.secret();
  let account;
  try {
    account = await server.loadAccount(userPublicKey);
  } catch (error) {
    if (error instanceof StellarSdk.NotFoundError) {
      try {
        await fetch(`https://friendbot.stellar.org/?addr=${userPublicKey}`);
        account = await server.loadAccount(userPublicKey);
      } catch (friendbotError) {
        return res.status(400).json({
          success: false,
          message: "Failed to create account using Friendbot",
        });
      }
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Failed to load account" });
    }
  }

  let Balance = 0;
  account.balances.forEach(function (balance) {
    if (balance.asset_type === "native") {
      Balance = balance.balance;
    }
  });
  let verifiedStatus;
  if (googleSign == "false") {
    verifiedStatus = "false";
  } else {
    verifiedStatus = "true";
  }
  let date = new Date();
  try {
    const newUser = new User({
      userName,
      email,
      password: hashedPassword,
      phone,
      address,
      city,
      pic,
      AccountId: userPublicKey,
      SecretSeed: userPrivateKey,
      Balance,
      verifiedStatus,
      bookedTour,
      bookedTransport,
      bookedHotels,
      wishList,
      googleSign,
    });

    await newUser.save();
    if (googleSign == "false") {
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      let otpExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
      let otpUser = new UserOTP({ email, otp, expiresAt: otpExpires });
      await otpUser.save();
      const options = {
        email: email,
        message: `Your account has been created successfully.And OTP for authentication is ${otp}`,
      };
      await sendEmail(options);
      let notificationAdmin = new NotificationsAdmin({
        accommodationName: "user Created Successfully",
        Category: "User Creation",
        message: `One user ${userName} is added to our site`,
        date,
      });
      await notificationAdmin.save();

      let data = {
        type: "User Creation",
        message: `${userName} Your Account created Successfully and otp sended to you `,
        date: date,
        title: "Account Created Successfully",
      };

      notifyUsers(data);
      let notificationUser = new NotificationsUser({
        user: userName,
        broadCast: "no",
        accommodationName: "Account Created Successfully",
        Category: "User Creationd",
        message: `${userName} Your Account created Successfully and otp sended to you`,
      });
      await notificationUser.save();
      return res.status(200).json({
        success: true,
        message: "Otp is send to ur email account",
        newUser,
      });
    }
    const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    let notificationAdmin = new NotificationsAdmin({
      accommodationName: "user Created Successfully",
      Category: "User Creation",
      message: `One user ${userName} is added to our site`,
      date,
    });
    await notificationAdmin.save();

    let data = {
      type: "User Creation",
      message: `${userName} Your Account created Successfully and otp sended to you `,
      date: date,
      title: "Account Created Successfully",
    };

    notifyUsers(data);
    let notificationUser = new NotificationsUser({
      user: userName,
      broadCast: "no",
      accommodationName: "Account Created Successfully",
      Category: "User Creationd",
      message: `${userName} Your Account created Successfully and otp sended to you`,
    });
    await notificationUser.save();
    return res.status(200).json({
      success: true,
      message: "Account created successfully",
      newUser,
      token,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error occurred while creating account",
      error: error.message,
    });
  }
};

export const userLogin = async (req, res, next) => {
  //getting user input from request Body
  let { email, password } = req.body;

  let user = req.user; //getting User from middleware

  const isCorrectPassword = bcrypt.compareSync(password, user.password);
  if (!validator.isEmail(email)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid email address" });
  }
  if (!isCorrectPassword) {
    return res
      .status(400)
      .json({ success: false, message: "wrong password", statusCode: 400 });
  }
  const payload = {
    id: user.id,
    createdAt: Date.now(), // Add createdAt timestamp
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  let date = new Date();

  let data = {
    type: "SignIn Successful",
    message: `${user.userName}you Signed In Successfully Successfully `,
    date: date,
    title: "Signed In Successfully",
  };

  notifyUsers(data);
  let notificationUser = new NotificationsUser({
    user: user.userName,
    broadCast: "no",
    accommodationName: "Signed In Successfully",
    Category: "SignIn Successful",
    message: `${user.userName}you Signed In Successfully Successfully `,
  });
  await notificationUser.save();
  return res.status(200).json({
    success: true,
    message: "User signed in successfully",
    user,
    statusCode: 200,
    token: token,
  });
};

export const resendOtp = async (req, res, next) => {
  //getting user input from request Body
  let { email } = req.body;
  console.log(email);
  let userReal = await User.findOne({ email: email });
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  let otpExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
  let user;
  try {
    user = await UserOTP.findOne({ email });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
  if (user) {
    let user2 = UserOTP.findOneAndDelete({ email: email });
    await user2.save();
  }
  try {
    let otpUser = new UserOTP({ email, otp, expiresAt: otpExpires });
    await otpUser.save();
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
  const options = {
    email: email,
    message: `Your account sended again Success.And OTP for authentication is ${otp}`,
  };
  await sendEmail(options);
  let date = new Date();

  let data = {
    type: "otp resend",
    message: `Your Otp resend Successfully to you `,
    date: date,
    title: "Signed In Successfully",
  };

  notifyUsers(data);
  let notificationUser = new NotificationsUser({
    user: userReal.userName,
    broadCast: "no",
    accommodationName: "Otp resend Successfull",
    Category: "otp resend",
    message: `Your Otp resend Successfully to you `,
  });
  await notificationUser.save();

  return res.status(200).json({
    success: true,
    message: "Otp resend successfully",
    email,
    statusCode: 200,
    otp: otp,
  });
};

export const verifyOTP = async (req, res, next) => {
  const { email, otp } = req.body;
  console.log(email, otp);
  let realUser;
  try {
    realUser = await User.findOne({ email: email });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
  try {
    const user = await UserOTP.findOne({ email, otp });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }
    await UserOTP.findOneAndDelete({ email: email, otp: otp });

    const options = {
      email: realUser.email,
      AccountId: realUser.AccountId,
      SecretSeed: realUser.SecretSeed,
      message: `Your account has been verified and created successfully. Here are your Stellar account attributes: AccountId ${realUser.AccountId} and SecretSeed ${realUser.SecretSeed} `,
    };
    try {
      await sendEmail(options, res);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }

    realUser.verifiedStatus = "true";
    realUser.save();
    let date = new Date();
    let notificationAdmin = new NotificationsAdmin({
      accommodationName: "user verified Successfully",
      Category: "userVerification",
      message: `One user ${realUser.userName} verified successfully`,
      date,
    });
    await notificationAdmin.save();

    let data = {
      type: "userVerification",
      message: `${realUser.userName}Your Account verified Successfully... `,
      date: date,
      title: "Account verified Successfully",
    };

    notifyUsers(data);
    let notificationUser = new NotificationsUser({
      user: realUser.userName,
      broadCast: "no",
      accommodationName: "Account verified Successfully",
      Category: "userVerification",
      message: `${realUser.userName}Your Account verified Successfully... `,
    });
    await notificationUser.save();

    return res.status(200).json({
      success: true,
      message: "User signed up successfully and verified",
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

//get all userss
export const getUsers = async (req, res, next) => {
  let user = await req.user; //getting User from middleware
  return res.status(200).json({
    success: true,
    message: "here are your all Users",
    user: user,
    statusCode: 400,
  });
};
export const checkUserBalance = async (req, res, next) => {
  //for checking admin stellar account balance
  // extracting token and validating admin
  let user = req.user;
  server
    .loadAccount(user.AccountId)
    .then((account) => {
      // Iterate through balances to find XLM balance
      let xlmBalance;
      account.balances.forEach((balance) => {
        if (balance.asset_type === "native") {
          xlmBalance = balance.balance;
        }
      });
      return res.status(200).json({
        success: true,
        message: "xlm balance is here:",
        Balance: xlmBalance,
        statusCode: 200,
      });
    })
    .catch((error) => {
      return res.status(500).json({
        success: false,
        message: "did'nt get balance",
        error: error,
        statusCode: 400,
      });
    });
};
export const deleteUser = async (req, res, next) => {
  let id = req.params.id;
  if (!id) {
    return res
      .status(400)
      .json({ success, message: "no id found", statusCode: 400 });
  }

  let deletedUser;
  try {
    deletedUser = await User.findByIdAndDelete(id); //deleting user after fetching given Id Tour
  } catch (error) {
    return next(error);
  }

  if (!deletedUser) {
    return res.status(400).json({
      success: false,
      message: "User not existed that u are trying to delete",
      statusCode: 400,
    });
  }
  let date = new Date();
  let notificationAdmin = new NotificationsAdmin({
    accommodationName: "user deleted Successfully",
    Category: "userDelete",
    message: `One user ${deletedUser.userName} is deleted from our site`,
    date,
  });
  await notificationAdmin.save();

  return res.status(200).json({
    success: true,
    message: "User deleted successfully",
    deletedUser: deletedUser,
    statusCode: 200,
  });
};
export const updateUser = async (req, res, next) => {
  let user = req.user;
  const { fullName, address, phoneNo, city, imageUrl } = req.body;
  console.log(fullName, address, phoneNo, city, imageUrl);
  if (!user) {
    return res
      .status(400)
      .json({ success: false, message: "user not existed" });
  }

  // Update user information
  user.userName = fullName || user.userName;
  user.phone = phoneNo || user.phone;
  user.address = address || user.address;
  user.city = city || user.city;
  user.pic = imageUrl || user.pic;

  await user.save();
  let date = new Date();
  let notificationAdmin = new NotificationsAdmin({
    accommodationName: "user updated successfully",
    Category: "User Updated",
    message: `one user ${user.userName} information is updated in our site`,
    date: date,
  });
  await notificationAdmin.save();

  let data = {
    type: "User Information updated",
    message: `${user.userName} Your information is updated Successfully `,
    date: date,
    title: "user updated successfully",
  };

  notifyUsers(data);
  let notificationUser = new NotificationsUser({
    user: user.userName,
    broadCast: "no",
    accommodationName: "user updated successfully",
    Category: "User Information updated",
    message: `${user.userName} Your information is updated Successfully `,
  });
  await notificationUser.save();

  return res
    .status(200)
    .json({ success: true, message: "user updated successfully", user: user });
};
export const updatePassword = async (req, res, next) => {
  let { oldPassword, newPassword, confirmPassword } = req.body;
  let user = req.user; //getting User from middleware

  if (confirmPassword !== newPassword) {
    return res.status(400).json({
      success: false,
      message: "passwords are not matching with each other",
      statusCode: 400,
    });
  }
  const isCorrectPassword = bcrypt.compareSync(oldPassword, user.password); //comparing Passwords
  if (!isCorrectPassword) {
    return res
      .status(400)
      .json({ success: false, message: "wrong old password", statusCode: 400 });
  }
  const hashedNewPassword = bcrypt.hashSync(newPassword, 10); //hashing new Password
  user.password = hashedNewPassword;
  await user.save();
  let date = new Date();
  let notificationAdmin = new NotificationsAdmin({
    accommodationName: "user Password Updated Successfully",
    Category: "userPassword",
    message: `One user ${user.userName} password updated Successfully`,
    date,
  });
  await notificationAdmin.save();

  let data = {
    type: "User Password Updated",
    message: `${user.userName} Your Account password updated Successfully `,
    date: date,
    title: "Your Account password Updated Successfully",
  };

  notifyUsers(data);
  let notificationUser = new NotificationsUser({
    user: user.userName,
    broadCast: "no",
    accommodationName: "Your Account password Updated Successfully",
    Category: "User Password Updated",
    message: `${user.userName} Your Account password updated Successfully`,
  });
  await notificationUser.save();

  return res.status(200).json({
    success: true,
    message: "password updated successfully",
    updatedUser: user,
    statusCode: 200,
  });
};
export const forgetPassword = async (req, res, next) => {
  let user = await req.user;
  // token creation
  let hash = await tokenCreation(user);

  try {
    console.log(user);
    //making reset URL
    const resetUrl = `http://localhost:5173/UpdatePassword/?email=${encodeURIComponent(
      user.email
    )}&hash=${encodeURIComponent(hash)}`;

    const message = `<p>Please click the following link to reset your password:</p>
              <p><a href="${resetUrl}">${resetUrl}</a></p>`;

    const options = { email: user.email, message: message };
    await sendEmail(options);

    return res.status(200).json({
      success: true,
      message: "Password reset link has been sent to your email.",
      hash,
      message,
      statusCode: 200,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Password reset link not sent to you.",
      statusCode: 400,
    });
  }
};
export const resetPassword = async (req, res, next) => {
  let user = await req.user;
  //getting User from middleware
  const hash = req.body.hash;

  if (!hash) {
    return res
      .status(400)
      .json({ success: false, message: "no hash found", statusCode: 400 });
  }
  try {
    console.log("hey");
    const token = await Token.findOne({ token: hash });
    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Invalid token found...",
        statusCode: 400,
      });
    }
    const salt = await bcrypt.genSalt(10); //hashing password by adding some salt(some extra hashing)
    user.password = await bcrypt.hash(req.body.password, salt);
    await user.save(); // Find and  update can be used
    await token.deleteOne();
    let date = new Date();
    let notificationAdmin = new NotificationsAdmin({
      accommodationName: "user Password Updated Successfully",
      Category: "userPassword",
      message: `One user ${user.userName} password updated Successfully`,
      date,
    });
    await notificationAdmin.save();

    let data = {
      type: "User Password Updated",
      message: `${user.userName} Your Account password updated Successfully `,
      date: date,
      title: "Your Account password Updated Successfully",
    };

    notifyUsers(data);
    let notificationUser = new NotificationsUser({
      user: user.userName,
      broadCast: "no",
      accommodationName: "Your Account password Updated Successfully",
      Category: "User Password Updated",
      message: `${user.userName} Your Account password updated Successfully`,
    });
    await notificationUser.save(); //deleting token that we made for reset
    res.status(200).json({
      success: true,
      message: "Password changed successfully.",
      statusCode: 200,
    });
  } catch (error) {
    res
      .status(400)
      .json({ success: false, error: error.message, statusCode: 400 });
  }
};

export const confirmOrder = async (req, res, next) => {
  let user = req.user; //getting User from middleware
  try {
    console.log("a gye");
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 105000, // Amount in cents
      currency: "pkr",
      // Verify your integration in this guide by including this parameter
      metadata: { integration_check: "accept_a_payment" },
    });
    return res.status(200).json({
      clientSecret: paymentIntent.client_secret,
      id: paymentIntent.id,
      name: user.name,
      email: user.email,
    });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ error: "An error occurred while creating PaymentIntent" });
  }
};

export const confirmOrders = async (req, res, next) => {
  console.log("a getUserById");
  let user = await req.user; //getting User from middleware
  let amount = 2000;

  try {
    // stripe payment session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "T-shirt",
            },
            unit_amount: amount, // Amount in cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `http://localhost:5173/Success/${amount}`, //url where wo go if our task will be successful
      cancel_url: "http://localhost:5173/Cancel", //url where wo go if our task will be unsuccessful
      customer_email: user.email,
      // clientReferenceId:
    });

    return res.json({
      sessionId: session,
      clientSecret: session.client_secret,
      amount: amount,
      statusCode: 200,
    });
  } catch (error) {
    return next(error);
  }
};
export const requestBalance = async (req, res, next) => {
  const { amount } = req.body;
  console.log("enter request balance ");
  let user = await req.user;
  try {
    const adminSecretKey = process.env.ADMIN_SECRET_SEED;
    const adminKeyPair = StellarSdk.Keypair.fromSecret(adminSecretKey);
    const adminPublicKey = adminKeyPair.publicKey();

    try {
      const account = await server.loadAccount(adminPublicKey);
      let xlm = (Number.parseFloat(amount) / 32.15).toFixed(7);
      let destinationAcc = user.AccountId;
      let response = await UserStellarTransaction(
        account,
        xlm,
        adminKeyPair,
        destinationAcc
      );
      let xlmAmount = Number(xlm); //here will use bill amount'
      // Update admin balance
      let admin = await Admin.findOne({
        AccountId: process.env.ADMIN_ACCOUNT_ID,
      });
      if (!admin) {
        return res.status(400).json({
          success: false,
          message: "admin not found",
          error: error,
          statusCode: 400,
        });
      }
      admin.Balance = Number(admin.Balance) - xlmAmount;
      await admin.save();
      // Update user balance
      user.Balance = Number(user.Balance) + xlmAmount;
      await user.save();
      let date = new Date();
      let notificationAdmin = new NotificationsAdmin({
        accommodationName: "Balance Request send Successfully",
        Category: "Requested Balance ",
        message: `one user ${user.userName} is requested ${amount} xlm balance `,
        date: date,
      });
      await notificationAdmin.save();

      let data = {
        type: "User Requested Balance",
        message: `${user.userName} You requested ${amount} xlm balance `,
        date: date,
        title: "Balance Request send Successfully",
      };

      notifyUsers(data);
      let notificationUser = new NotificationsUser({
        user: user.userName,
        broadCast: "no",
        accommodationName: "Balance Request send Successfully",
        Category: "User Requested Balance",
        message: `${user.userName} You requested ${amount} xlm balance`,
      });
      await notificationUser.save();
      return res.status(200).json({
        success: true,
        message: "Payment Successful",
        response,
        statusCode: 200,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: "Payment error",
        error: error,
        statusCode: 400,
      });
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Token is not authenticated...",
      error: error,
      statusCode: 400,
    });
  }
};

export const stellarPayment = async (req, res, next) => {
  console.log("hey");
  const { amount, SecretSeed } = req.body;
  let user = await req.user;
  let booksCount = 0;
  let tourId = req.params.id;
  console.log(SecretSeed);
  let xlm = (Number.parseFloat(amount) / 32.15).toFixed(7);
  const userSecretKey = SecretSeed;
  const userKeyPair = StellarSdk.Keypair.fromSecret(userSecretKey);

  // Admin account's public key
  const userPublicKey = userKeyPair.publicKey();

  let date = new Date();
  try {
    const account = await server.loadAccount(userPublicKey);

    if (parseFloat(account.balances[0].balance) < xlm) {
      return res.status(400).json({
        success: false,
        message:
          "Insufficient balance go and add balance in ur stellar account by paying ",
        balance: account.balances[0].balance,
        statusCode: 400,
      });
    }
    let destinationAcc = process.env.ADMIN_ACCOUNT_ID;
    const response = await StellarTransaction(
      account,
      xlm,
      userKeyPair,
      destinationAcc
    );

    try {
      const xlmAmount = Number(xlm);

      let admin = await Admin.findOne({
        AccountId: process.env.ADMIN_ACCOUNT_ID,
      }); //finding admin
      // updating admin balance
      admin.Balance = Number(admin.Balance) + xlmAmount;
      await admin.save();

      // updating User balance
      user.Balance = Number(user.Balance) - xlmAmount;
      await user.save();

      let tourBooking; //fetching the tour which is being in process for booking by user
      try {
        tourBooking = await BookingTour.findOne({ tourId: tourId });
      } catch (error) {
        return next(error);
      }
      if (!tourBooking) {
        return res.status(400).json({
          success: false,
          message: "This tour not existed ",
          statusCode: 400,
        });
      }
      let tourBooked; //checking that this tour booked information by that user is already in database or not
      try {
        tourBooked = await BookTour.findOne({
          tourId: tourBooking.tourId,
          bookerEmail: tourBooking.bookerEmail,
        });
      } catch (error) {
        return next(error);
      }

      if (tourBooked) {
        tourBooked.BooksCount = tourBooked.BooksCount + 1;
        booksCount = tourBooked.BooksCount;
        return res.status(400).json({
          success: false,
          message: "Tour already booked and existed ",
          statusCode: 400,
        });
      }

      let maxBookedTourNo; //incrementing the booked tour value if its already booked by user some other time
      try {
        const maxTourBooking = await BookTour.findOne(
          {},
          { bookedTourNo: 1 },
          { sort: { bookedTourNo: -1 } }
        );
        if (maxTourBooking) {
          maxBookedTourNo = maxTourBooking.bookedTourNo;
        } else {
          maxBookedTourNo = 0; // If no bookings exist yet, set the initial value
        }
      } catch (error) {
        return next(error);
      }

      try {
        //adding booked tour information in database

        const newBookedTourNo = maxBookedTourNo + 1;

        tourBooked = new BookTour({
          BooksCount: booksCount,
          bookedTourNo: newBookedTourNo,
          dropOffLocation: tourBooking.dropOffLocation,
          tourId: tourBooking.tourId,
          name: tourBooking.name,
          image: tourBooking.image,
          price: tourBooking.price,
          startDate: tourBooking.startDate,
          endDate: tourBooking.endDate,
          checkInDate: tourBooking.checkInDate,
          bookerName: tourBooking.bookerName,
          bookerEmail: tourBooking.bookerEmail,
          bookerPhone: tourBooking.bookerPhone,
          bookerAddress: tourBooking.bookerAddress,
          suggestion: tourBooking.suggestion,
          bookerId: user.id,
          members: tourBooking.suggestion,
          pickUpLocation: tourBooking.pickUpLocation,
        });

        tourBooked = await tourBooked.save();
      } catch (error) {
        return next(error);
      }
      let tourHistory; //checking booked tour information in booked tour history that its already present or not
      try {
        tourHistory = await ToursBookingHistory.findOne({
          tourId: tourId,
          bookerEmail: user.email,
        });
      } catch (error) {
        return next(error);
      }
      if (tourHistory) {
        return res.status(400).json({
          success: false,
          message: "Tour already existed ",
          statusCode: 400,
        });
      }

      let date = new Date(); //getting date
      let tour;

      try {
        tour = await Tour.findById(tourBooking.tourId); //adding booked tour information in database
        tourHistory = new ToursBookingHistory({
          tourId: tourBooking.tourId,
          name: tourBooking.name,
          Price: tourBooking.price,
          bookingDate: tourBooking.checkInDate,
          bookerName: tourBooking.bookerName,
          bookerEmail: tourBooking.bookerEmail,
        });
        await tourHistory.save();
        if (!tourHistory) {
          return res.status(400).json({
            success: false,
            message: "tour history you created is null",
            statusCode: 400,
          });
        }

        tour.bookers.push(user.id);
        tour.bookings.push(tourBooking.checkInDate); //updating attributes information of collections in database
        user.bookedTour.push(tourBooking.tourId);
        await tour.save(); //saving data after updating
        await user.save();
      } catch (error) {
        return next(error);
      }

      if (!tour) {
        success = false;
        return res
          .status(400)
          .json({ success: false, message: "Tour not existed " });
      }
      let bill,
        deliveryCharges = "free";
      try {
        //saving bill information and updating database data
        bill = new Bill({
          booking: tourBooked.id,
          bookerId: user.id,
          senderAccountId: user.AccountId,
          ReceiverAccountId: process.env.ADMIN_ACCOUNT_ID,
          booker: tourBooking.bookerName,
          deliveryCharges: deliveryCharges,
          totalPrice: tour.price,
          tourName: tour.name,
          date,
        });
        bill = await bill.save();
        await BookingTour.findOneAndDelete({
          tourId: tourBooking.tourId,
          bookerId: user.id,
        });
        await makingTourBill.findOneAndDelete({
          bookerId: user.id,
          booking: tourBooking.id,
        });
      } catch (error) {
        return next(error);
      }

      let notificationAdmin = new NotificationsAdmin({
        accommodationName: "Tour Payment  Successfully",
        Category: "Tour Payment",
        message: `one user ${tourHistory.bookerName} booked ${tourHistory.name} tour from our site and did Payment successfully`,
        date: date,
      });
      await notificationAdmin.save();

      let data = {
        type: "Tour Payment",
        message: `${tourHistory.bookerName} You booked ${tourHistory.name} tour successfully `,
        date: date,
        title: "Tour Payment Successfully",
      };

      notifyUsers(data);
      console.log(tourBooked.name);
      let notificationUser = new NotificationsUser({
        user: user.userName,
        broadCast: "no",
        accommodationName: "Tour Payment Successfully",
        Category: "Tour Payment",
        message: `${tourHistory.bookerName} You booked ${tourHistory.name} tour successfully`,
      });
      await notificationUser.save();
      const options = {
        email: tourBooked.bookerEmail,
        message: `Your Booked ${tourBooked.name}Tour  Successfully Now You are Eligible for This Tour. Your Status is Booking Successful`,
      };
      console.log(options);
      await sendEmail(options);
      return res.status(200).json({
        success: true,
        message: "Payment Successful",
        response: response,
        statusCode: 200,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: "Payment error",
        error: error,
        statusCode: 400,
      });
    }
  } catch (error) {
    return next(error);
  }
};
export const userTourBookings = async (req, res, next) => {
  let user = req.user; //getting User from middleware

  let TourBookings;
  try {
    // searching specific user tour bookings
    TourBookings = await ToursBookingHistory.find({ bookerEmail: user.email });
  } catch (error) {
    return next(error);
  }
  if (!TourBookings) {
    return res.status(400).json({
      success: false,
      message: "no TourBookings are here",
      statusCode: 400,
    });
  }

  return res.status(200).json({
    success: true,
    message: "here are your all TourBookings",
    TourBookings: TourBookings,
    statusCode: 200,
  });
};
export const userHotelBookings = async (req, res, next) => {
  let user = req.user; //getting User from middleware

  let HotelBookings;
  try {
    // searching specific user Hotel bookings
    HotelBookings = await HotelBookingHistory.find({ bookerEmail: user.email });
  } catch (error) {
    return next(error);
  }

  if (!HotelBookings) {
    return res.status(400).json({
      success: false,
      message: "no HotelBookings are here",
      statusCode: 400,
    });
  }

  return res.status(200).json({
    success: true,
    message: "here are your all HotelBookings",
    HotelBookings: HotelBookings,
    statusCode: 200,
  });
};
export const userTransportBookings = async (req, res, next) => {
  let user = req.user; //getting User from middleware

  let TransportBookings;
  try {
    // searching specific user Transport bookings
    TransportBookings = await TransportBookingHistory.find({
      bookerEmail: user.email,
    });
  } catch (error) {
    return next(error);
  }

  if (!TransportBookings) {
    return res.status(400).json({
      success: false,
      message: "no TransportBookings are here",
      statusCode: 400,
    });
  }

  return res.status(200).json({
    success: true,
    message: "here are your all TransportBookings",
    TransportBookings: TransportBookings,
    statusCode: 200,
  });
};

export const getUserInfo = async (req, res, next) => {
  let user = await req.user;
  let id = req.params.id; //getting User from middleware
  let userInfo;
  try {
    // fetching specific user info
    userInfo = await User.findById(id);
  } catch (error) {
    return next(error);
  }

  if (!userInfo) {
    return res.status(400).json({
      success: false,
      message: "no userInfo are here",
      statusCode: 400,
    });
  }
  return res.status(200).json({
    success: true,
    message: "here is your userInfo",
    userInfo: userInfo,
    statusCode: 200,
  });
};
export const getUserDetail = async (req, res, next) => {
  let user = await req.user;
  //getting User from middleware
  let userDetail;
  try {
    // fetching specific user info
    userDetail = await User.findById(user.id);
  } catch (error) {
    return next(error);
  }

  if (!userDetail) {
    return res.status(400).json({
      success: false,
      message: "no userDetail are here",
      statusCode: 400,
    });
  }
  return res.status(200).json({
    success: true,
    message: "here is your userDetail",
    userDetail: userDetail,
    statusCode: 200,
  });
};
export const getUserFrToken = async (req, res, next) => {
  let user = await req.user;
  //getting User from middleware
  let userInfo;
  try {
    // fetching specific user info
    userInfo = await User.findById(user.id);
  } catch (error) {
    return next(error);
  }

  if (!userInfo) {
    return res.status(400).json({
      success: false,
      message: "no userInfo are here",
      statusCode: 400,
    });
  }
  return res.status(200).json({
    success: true,
    message: "here is your userInfo",
    userInfo: userInfo,
    statusCode: 200,
  });
};
export const getUserFrEmail = async (req, res, next) => {
  let { email } = req.body; //getting User from middleware
  let userInfo;
  try {
    // fetching specific user info
    userInfo = await User.findOne({ email: email });
  } catch (error) {
    return next(error);
  }

  if (!userInfo) {
    return res.status(400).json({
      success: false,
      message: "no userInfo are here",
      statusCode: 400,
    });
  }
  return res.status(200).json({
    success: true,
    message: "here is your userInfo",
    userInfo: userInfo,
    statusCode: 200,
  });
};

export const stellarLedger = async (req, res, next) => {
  server
    .ledgers()
    .order("desc")
    .limit(10)
    .call()
    .then((response) => {
      const ledger = response.records[0];
      return res.status(200).json({
        success: true,
        message: "here is your ledger",
        ledger: ledger,
        statusCode: 200,
      });
    })
    .catch((error) => {
      return res.status(400).json({
        success: false,
        message: "no ledger are here",
        error,
        statusCode: 400,
      });
    });
};

export const searchUserStellarAcc = async (req, res, next) => {
  let { accountId } = req.body;
  const account = await server.loadAccount(accountId);
  if (!account) {
    return res.status(200).json({
      success: true,
      message: "here is your account",
      account: account,
      statusCode: 200,
    });
  } else {
    return res.status(400).json({
      success: false,
      message: "no account are here",
      error,
      statusCode: 400,
    });
  }
};

export const countUserBookedTours = async (req, res, next) => {
  let user = await req.user;
  console.log(user.email);
  let toursCount;
  try {
    toursCount = await ToursBookingHistory.countDocuments({
      bookerEmail: user.email,
    });
  } catch (error) {
    return next(error);
  }

  success = true;
  console.log(toursCount);
  res.status(200).json({
    success,
    message: "user booked that much tours",
    toursCount: toursCount,
  });
};

export const countUserTransactions = async (req, res, next) => {
  let user = await req.user;
  let toursCount;
  try {
    toursCount = await ToursBookingHistory.countDocuments({
      bookerEmail: user.email,
    });
  } catch (error) {
    return next(error);
  }
  let hotelsCount;
  try {
    hotelsCount = await HotelBookingHistory.countDocuments({
      bookerEmail: user.email,
    });
  } catch (error) {
    return next(error);
  }
  let transportCount;
  try {
    transportCount = await TransportBookingHistory.countDocuments({
      bookerEmail: user.email,
    });
  } catch (error) {
    return next(error);
  }
  const totalTransactions = toursCount + hotelsCount + transportCount;
  success = true;
  res.status(200).json({
    success,
    message: "User transactions Count",
    totalTransactions: totalTransactions,
  });
};

export const countUserBookedTransport = async (req, res, next) => {
  let user = await req.user;
  let transportCount;
  try {
    transportCount = await TransportBookingHistory.countDocuments({
      bookerEmail: user.email,
    });
  } catch (error) {
    return next(error);
  }

  success = true;
  console.log(transportCount);
  res.status(200).json({
    success,
    message: "user booked that much transport",
    transportCount: transportCount,
  });
};
export const countUserBookedRooms = async (req, res, next) => {
  let user = await req.user;
  let hotelsCount;
  try {
    hotelsCount = await HotelBookingHistory.countDocuments({
      bookerEmail: user.email,
    });
  } catch (error) {
    return next(error);
  }

  success = true;
  res.status(200).json({
    success,
    message: "user booked that much rooms",
    hotelsCount: hotelsCount,
  });
};

export const contactUs = async (req, res, next) => {
  let user = await req.user;
  let { firstName, lastName, email, message } = req.body;
  let messages;
  try {
    let fullName = `${firstName} ${lastName}`;

    // Create a new Message instance with the concatenated name and other properties
    messages = new Message({ name: fullName, email, message, userId: user.id });
    await messages.save(); //deleting token that we made for reset
  } catch (error) {
    return next(error);
  }

  success = true;
  res.status(200).json({
    success,
    message: "user booked that much rooms",
    message: messages,
  });
};
