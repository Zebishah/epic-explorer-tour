import Bill from "../Models/Bill.js";
import HotelBookingHistory from "../Models/HotelBookingHistory.js";
import Hotels from "../Models/Hotels.js";
import Message from "../Models/Message.js";
import NotificationsAdmin from "../Models/NotificationsAdmin.js";
import Review from "../Models/Review.js";
import Room from "../Models/Room.js";
import RoomBill from "../Models/RoomBill.js";
import Tour from "../Models/Tour.js";
import ToursBookingHistory from "../Models/ToursBookingHistory.js";
import Transport from "../Models/Transport.js";
import TransportBill from "../Models/TransportBill.js";
import TransportBookingHistory from "../Models/TransportBookingHistory.js";
import User from "../Models/User.js";
import moment from "moment";

export const getDashboardCounts = async (req, res, next) => {
  let counts = {
    toursBooked: 0,
    transportBooked: 0,
    hotelBooked: 0,
    transactions: 0,
    totalUsers: 0,
    totalReviews: 0,
    totalTours: 0,
    totalTransport: 0,
    totalHotels: 0,
    totalRooms: 0,
    toursCustomers: 0,
  };
  let percentages = {
    toursBookedPercentage: 0,
    transportBookedPercentage: 0,
    hotelBookedPercentage: 0,
    tourPercentage: 0,
    transportPercentage: 0,
    roomPercentage: 0,
    totalUsersPercentage: 0,
    totalReviewsPercentage: 0,
  };
  try {
    counts.toursBooked = await ToursBookingHistory.find().countDocuments();
    counts.transportBooked = await TransportBookingHistory.find().countDocuments();
    counts.hotelBooked = await HotelBookingHistory.find().countDocuments();
    const tourBill = await Bill.find().countDocuments();
    const transportBill = await TransportBill.find().countDocuments();
    const roomBill = await RoomBill.find().countDocuments();
    counts.transactions = tourBill + transportBill + roomBill;
    counts.totalUsers = await User.find().countDocuments();
    counts.totalReviews = await Review.find().countDocuments();
    counts.totalTours = await Tour.find().countDocuments();
    counts.totalTransport = await Transport.find().countDocuments();
    counts.totalHotels = await Hotels.find().countDocuments();
    counts.totalRooms = await Room.find().countDocuments();

    // MongoDB queries to count records in the current month
    // Get current date
    const currentDate = new Date();

    // Calculate start of current month
    const startDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    );

    // Calculate end of current month
    const endDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    );

    // Format dates as ISODate strings
    const isoStartDate = startDate.toISOString();
    const isoEndDate = endDate.toISOString();
    const toursBooked = await ToursBookingHistory.find({
      createdAt: { $gte: isoStartDate, $lte: isoEndDate },
    }).countDocuments();
    const transportBooked = await TransportBookingHistory.find({
      createdAt: { $gte: isoStartDate, $lte: isoEndDate },
    }).countDocuments();
    const hotelBooked = await HotelBookingHistory.find({
      createdAt: { $gte: isoStartDate, $lte: isoEndDate },
    }).countDocuments();
    const totalTours = await Tour.find({
      createdAt: { $gte: isoStartDate, $lte: isoEndDate },
    }).countDocuments();
    const totalTransports = await Transport.find({
      createdAt: { $gte: isoStartDate, $lte: isoEndDate },
    }).countDocuments();
    const totalRooms = await Room.find({
      createdAt: { $gte: isoStartDate, $lte: isoEndDate },
    }).countDocuments();
    const totalUsers = await User.find({
      createdAt: { $gte: isoStartDate, $lte: isoEndDate },
    }).countDocuments();
    const totalReviews = await Review.find({
      createdAt: { $gte: isoStartDate, $lte: isoEndDate },
    }).countDocuments();

    percentages.toursBookedPercentage =
      (toursBooked / counts.toursBooked) * 100;
    percentages.transportBookedPercentage =
      (transportBooked / counts.transportBooked) * 100;
    percentages.hotelBookedPercentage =
      (hotelBooked / counts.hotelBooked) * 100;
    percentages.tourPercentage = (totalTours / counts.totalTours) * 100;
    percentages.transportPercentage =
      (totalTransports / counts.totalTransport) * 100;
    percentages.roomPercentage = (totalRooms / counts.totalRooms) * 100;
    percentages.totalUsersPercentage = (totalUsers / counts.totalUsers) * 100;
    percentages.totalReviewsPercentage =
      (totalReviews / counts.totalReviews) * 100;
  } catch (error) {
    return next(error);
  }

  return res.status(200).json({
    success: true,
    message: "here are your all counts",
    data: { counts, percentages },
    statusCode: 200,
  });
};

export const getUsers = async (req, res, next) => {
  let users = [];
  try {
    users = await User.find();
  } catch (error) {
    return next(error);
  }
  console.log(users);

  if (!users) {
    success = false;
    return res
      .status(400)
      .json({ success, message: "no users found in database" });
  }

  return res
    .status(200)
    .json({ success: true, message: "here are your all users", users: users });
};

