import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import express, { response } from "express";
import Admin from "../Models/Admin.js";
import Transport from "../Models/Transport.js";
import BookTransport from "../Models/BookTransport.js";
import TransportBookingHistory from "../Models/TransportBookingHistory.js";
import Bill from "../Models/Bill.js";
import ItrenaryServicesTransport from "../Models/ItrenaryServicesTransport.js";
import BookingTransport from "../Models/BookingTransport.js";
import makingTransportBill from "../Models/makingTransportBill.js";
import TransportBill from "../Models/TransportBill.js";
import StellarSdk from "stellar-sdk";
import { Server } from "stellar-sdk/lib/horizon/server.js";
import StellarTransaction from "../Utils/Transaction.js";
import NotificationsAdmin from "../Models/NotificationsAdmin.js";
import NotificationsUser from "../Models/NotificationsUser.js";
import PublicNotifications from "../Models/PublicNotifications.js";
const server = new Server("https://horizon-testnet.stellar.org/");
import notifyUsers from "../Utils/NotifyUser.js";
import sendEmail from "../Utils/NodeMailer.js";
const app = express();
dotenv.config();
let success = null;
export const addTransport = async (req, res, next) => {
  let transportNo = 0;
  let date = new Date();
  let {
    carName,
    prices,
    seats,
    type,
    description,
    image,
    allowedGuests,
    available,
    features,
  } = req.body;
  let reviews = [],
    bookers = [],
    bookings = [],
    bookedCount = 0;
  let existingTransport;
  try {
    existingTransport = await Transport.findOne({ carName: carName });
  } catch (error) {
    return next(error);
  }
  if (existingTransport) {
    success = false;
    return res
      .status(400)
      .json({ success, message: "Transport already existed " });
  }
  let transport;
  try {
    transport = new Transport({
      carName,
      prices,
      seats,
      type,
      description,
      image,
      features,
      allowedGuests,
      reviews,
      available,
      bookers,
      bookings,
      bookedCount,
    });
    transport = await transport.save();
    let date = new Date();
    let notificationAdmin = new NotificationsAdmin({
      accommodationName: "New Transport Added Successfully",
      Category: "Transport Added",
      message: `One Transport ${carName} is added to our site`,
      date,
    });
    await notificationAdmin.save();
  } catch (error) {
    return next(error);
  }
  let data = {
    type: "Transport Added",
    message: `one new transport ${carName} is added `,
    date: date,
    title: "Transport Added Successfully",
  };

  notifyUsers(data);
  let notificationUser = new NotificationsUser({
    user: "no",
    broadCast: "yes",
    accommodationName: "Transport Added Successfully",
    Category: "Transport Added",
    message: `one new transport ${carName} is added`,
  });
  await notificationUser.save();
  return res.status(200).json({
    success: true,
    message: "New Transport is created",
    transport: transport,
  });
};
export const getTransport = async (req, res, next) => {
  let transport;
  try {
    transport = await Transport.find();
  } catch (error) {
    return next(error);
  }

  if (!transport) {
    success = false;
    return res
      .status(400)
      .json({ success, message: "no transport vehicles found in database" });
  }

  return res.status(200).json({
    success: true,
    message: "here are your all transport",
    transport: transport,
  });
};

export const filterTransport = async (req, res, next) => {
  let { type, prices, allowedGuests, seats, carName } = req.body;

  const queryObj = {};

  if (carName) {
    queryObj.carName = { $regex: new RegExp(`^${carName}`, "i") };
  }
  // Handle the type filter
  if (type && type.length > 0) {
    queryObj.type = { $in: type };
  }

  // Handle the noOfGuests filter
  if (allowedGuests && allowedGuests.length > 0) {
    queryObj.allowedGuests = { $in: allowedGuests };
  }

  // Handle the tourLocation filter
  if (seats && seats.length > 0) {
    queryObj.seats = { $in: seats };
  }
  // Handle the price filter
  if (prices.length > 0) {
    if (Array.isArray(prices)) {
      const priceRanges = prices.map((range) => {
        const [minPrice, maxPrice] = range.split("-").map(Number);
        return { prices: { $gte: minPrice, $lte: maxPrice } };
      });
      queryObj.$or = priceRanges;
    } else {
      const [minPrice, maxPrice] = prices.split("-").map(Number);
      queryObj.prices = { $gte: minPrice, $lte: maxPrice };
    }
  }

  console.log(queryObj);

  // Fetch tours based on the combined query object
  let filteredTransport;
  try {
    filteredTransport = await Transport.find(queryObj);
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Error fetching Transports", error });
  }

  if (!filteredTransport || filteredTransport.length === 0) {
    return res.status(404).json({
      success: false,
      message: "No Transports found with the given filter",
    });
  }
  return res.status(200).json({ success: true, transport: filteredTransport });
};

