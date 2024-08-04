import Navbar from "./Navbar";
import image from "../img/front-view-worried-female-backpacker-holding-air-ticket.jpg";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { showTourDetail } from "../Redux/Slices/ShowTourDetailsSlice";
import { useEffect, useState } from "react";
const Ticket = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // const [SecretSeed, setSecretSeed] = useState("");
  // const [amount, setAmount] = useState("");
  // const [TourId, setTourId] = useState("");
  // const [admin, setAdmin] = useState("");
  const [TourDet, setTourDet] = useState({});
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");
  const dispatch = useDispatch();
  const { tourDetail } = useSelector((state) => state.TourDetail);
  useEffect(() => {
    if (id) {
      console.log(id);
      dispatch(showTourDetail(id));
    }
  }, [dispatch, id]);
  useEffect(() => {
    if (tourDetail) {
      if (tourDetail.tour) {
        setTourDet(tourDetail.tour);
        console.log(tourDetail);
      }
    }
  }, [tourDetail]);
  const goHome = () => {
    navigate("/");
  };
  return (
    <div className="flex flex-col bg-center gap-y-48">
      <Navbar />
      <div className="bg-gray-100">
        <div className="container px-4 py-8 mx-auto">
          <div className="flex flex-wrap -mx-4">
            <div className="w-full px-4 mb-8 lg:w-2/3 lg:mb-0">
              <img
                className="w-full rounded-lg shadow-lg"
                src={image}
                alt="....."
              />
            </div>
            <div className="w-full px-4 lg:w-1/3">
              <h1 className="mb-4 text-4xl font-bold">
                An Amazing Journey to {TourDet.name}
              </h1>
              <p className="mb-6 text-lg">
                Join us for an unforgettable Journey with Friends.
              </p>
              <div className="mb-6">
                <p className="mb-2 text-xl font-bold">When:</p>
                <p className="text-lg">{tourDetail.tour.startDate}</p>
              </div>
              <div className="mb-6">
                <p className="mb-2 text-xl font-bold">Where:</p>
                <p className="text-lg">{tourDetail.tour.name}</p>
                <p className="text-lg">
                  {tourDetail.tour.name},{tourDetail.tour.tourLocation}
                </p>
              </div>
              <div className="mb-6">
                <p className="mb-2 text-xl font-bold">Tour End-Date</p>
                <p className="text-lg">{tourDetail.tour.endDate}</p>
                <p className="text-lg">Mark Your Presence</p>
              </div>
              <button
                className="px-4 py-2 font-bold text-white bg-green-500 rounded hover:bg-green-700 focus:outline-none focus:shadow-outline"
                type="button"
                onClick={goHome}
              >
                Go to Home
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="flex flex-col items-center justify-center w-full h-screen space-y-6 landing-page mt-36">
        <h1 className="text-5xl text-white font-joining">Ticket </h1>
        <div className="bg-blue-600 shadow-lg rounded-lg overflow-hidden w-[80%] flex flex-col justify-center items-center">
          <img src={image} alt="" className="object-cover w-full h-32" />
          <div className="p-4 w-[80%] flex flex-col justify-center items-center">
            <h3 className="text-lg font-semibold text-white">{TourDet.name}</h3>
            <p className="text-sm text-white">{TourDet.days} Days</p>
            <p className="text-sm text-white">{TourDet.description}</p>
            <div className="flex flex-col items-center justify-between mt-4">
              <p className="text-lg text-white">${TourDet.price}</p>

              <button
                className="px-4 py-2 text-black rounded-lg bg-yellows"
                onClick={goHome}
              >
                Go To Home
              </button>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Ticket;