export const getTourPayments = async (req, res, next) => {
  let payments = [];
  try {
    payments = await Bill.find();
  } catch (error) {
    return next(error);
  }
  console.log(payments);

  if (!payments) {
    success = false;
    return res
      .status(400)
      .json({ success, message: "no payments found in database" });
  }

  return res.status(200).json({
    success: true,
    message: "here are your all payments",
    payments: payments,
  });
};

export const getRoomPayments = async (req, res, next) => {
  let payments = [];
  try {
    payments = await RoomBill.find();
  } catch (error) {
    return next(error);
  }
  console.log(payments);

  if (!payments) {
    success = false;
    return res
      .status(400)
      .json({ success, message: "no payments found in database" });
  }

  return res.status(200).json({
    success: true,
    message: "here are your all payments",
    payments: payments,
  });
};

export const getTransportPayments = async (req, res, next) => {
  let payments = [];
  try {
    payments = await TransportBill.find();
  } catch (error) {
    return next(error);
  }
  console.log(payments);

  if (!payments) {
    success = false;
    return res
      .status(400)
      .json({ success, message: "no payments found in database" });
  }

  return res.status(200).json({
    success: true,
    message: "here are your all payments",
    payments: payments,
  });
};

export const getReviews = async (req, res, next) => {
  let reviews = [];
  try {
    reviews = await Review.find();
  } catch (error) {
    return next(error);
  }
  console.log(reviews);

  if (!reviews) {
    success = false;
    return res
      .status(400)
      .json({ success, message: "no reviews found in database" });
  }

  return res.status(200).json({
    success: true,
    message: "here are your all reviews",
    reviews: reviews,
  });
};

export const getAdminNotifications = async (req, res, next) => {
  let notifications = [];
  try {
    const startOfYesterday = moment().subtract(1, "days").startOf("day"); // 00:00:00 of yesterday
    const endOfToday = moment().endOf("day"); // 23:59:59 of today

    // Find notifications with date between start of yesterday and end of today
    notifications = await NotificationsAdmin.find({
      date: {
        $gte: startOfYesterday.toDate(),
        $lte: endOfToday.toDate(),
      },
    });
  } catch (error) {
    return next(error);
  }

  // Check if any notifications were found
  if (!notifications || notifications.length === 0) {
    return res.status(400).json({
      success: false,
      message: "No notifications found in database for the last day and today",
    });
  }

  // Return the found notifications
  return res.status(200).json({
    success: true,
    message: "Here are your notifications from the last day and today",
    notifications: notifications,
  });
};
export const clearAllNotifications = async (req, res, next) => {
  try {
    await NotificationsAdmin.deleteMany({}); // Deletes all notifications
    res.status(200).json({
      success: true,
      message: "All notifications deleted successfully",
    });
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, message: "Something went wrong, try again" });
  }
};
export const getAllRooms = async (req, res, next) => {
  let rooms = [];
  try {
    rooms = await Room.find();
  } catch (error) {
    return next(error);
  }
  console.log(rooms);

  if (!rooms) {
    success = false;
    return res
      .status(400)
      .json({ success, message: "no rooms found in database" });
  }

  return res
    .status(200)
    .json({ success: true, message: "here are your all rooms", rooms: rooms });
};

export const getAllTours = async (req, res, next) => {
  let tours = [];
  try {
    tours = await Tour.find();
  } catch (error) {
    return next(error);
  }
  console.log(tours);

  if (!tours) {
    success = false;
    return res
      .status(400)
      .json({ success, message: "no tours found in database" });
  }

  return res
    .status(200)
    .json({ success: true, message: "here are your all tours", tours: tours });
};

export const getAllTransport = async (req, res, next) => {
  let transports = [];
  try {
    transports = await Transport.find();
  } catch (error) {
    return next(error);
  }
  console.log(transports);

  if (!transports) {
    success = false;
    return res
      .status(400)
      .json({ success, message: "no transports found in database" });
  }

  return res.status(200).json({
    success: true,
    message: "here are your all transports",
    transports: transports,
  });
};

export const getAllHotels = async (req, res, next) => {
  let hotels = [];
  try {
    hotels = await Hotels.find();
  } catch (error) {
    return next(error);
  }
  console.log(hotels);

  if (!hotels) {
    success = false;
    return res
      .status(400)
      .json({ success, message: "no hotels found in database" });
  }

  return res.status(200).json({
    success: true,
    message: "here are your all hotels",
    hotels: hotels,
  });
};

export const getMessages = async (req, res, next) => {
  let messages = [];
  try {
    messages = await Message.find();
  } catch (error) {
    return next(error);
  }

  if (!messages) {
    success = false;
    return res
      .status(400)
      .json({ success, message: "no messages found in database" });
  }

  return res.status(200).json({
    success: true,
    message: "here are your all messages",
    messages: messages,
  });
};
