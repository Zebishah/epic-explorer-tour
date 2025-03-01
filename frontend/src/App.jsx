import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Home from './Modules/Home';
import StripeMainForm from "./Modules/StripeMainForm";
// import RequestBalance from './Modules/RequestBalance';

import Home from "./Modules/Home";
import SignUpForm from "./Modules/SignUpForm";
import SignInForm from "./Modules/SignInForm";
import LandingPage from "./Modules/LandingPage";
import BookTour from "./Modules/BookTour";
import BookTourBanner from "./Modules/BookTourBanner";
import BookTransport from "./Modules/BookTransport";
import AllTransport from "./Modules/AllTransport";
import AllHotels from "./Modules/AllHotels";
import AllTours from "./Modules/AllTours";
import HotelRelRooms from "./Modules/HotelRelRooms";

import ContactUs from "./Modules/ContactUs";
import DiscountedTours from "./Modules/DiscountedTours";
import Blogs from "./Modules/Blogs";
import FamilyTour from "./Modules/FamilyTour";
import Favorites from "./Modules/Favorites";
import UserProfile from "./Modules/UserProfile";
import Dashboard from "./Modules/Dashboard";
import UserBookingsRecord from "./Modules/UserBookingsRecord";
import ChangePassword from "./Modules/ChangePassword";
import Notifications from "./Modules/Notifications";
import CheckoutForm from "./Modules/CheckoutForm";
import RequestBalance from "./Modules/RequestBalance";
import Confirmation from "./Modules/Confirmation";
import Ticket from "./Modules/Ticket";
import PaymentSuccess from "./Modules/PaymentSuccess";
import OtpPage from "./Modules/OtpPage";
import SignInWithGoogle from "./Modules/SignInWithGoogle";
import BookingOptions from "./Modules/BookingOptions";
import TourBookings from "./Modules/TourBookings";
import TransportBookings from "./Modules/TransportBookings";
import HotelBookings from "./Modules/HotelBookings";
import ForgetPassword from "./Modules/ForgetPassword";
import UpdatePassword from "./Modules/UpdatePassword";
import IndependentOTP from "./Modules/IndependentOTP";

