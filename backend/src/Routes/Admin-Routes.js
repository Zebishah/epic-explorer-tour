import express from 'express';
import { HotelBookings, TourBookings, TransportBookings, UserHotelBookings, UserTourBookings, UserTransportBookings, addBalance, adminLogin, checkBalance, createAdmin, getAdmins } from '../Controllers/Admin-Controllers.js';
import verifyToken from '../middleware/IdFromToken.js';
import getAdminByEmail from '../middleware/AdminFromEmail.js';
import getAllAdmin from '../middleware/AllAdmin.js';
import getAdminById from '../middleware/AdminFromId.js';
import { clearAllNotifications, getAdminNotifications, getAllHotels, getAllRooms, getAllTours, getAllTransport, getDashboardCounts, getMessages, getReviews, getRoomPayments, getTourPayments, getTransportPayments, getUsers } from '../Controllers/Dashboard.js';
const AdminRoutes = express.Router();

//Admin Routes

AdminRoutes.post('/createAdmin', getAdminByEmail, createAdmin);//create admin route

AdminRoutes.post('/adminLogin', getAdminByEmail, adminLogin);

AdminRoutes.get('/getAdmins', getAllAdmin, getAdmins);

AdminRoutes.post('/addBalance', verifyToken, getAdminById, addBalance);

AdminRoutes.get('/checkAdminBalance', verifyToken, getAdminById, checkBalance);

AdminRoutes.get('/HotelBookings', HotelBookings);

AdminRoutes.get('/TransportBookings', TransportBookings);

AdminRoutes.get('/TourBookings', TourBookings);

AdminRoutes.post('/UserHotelBookings', UserHotelBookings);

AdminRoutes.post('/UserTransportBookings', UserTransportBookings);

AdminRoutes.post('/UserTourBookings', UserTourBookings);

AdminRoutes.post('/dashboard-counts', getDashboardCounts);

AdminRoutes.get('/users', getUsers);

AdminRoutes.get('/reviews', getReviews);

AdminRoutes.get('/TourPayments', getTourPayments);

AdminRoutes.get('/RoomPayments', getRoomPayments);

AdminRoutes.get('/TransportPayments', getTransportPayments);

AdminRoutes.get('/notifications', getAdminNotifications);

AdminRoutes.delete('/notifications/delete', clearAllNotifications);

AdminRoutes.get('/rooms', getAllRooms);

AdminRoutes.get('/hotels', getAllHotels);

AdminRoutes.get('/transports', getAllTransport);

AdminRoutes.get('/tours', getAllTours);

AdminRoutes.get('/messages', getMessages);

export default AdminRoutes;
