import { useLocation, useNavigate } from "react-router";
import backgroundImage from "../images/benjamin-davies-EsH2Haii2jw-unsplash.jpg";
import image from "../image/Family Packages (12).png";
import Footer from "./Footer";
import Navbar from "./Navbar";
import RelatedTour from "./RelatedTour";
import TourService from "./TourService";
import { useEffect, useState } from "react";
import {
  getTourDetail,
  showTourDetail,
} from "../Redux/Slices/ShowTourDetailsSlice";
import { useDispatch, useSelector } from "react-redux";
import image2 from "../img/vecteezy_blue-and-white-curve-shape-background_11403724.jpg";
import ReviewForm from "./ReviewForm";
import ReviewShowingTour from "./ReviewShowingTour";
import { BookingsTour } from "../Redux/Slices/BookingPaymentSlice";
import { toast, ToastContainer } from "react-toastify";
import SingleNavbar from "./SingleNavbar";

const BookTour = () => {
  const dispatch = useDispatch();
  const [tourDet, setTourDet] = useState({});
  const [bill, setBill] = useState("");

  const [TourBooking, setTourBooking] = useState({});
  const { tourDetail, userDetail } = useSelector((state) => state.TourDetail);
  const { tourBooking } = useSelector((state) => state.Booking);
  const location = useLocation();
  let navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");

  // State for form fields
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    address: "",
    totalGuests: "",
    checkInDate: "",
    dropOffLocation: "",
    pickUpLocation: "",
    comment: "",
  });

  useEffect(() => {
    if (id) {
      console.log(id);
      dispatch(showTourDetail(id));
    }
  }, [dispatch]);

  useEffect(() => {
    if (tourDetail) {
      setTourDet(tourDetail.tour);
    }
  }, [tourDetail, tourDet]);
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
  }, [userDetail, tourDet]);
  useEffect(() => {
    if (tourBooking.tourBooking) {
      setTourBooking(tourBooking.tourBooking);
      setBill(tourBooking.tourBooking.tourId);
      toast.success("Form submitted successfully! Redirecting...");

      // Delay navigation by 3 seconds
      const timer = setTimeout(() => {
        navigate(`/requestBalance?id=${tourBooking.tourBooking.tourId}`);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [tourBooking]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (localStorage.getItem("jwtToken")) {
      dispatch(
        BookingsTour(
          id,
          formData.name,
          formData.email,
          formData.phoneNumber,
          formData.address,
          formData.totalGuests,
          formData.checkInDate,
          formData.dropOffLocation,
          formData.pickUpLocation,
          formData.comment
        )
      );
    } else {
      toast.error("Please log in to book a tour");
    }
  };

  return (
    <>
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
                src={tourDetail.tour.image}
                alt="Scenery"
                className="object-cover w-full h-full rounded-lg"
              />
              {/* Overlay Text */}
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
              <div className="relative h-[30vh] w-full">
                <img
                  src={tourDetail.tour.image}
                  alt="Scenery"
                  className="object-cover w-full h-full rounded-lg"
                />
              </div>
              <div className="relative h-[30vh] w-full">
                <img
                  src={tourDetail.tour.image}
                  alt="Scenery"
                  className="object-cover w-full h-full rounded-lg"
                />
              </div>
              <div className="relative h-[30vh] w-full">
                <img
                  src={tourDetail.tour.image}
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
            <form
              className="flex flex-col w-full mt-8 space-y-6"
              onSubmit={handleSubmit}
            >
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                className="p-4 bg-[#206eff] shadow-lg text-white placeholder-white rounded-xl shadow-fade-black"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="E-mail"
                value={formData.email}
                onChange={handleChange}
                className="p-4 bg-[#206eff] shadow-lg text-white placeholder-white rounded-xl shadow-fade-black"
                required
              />
              <input
                type="text"
                name="phoneNumber"
                value={
                  formData.phoneNumber !== " "
                    ? formData.phoneNumber
                    : "phoneNumber"
                }
                onChange={handleChange}
                className="p-4 bg-[#206eff] shadow-lg text-white placeholder-white rounded-xl shadow-fade-black"
                required
              />
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={
                  formData.address !== " " ? formData.address : "User address"
                }
                onChange={handleChange}
                className="p-4 bg-[#206eff] shadow-lg text-white placeholder-white rounded-xl shadow-fade-black"
                required
              />
              <input
                type="number"
                name="totalGuests"
                placeholder="Total guests"
                value={formData.totalGuests}
                onChange={handleChange}
                className="p-4 bg-[#206eff] shadow-lg text-white placeholder-white rounded-xl shadow-fade-black"
                required
              />
              <input
                type="date"
                name="checkInDate"
                placeholder="Check-in date"
                value={formData.checkInDate}
                onChange={handleChange}
                className="p-4 bg-[#206eff] shadow-lg text-white placeholder-white rounded-xl shadow-fade-black"
                required
              />
              <input
                type="text"
                name="dropOffLocation"
                placeholder="Drop Off Location"
                value={formData.dropOffLocation}
                onChange={handleChange}
                className="p-4 bg-[#206eff] shadow-lg text-white placeholder-white rounded-xl shadow-fade-black"
                required
              />
              <input
                type="text"
                name="pickUpLocation"
                placeholder="pickUpLocation"
                value={formData.pickUpLocation}
                onChange={handleChange}
                className="p-4 bg-[#206eff] shadow-lg text-white placeholder-white rounded-xl shadow-fade-black"
                required
              />
              <input
                type="text"
                name="comment"
                placeholder="Any Comment"
                value={formData.comment}
                onChange={handleChange}
                className="p-4 bg-[#206eff] shadow-lg text-white placeholder-white rounded-xl shadow-fade-black"
                required
              />
              <button
                type="submit"
                className="bg-[#206eff] text-white font-radios font-bold py-4 rounded-xl hover:bg-[#3e41ff]"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
        <TourService id={id} />
        <RelatedTour id={id} />
        <ReviewShowingTour id={id} />
        <ReviewForm id={id} />
        <Footer />
      </div>
    </>
  );
};

export default BookTour;