import "react-toastify/dist/ReactToastify.css";
import PaymentOptions from "./Modules/PaymentOptions";
import TourPayments from "./Modules/TourPayments";
import HotelPayments from "./Modules/HotelPayments";
import TransportPayments from "./Modules/TransportPayments";
import TourBookingDet from "./Modules/TourBookingDet";
import HotelBookingDet from "./Modules/HotelBookingDet";
import TransportBookingDet from "./Modules/TransportBookingDet";
import TourPaymentDet from "./Modules/TourPaymentDet";
import HotelPaymentDet from "./Modules/HotelPaymentDet";
import TransportPaymentDet from "./Modules/TransportPaymentDet";
import AllTourPackages from "./Modules/AllTourPackages";
import FamilyPackage from "./Modules/FamilyPackage";
import PersonalPackage from "./Modules/PersonalPackage";
import AllRoom from "./Modules/AllRoom";
import Room from "./Modules/Room";
import HoneyMoonPackages from "./Modules/HoneyMoonPackages";
import ViewBlog from "./Modules/ViewBlog";
import BookHotel from "./Modules/BookHotel";
import TransportTicket from "./Modules/TransportTicket";
import RequestTransportBalance from "./Modules/RequestTransportBalance";
import HotelRequestBalance from "./Modules/HotelRequestBalance";
import HotelTicket from "./Modules/HotelTicket";
import CustomizeTours from "./Modules/CustomizeTours";
import ChatBot from "./Modules/ChatBot";
function App() {
  return (
    <div className="w-full h-auto overflow-hidden bg-white">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chatbot" element={<ChatBot />} />
          <Route path="/CustomizeTours" element={<CustomizeTours />} />
          <Route path="/HotelTicket" element={<HotelTicket />} />
          <Route path="/hotelPayment" element={<HotelRequestBalance />} />
          <Route
            path="/TransportPayment"
            element={<RequestTransportBalance />}
          />
          <Route path="/TransportTicket" element={<TransportTicket />} />
          <Route path="/BookHotel" element={<BookHotel />} />
          <Route path="/ViewBlog" element={<ViewBlog />} />
          <Route path="/discountedTour" element={<DiscountedTours />} />
          <Route path="/HoneyMoonPackages" element={<HoneyMoonPackages />} />
          <Route path="/AllTransport" element={<AllTransport />} />
          <Route path="/allRooms" element={<Room />} />
          <Route path="/AllRoom" element={<AllRoom />} />
          <Route path="/AllHotels" element={<AllHotels />} />
          <Route path="/PersonalPackages" element={<PersonalPackage />} />
          <Route path="/FamilyTours" element={<FamilyPackage />} />
          <Route path="/AllTourPackages" element={<AllTourPackages />} />
          <Route
            path="/TransportPaymentDet"
            element={<TransportPaymentDet />}
          />
          <Route path="/HotelPaymentDet" element={<HotelPaymentDet />} />
          <Route path="/TourPaymentDet" element={<TourPaymentDet />} />
          <Route
            path="/TransportBookingDet"
            element={<TransportBookingDet />}
          />
          <Route path="/HotelBookingDet" element={<HotelBookingDet />} />
          <Route path="/TourBookingDet" element={<TourBookingDet />} />
          <Route path="/ToursPayments" element={<TourPayments />} />
          <Route path="/HotelsPayments" element={<HotelPayments />} />
          <Route path="/TransportsPayments" element={<TransportPayments />} />
          <Route path="/PaymentOptions" element={<PaymentOptions />} />
          <Route path="/indOtp" element={<IndependentOTP />} />
          <Route path="/UpdatePassword" element={<UpdatePassword />} />
          <Route path="/ResetPassword" element={<ForgetPassword />} />
          <Route path="/tourBooked" element={<TourBookings />} />
          <Route path="/transportBooked" element={<TransportBookings />} />
          <Route path="/hotelBooked" element={<HotelBookings />} />
          <Route path="/SignInWithGoogle" element={<SignInWithGoogle />} />
          <Route path="/OTP" element={<OtpPage />} />
          <Route path="/Notifications" element={<Notifications />} />
          <Route path="/changePassword" element={<ChangePassword />} />
          <Route path="/UserBooking" element={<UserBookingsRecord />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/userProfile" element={<UserProfile />} />
          <Route path="/Bookings" element={<BookingOptions />} />
          <Route path="/Favorites" element={<Favorites />} />
          <Route path="/FamilyTour" element={<FamilyTour />} />
          <Route path="/Blogs" element={<Blogs />} />
          <Route path="/DiscountedTour" element={<DiscountedTours />} />
          <Route path="/BookTour" element={<BookTour />} />
          <Route path="/ContactUs" element={<ContactUs />} />
          <Route path="/AllTransport" element={<AllTransport />} />
          <Route path="/AllHotels" element={<AllHotels />} />
          <Route path="/HotelRelRooms" element={<HotelRelRooms />} />
          <Route path="/AllTours" element={<AllTours />} />
          <Route path="/BookTransport" element={<BookTransport />} />

          <Route path="/BookTour" element={<BookTour />} />
          <Route path="/TourBanner" element={<BookTourBanner />} />
          <Route path="/signUp" element={<SignUpForm />} />
          <Route path="/SignIn" element={<SignInForm />} />
          <Route path="/LandingPage" element={<LandingPage />} />
          <Route path="/StripeForm" element={<StripeMainForm />} />
          <Route path="/requestBalance" element={<RequestBalance />} />
          <Route path="/CheckoutForm" element={<CheckoutForm />} />
          <Route path="/Confirmation" element={<Confirmation />} />
          <Route path="/Ticket" element={<Ticket />} />
          <Route path="/paymentConfirmation" element={<PaymentSuccess />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