export const deleteTransport = async (req, res, next) => {
  let id = req.params.id;

  let adminId = req.userId;

  let deleteTransport;
  try {
    deleteTransport = await Transport.findByIdAndDelete(id);
  } catch (error) {
    return next(error);
  }

  if (!deleteTransport) {
    return res.status(400).json({
      success: true,
      message: "Transport not existed that u are trying to delete",
    });
  }
  let date = new Date();
  let notificationAdmin = new NotificationsAdmin({
    accommodationName: "New Transport deleted Successfully",
    Category: "Transport deleted",
    message: `One Transport ${carName} is deleted from our site`,
    date,
  });
  await notificationAdmin.save();
  let data = {
    type: "Transport Deleted",
    message: `one new transport ${carName} is Deleted `,
    date: date,
    title: "Transport Deleted Successfully",
  };

  notifyUsers(data);
  let notificationUser = new NotificationsUser({
    user: "no",
    broadCast: "yes",
    accommodationName: "Transport Deleted Successfully",
    Category: "Transport Deleted",
    message: `one new transport ${carName} is Deleted`,
  });
  await notificationUser.save();
  return res.status(200).json({
    success: false,
    message: "Transport deleted successfully",
    deleteTransport: deleteTransport,
    admin: adminId,
  });
};

export const updateTransport = async (req, res, next) => {
  let id = req.params.id;
  const {
    carName,
    prices,
    description,
    newImage,
    image,
    newFeature,
    available,
  } = req.body;

  let transport;
  try {
    transport = await Transport.findById(id);
  } catch (error) {
    return next(error);
  }

  if (!transport) {
    return res
      .status(400)
      .json({ success: false, message: "transport not existed" });
  }

  // Update tour information
  transport.carName = carName || transport.carName;
  transport.prices = prices || transport.prices;
  transport.description = description || transport.description;
  transport.available = available || transport.available;
  transport.image = image || transport.image;

  if (newImage) {
    transport.gallery.push(newImage);
  }

  if (newFeature) {
    transport.features.push(newFeature);
  }

  await transport.save();
  let date = new Date();
  let notificationAdmin = new NotificationsAdmin({
    accommodationName: "New Transport information updated Successfully",
    Category: "Transport updated",
    message: `One Transport ${carName} is updated in our site`,
    date,
  });
  await notificationAdmin.save();

  return res.status(200).json({
    success: true,
    message: "transport updated successfully",
    transport: transport,
  });
};

export const openTransport = async (req, res, next) => {
  let id = req.params.id;

  let transport;
  try {
    transport = await Transport.findById(id);
  } catch (error) {
    return next(error);
  }

  if (!transport) {
    return res.status(400).json({
      success: false,
      message: "transport not existed that u are trying to open",
    });
  }

  let transportServiceIt;
  try {
    transportServiceIt = await ItrenaryServicesTransport.findOne({
      transportId: id,
    });
  } catch (error) {
    return next(error);
  }

  if (!transportServiceIt) {
    return res.status(400).json({
      success: false,
      message: "Transport not existed that u are trying to open",
    });
  }

  return res.status(200).json({
    success: true,
    transport: transport,
    transportServiceIt: transportServiceIt,
  });
};

