import Navbar from "./Navbar";
import image from "../images/marc-zimmer-a5QnUtau8lo-unsplash.jpg";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import image2 from "../images/vecteezy_blue-trendy-background-design-template-for-banner-poster_.jpg";
import { showRoomDetail } from "../Redux/Slices/ShowTourDetailsSlice";
import { useEffect, useState } from "react";
const HotelTicket = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // const [SecretSeed, setSecretSeed] = useState("");
  // const [amount, setAmount] = useState("");
  // const [TourId, setTourId] = useState("");
  // const [admin, setAdmin] = useState("");
  const [TourDet, setTourDet] = useState({});
  const { roomDetail } = useSelector((state) => state.TourDetail);
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");
  const dispatch = useDispatch();
  useEffect(() => {
    if (id) {
      console.log(id);
      dispatch(showRoomDetail(id));
    }
  }, [dispatch]);
  useEffect(() => {
    if (roomDetail.room) {
      setTourDet(roomDetail.room);
      console.log(roomDetail);
    }
  }, [roomDetail]);
  const goHome = () => {
    navigate("/");
  };
  return (
    <div
      className="bg-center"
      style={{
        backgroundImage: `url(${image2})`,
      }}
    >
      <Navbar />

      <div className="flex flex-col items-center justify-center w-full h-screen space-y-6 landing-page mt-36">
        <h1 className="text-5xl text-white font-joining">Ticket </h1>
        <div className="bg-blue-600 shadow-lg rounded-lg overflow-hidden w-[80%] flex flex-col justify-center items-center">
          <img src={image} alt="" className="object-cover w-full h-32" />
          <div className="p-4 w-[80%] flex flex-col justify-center items-center">
            <h3 className="text-lg font-semibold text-white">{TourDet.name}</h3>
            <p className="text-sm text-white">{TourDet.noOfGuests} members</p>
            <p className="text-sm text-white">{TourDet.description}</p>
            <div className="flex flex-col items-center justify-between mt-4">
              <p className="text-lg text-white">${TourDet.prices} Amount</p>

              <button
                className="px-4 py-2 text-black rounded-lg bg-yellows"
                onClick={goHome}
              >
                Go To Home
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelTicket;
