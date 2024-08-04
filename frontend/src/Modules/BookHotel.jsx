import { useLocation, useNavigate } from "react-router";
import image from "../image/Family Packages (19).png";
import Footer from "./Footer";
import { useEffect, useState } from "react";
import {
  getTourDetail,
  showRoomDetail,
} from "../Redux/Slices/ShowTourDetailsSlice";
import { useDispatch, useSelector } from "react-redux";
import image2 from "../img/vecteezy_blue-and-white-curve-shape-background_11403724.jpg";
import TransportService from "./TransportService";
import RelatedHotel from "./RelatedHotel";
import ReviewHotel from "./ReviewHotel";
import HotelReviewForm from "./HotelReviewForm";
import { BookingsHotel } from "../Redux/Slices/BookingPaymentSlice";
import { toast, ToastContainer } from "react-toastify";
import SingleNavbar from "./SingleNavbar";
const BookHotel = () => {
  const dispatch = useDispatch();
  const [HotelDetail, setHotelDetail] = useState({});
  const { roomDetail, userDetail } = useSelector((state) => state.TourDetail);
  const { hotelBooking } = useSelector((state) => state.Booking);

  const location = useLocation();
  let navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    address: "",
    totalGuests: "",
    checkInDate: "",
    comment: "",
    days: "",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  useEffect(() => {
    if (id) {
      dispatch(showRoomDetail(id));
    }
  }, [dispatch]);
  useEffect(() => {
    if (roomDetail.room) {
      setHotelDetail(roomDetail.room);
      console.log(roomDetail);
    }
  }, [roomDetail]);
  let token = localStorage.getItem("jwtToken");
  useEffect(() => {
    if (localStorage.getItem("jwtToken")) {
      dispatch(getTourDetail());
    }
  }, [token]);
  useEffect(() => {
    if (userDetail.userDetail) {
      formData.name = userDetail.userDetail.userName;
      formData.email = userDetail.userDetail.email;
      formData.phoneNumber = userDetail.userDetail.phone;
      formData.address = userDetail.userDetail.address;
    }
  }, [userDetail]);
  let proceedPayment = () => {
    if (localStorage.getItem("jwtToken")) {
      dispatch(
        BookingsHotel(
          id,
          formData.name,
          formData.email,
          formData.phoneNumber,
          formData.address,
          formData.comment,
          formData.totalGuests,
          formData.days,

          formData.checkInDate
        )
      );
    } else {
      toast.error("Please log in to book a tour");
    }
    // navigate("/requestBalance");
  };
  useEffect(() => {
    if (hotelBooking) {
      if (hotelBooking.roomBooking) {
        setHotelDetail(hotelBooking.roomBooking);
        toast.success("Form submitted successfully! Redirecting...");
        const timer = setTimeout(() => {
          navigate(`/hotelPayment?id=${hotelBooking.roomBooking.roomId}`);
        }, 3000);
        return () => clearTimeout(timer);
      }
    }
    console.log(HotelDetail);
  }, [hotelBooking]);

  return (
    <>
      {" "}
      <ToastContainer />
      <div
        className="z-10 flex flex-col w-full h-full gap-y-24" /* Lower z-index for the banner */
        style={{
          backgroundImage: `url(${image2})`,
        }}
      >
        {" "}
        <SingleNavbar />
        <div className="relative font-sans pointer-events-none before:absolute before:w-full before:h-full before:inset-0 before:opacity-90 before:z-10">
          <img
            src={image}
            alt=".."
            className="absolute inset-0 object-cover w-full h-full "
          />

          <div className="min-h-[350px] relative z-50 h-full max-w-6xl mx-auto flex flex-col justify-center items-center text-center text-white p-6"></div>
        </div>
        <div className="flex flex-col min-h-screen p-6 pl-20 pr-20 mt-16 space-y-6 md:flex-row md:space-y-0 md:space-x-6">
          {/* Image Section */}
          <div className="flex flex-col w-full space-y-6 md:w-2/3">
            <div className="relative h-[40vh] md:h-[70vh] w-full">
              <img
                src={roomDetail.room.image}
                alt="Scenery"
                className="object-cover w-full h-full bg-center rounded-lg"
              />
              {/* Overlay Text */}
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
              <div className="relative h-[30vh] w-full">
                <img
                  src={roomDetail.room.image}
                  alt="Scenery"
                  className="object-cover w-full h-full rounded-lg"
                />
              </div>
              <div className="relative h-[30vh] w-full">
                <img
                  src={roomDetail.room.image}
                  alt="Scenery"
                  className="object-cover w-full h-full rounded-lg"
                />
              </div>
              <div className="relative h-[30vh] w-full">
                <img
                  src={roomDetail.room.image}
                  alt="Scenery"
                  className="object-cover w-full h-full rounded-lg"
                />
              </div>
            </div>
          </div>

          {/* Form Section */}
          <div className="flex flex-col justify-center items-center w-full md:w-1/3 border-2 border-[#206eff] bg-dark p-6 rounded-lg mt-6 md:mt-0 bg-white">
            <h1 className="text-[#206eff] text-4xl mb-4 font-joining font-bold mt-3">
              Book Form
            </h1>
            <form className="flex flex-col w-full mt-8 space-y-6">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Name"
                className="p-4 bg-[#206eff] shadow-lg text-white placeholder-white rounded-xl shadow-fade-black"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="E-mail"
                className="p-4 bg-[#206eff] shadow-lg text-white placeholder-white rounded-xl shadow-fade-black"
              />
              <input
                type="text"
                name="phoneNumber"
                value={
                  formData.phoneNumber !== " "
                    ? formData.phoneNumber
                    : "phoneNumber"
                }
                onChange={handleInputChange}
                placeholder="Phone number"
                className="p-4 bg-[#206eff] shadow-lg text-white placeholder-white rounded-xl shadow-fade-black"
              />
              <input
                type="text"
                name="address"
                value={
                  formData.address !== " " ? formData.address : "User address"
                }
                onChange={handleInputChange}
                placeholder="Address"
                className="p-4 bg-[#206eff] shadow-lg text-white placeholder-white rounded-xl shadow-fade-black"
              />
              <input
                type="number"
                name="totalGuests"
                value={formData.totalGuests}
                onChange={handleInputChange}
                placeholder="Total guests"
                className="p-4 bg-[#206eff] shadow-lg text-white placeholder-white rounded-xl shadow-fade-black"
              />
              <input
                type="date"
                name="checkInDate"
                value={formData.checkInDate}
                onChange={handleInputChange}
                placeholder="Check-in date"
                className="p-4 bg-[#206eff] shadow-lg text-white placeholder-white rounded-xl shadow-fade-black"
              />
              <input
                type="text"
                name="comment"
                value={formData.comment}
                onChange={handleInputChange}
                placeholder="Any Comment"
                className="p-4 bg-[#206eff] shadow-lg text-white placeholder-white rounded-xl shadow-fade-black"
              />
              <input
                type="text"
                name="days"
                value={formData.days}
                onChange={handleInputChange}
                placeholder="days"
                className="p-4 bg-[#206eff] shadow-lg text-white placeholder-white rounded-xl shadow-fade-black"
              />
              <button
                type="button"
                className="bg-[#206eff] text-white font-radios font-bold py-4 rounded-xl hover:bg-[#3e41ff]"
                onClick={proceedPayment}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
        <TransportService id={id} />
        <RelatedHotel id={id} />
        <ReviewHotel id={id} />
        <HotelReviewForm id={id} />
        <Footer />
      </div>
    </>
  );
};

export default BookHotel;