export const getFormData = async (req, res, next) => {
  //fetching Id from url parameters I
  let id = req.params.id;
  let {
    bookerName,
    bookerEmail,
    bookerPhone,
    bookerAddress,
    suggestion,
    members,
    days,
    dropOffLocation,
    pickUpLocation,
    checkInDate,
  } = req.body;
  let user = await req.user;

  let transport;
  try {
    transport = await Transport.findById(id);
  } catch (error) {
    return next(error);
  }

  if (!transport) {
    success = false;
    return res.status(400).json({
      success,
      message: "Transport not existed that u are trying to open",
    });
  }
  let date = new Date();
  let transportBookingCheck;
  try {
    transportBookingCheck = await BookingTransport.findOne({
      transportId: transport.id,
      bookerEmail: user.email,
    });
  } catch (error) {
    return next(error);
  }

  if (transportBookingCheck) {
    return res.status(400).json({
      success,
      message: "Transport already existed in booking database",
    });
  }
  let transportBooking;
  transport.prices = transport.prices * days; //calculating price according to days
  try {
    // tourNo = tourNo + 1;
    transportBooking = new BookingTransport({
      transportId: transport.id,
      checkInDate,
      carName: transport.carName,
      prices: transport.prices,
      checkInDate: date,
      bookerName,
      bookerEmail,
      bookerPhone,
      bookerAddress,
      suggestion,
      bookerId: user.id,
      members,
      days,
      seats: transport.seats,
      image: transport.image,
      dropOffLocation,
      pickUpLocation,
    });
    transportBooking = await transportBooking.save();
  } catch (error) {
    return next(error);
  }
  let bill,
    deliveryCharges = "free";

  try {
    bill = new makingTransportBill({
      booking: transportBooking.id,
      bookerId: user.id,
      booker: user.userName,
      deliveryCharges: deliveryCharges,
      totalPrice: transport.prices,
      transportName: transport.carName,
      date,
    });
    bill = await bill.save();
  } catch (error) {
    return next(error);
  }

  return res.status(200).json({
    success: true,
    message: "New Tour booking start do payment",
    bill: bill,
    transportBooking: transportBooking,
  });
};

export const transportPayment = async (req, res, next) => {
  const { amount, SecretSeed } = req.body;
  console.log(SecretSeed, amount);
  let user = await req.user;
  let booksCount = 0;
  let transportId = req.params.id;
  let xlm = (Number.parseFloat(amount) / 32.15).toFixed(7);
  const userSecretKey = SecretSeed;
  const userKeyPair = StellarSdk.Keypair.fromSecret(userSecretKey);
  console.log(userSecretKey);

  // Admin account's public key
  const userPublicKey = userKeyPair.publicKey();
  let date = new Date();
  try {
    const account = await server.loadAccount(userPublicKey);
    //checking that balance in user account is enough or not
    if (parseFloat(account.balances[0].balance) < xlm) {
      return res.status(400).json({
        success: false,
        message:
          "Insufficient balance go and add balance in ur stellar account by paying ",
        balance: account.balances[0].balance,
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
      // updating admin balance
      let admin = await Admin.findOne({
        AccountId: process.env.ADMIN_ACCOUNT_ID,
      });
      admin.Balance = Number(admin.Balance) + xlmAmount;
      await admin.save();
      // updating User balance
      user.Balance = Number(user.Balance) - xlmAmount;
      await user.save();

      let transportBooking; //fetching the transport which is being in process for booking by user
      try {
        transportBooking = await BookingTransport.findOne({
          transportId: transportId,
        });
      } catch (error) {
        return next(error);
      }

      let transportBooked; //checking that this transport booked information by that user is already in database or not
      try {
        transportBooked = await BookTransport.findOne({
          transportId: transportBooking.transportId,
          bookerEmail: transportBooking.bookerEmail,
        });
      } catch (error) {
        return next(error);
      }

      if (transportBooked) {
        transportBooked.BooksCount = transportBooked.BooksCount + 1;
        booksCount = transportBooked.BooksCount;
        return res.status(400).json({
          success: false,
          message: "Transport already booked and existed ",
        });
      }
      let maxBookedTransportNo; //incrementing the booked transport value if its already booked by user some other time
      try {
        const maxTransportBooking = await BookTransport.findOne(
          {},
          { bookedTransportNo: 1 },
          { sort: { bookedTransportNo: -1 } }
        );
        if (maxTransportBooking) {
          maxBookedTransportNo = maxTransportBooking.bookedTransportNo;
        } else {
          maxBookedTransportNo = 0; // If no bookings exist yet, set the initial value
        }
      } catch (error) {
        return next(error);
      }
      try {
        //adding booked transport information in database
        const newBookedTransportNo = maxBookedTransportNo + 1;
        transportBooked = new BookTransport({
          bookedTransportNo: newBookedTransportNo,
          transportId: transportBooking.transportId,
          image: transportBooking.image,
          carName: transportBooking.carName,
          prices: transportBooking.prices,
          seats: transportBooking.seats,
          checkInDate: transportBooking.checkInDate,
          bookerName: transportBooking.bookerName,
          bookerEmail: transportBooking.bookerEmail,
          bookerPhone: transportBooking.bookerPhone,
          bookerAddress: transportBooking.bookerAddress,
          suggestion: transportBooking.suggestion,
          bookerId: transportBooking.transportId,
          members: transportBooking.members,
          days: transportBooking.days,
          buyDate: date,
          BooksCount: booksCount,
          dropOffLocation: transportBooking.dropOffLocation,
          pickUpLocation: transportBooking.pickUpLocation,
        });
        transportBooked = await transportBooked.save();
      } catch (error) {
        return next(error);
      }
      let transportHistory;
      try {
        //checking booked transport information in booked tour history that its already present or not
        transportHistory = await TransportBookingHistory.findOne({
          transportId: transportId,
          bookerEmail: transportBooking.bookerEmail,
        });
      } catch (error) {
        return next(error);
      }
      if (transportHistory) {
        return res
          .status(400)
          .json({ success: false, message: "Transport already existed " });
      }

      let transport;
      try {
        transport = await Transport.findById(transportBooking.transportId);
        const checkIn = new Date(transportBooking.checkInDate);

        // Calculate the checkout date by adding the number of days
        const checkout = new Date(checkIn);
        checkout.setDate(checkout.getDate() + transportBooking.days);

        // Format the checkout date as YYYY-MM-DD
        const checkoutDate = checkout.toISOString().split("T")[0];

        transportHistory = new TransportBookingHistory({
          transportId: transportBooking.transportId,
          price: transportBooking.prices,
          carName: transportBooking.carName,
          bookingDate: transportBooking.checkInDate,
          bookersName: transportBooking.bookerName,
          bookerEmail: transportBooking.bookerEmail,
        });
        await transportHistory.save();
        transport.bookers.push(user.id);
        transport.bookings.push(transportBooking.checkInDate); //updating attributes information of collections in database
        user.bookedTransport.push(transportBooking.transportId);
        await transport.save(); //saving data after updating
        await user.save();
      } catch (error) {
        return next(error);
      }

      if (!transport) {
        return res
          .status(400)
          .json({ success: false, message: "Transport not existed " });
      }
      let transportBill,
        deliveryCharges = "free";

      try {
        //saving bill information and updating database data

        transportBill = new TransportBill({
          booking: transportBooked.id,
          bookerId: user.id,
          senderAccountId: user.AccountId,
          ReceiverAccountId: process.env.ADMIN_ACCOUNT_ID,
          booker: user.userName,
          deliveryCharges: deliveryCharges,
          totalPrice: transportBooking.prices,
          transportName: transportBooking.carName,
          date,
        });
        transportBill = await transportBill.save();
      } catch (error) {
        console.log(error);
        return next(error);
      }
      let delTransportBooking; //fetching the transport which is being in process for booking by user
      try {
        delTransportBooking = await BookingTransport.findOneAndDelete({
          transportId: transportId,
        });
      } catch (error) {
        return next(error);
      }

      let delTransportBill; //fetching the transport which is being in process for booking by user
      try {
        delTransportBill = await makingTransportBill.findOneAndDelete({
          bookerId: user.id,
        });
        console.log(delTransportBill);
      } catch (error) {
        console.log(error);
        return next(error);
      }

      let notificationAdmin = new NotificationsAdmin({
        accommodationName: `One Transport ${transport.carName} booked Successfully`,
        Category: "Transport booked",
        message: `one user ${transportHistory.bookersName} booked ${transportHistory.carName} tour from our site and did Payment successfully`,
        date,
      });
      await notificationAdmin.save();

      let data = {
        type: "Transport Booked",
        message: `You Booked transport ${transportHistory.carName} Successfully`,
        date: date,
        title: "Transport Booked Successfully",
      };

      notifyUsers(data);
      let notificationUser = new NotificationsUser({
        user: user.userName,
        broadCast: "no",
        accommodationName: "Transport Booked Successfully",
        Category: "Transport Booked",
        message: `You Booked transport ${transportHistory.carName} Successfully`,
      });
      await notificationUser.save();
      const options = {
        email: transportBooked.bookerEmail,
        message: `Your Booked ${transportBooked.carName} Transport Successfully Now You are Eligible for This Transport. Your Status is Booking Successful and You Booked this Transport From Us on Date:${transportBooked.checkInDate}`,
      };
      console.log(options);
      await sendEmail(options);
      return res.status(200).json({
        success: true,
        message: "Payment Successful",
        response: response,
        transportBooked: transportBooked,
        transportBill: transportBill,
      });
    } catch (error) {
      return res
        .status(400)
        .json({ success: false, message: "Payment error", error: error });
    }
  } catch (error) {
    console.log(error);
  }
};

export const countTransports = async (req, res, next) => {
  let TransportCounter;
  try {
    TransportCounter = await Transport.find().estimatedDocumentCount(); //counting total transport
  } catch (error) {
    return next(error);
  }

  if (!TransportCounter) {
    return res
      .status(400)
      .json({ success: false, message: "no Transports found" });
  }

  res.status(200).json({
    success: true,
    message: "here is your Transport count",
    TransportCounter: TransportCounter,
  });
};
export const searchTransportByName = async (req, res, next) => {
  let { name } = req.body;
  let Transports;
  try {
    Transports = await Transport.find({ name: name }); //search transport through name
  } catch (error) {
    return next(error);
  }

  if (!Transports) {
    success = false;
    return res
      .status(400)
      .json({ success, message: "no Transports found in database" });
  }
  return res.status(200).json({
    success: true,
    message: "here are your all Transports",
    Transports: Transports,
  });
};

export const searchTransportById = async (req, res, next) => {
  let id = req.body.id;
  let Transports;
  try {
    Transports = await BookTransport.find({ transportId: id }); //search transport through name
  } catch (error) {
    return next(error);
  }

  if (!Transports) {
    success = false;
    return res
      .status(400)
      .json({ success, message: "no Transports found in database" });
  }
  return res.status(200).json({
    success: true,
    message: "here are your all Transports",
    Transports: Transports,
  });
};

export const relatedTransport = async (req, res, next) => {
  let id = req.body.id;
  let transport;
  try {
    transport = await Transport.findById(id);
  } catch (error) {
    return next(error);
  }

  if (!transport) {
    return res
      .status(400)
      .json({ success: false, message: "no transport found in database" });
  }
  let finalTour = await Transport.find({ type: transport.type });

  return res.status(200).json({
    success: true,
    message: "here are your all transport",
    transport: finalTour,
  });
};

// const catchAsync=fn=>{
//     return(req,res,next)=>{
//         fn(req,res,next).catch(next)
//     }
// }
// class appError extends Error{
//     constructor(message,statusCode){
//         super(message)
//         this.statusCode=statusCode
//         this.isOperational=true;
//         this.status=`${statusCode}`.startsWith(4)?'fail':'error',
//         this.captureStackTrace(this,this.constructor)
//     }
// }
// app.all('*',(req,res,next)=>{
//     return next(new appError('This route not exists',400))
// })
// const errorProd=(err,res)=>{
//     if(err.isOperational)
//     res.status(err.statusCode).json({
//         message:err.message,
//         status:err.status,

//     })
// }
// const errorDev=(err,res)=>{
//     res.status(err.statusCode).json({
//         message:err.message,
//         status:err.status,
//         error:err,
//         stackTrace:err.stack
//     })
// }
// const getValidationError=err=>{
//     const error=Object.values(err.error).map(el=>message[el])
//     const message=`User ${error}`;
//     return new appError(message,404)
// }
// const castError=err=>{
//     const message=`Invalid ${err.path}:${err.value}`;
//     return new appError(message,400)
// }
// const duplicateKeyError=err=>{
//     const value=Object.keys(err.keyPatteran)[0];
//     const message=`Duplicate ${value}`;
//     return new appError(message,400)
// }
// module.exports=(err,req,res,next)=>{
//    let error={...err};
//    if(process.env.NODE_DEV='production'){
//     if(error.statusCode===500){
//         error=duplicateKeyError(error)
//     }
//     if(error.name==='CastError'){
//         error=castError(error)
//     }
//     if(error.ValidationError){
//         error=getValidationError;
//     }
// errorProd(err,res)
//    }else if(process.env.NODE_DEV='development'){
//     errorDev(err,res)
//    }
// }
