import Navbar from "./Navbar";
import image from "../images/marc-zimmer-a5QnUtau8lo-unsplash.jpg";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import image2 from "../images/vecteezy_blue-trendy-background-design-template-for-banner-poster_.jpg";
import { showTransportDetail } from "../Redux/Slices/ShowTourDetailsSlice";
import { useEffect, useState } from "react";
const TransportTicket = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // const [SecretSeed, setSecretSeed] = useState("");
  // const [amount, setAmount] = useState("");
  // const [TourId, setTourId] = useState("");
  // const [admin, setAdmin] = useState("");
  const [TourDet, setTourDet] = useState({});
  const { transportDetail } = useSelector((state) => state.TourDetail);
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");
  let date = new Date();
  const dispatch = useDispatch();
  useEffect(() => {
    if (id) {
      console.log(id);
      dispatch(showTransportDetail(id));
    }
  }, [dispatch, id]);
  useEffect(() => {
    if (transportDetail) {
      if (transportDetail.transport) {
        setTourDet(transportDetail.transport);
        console.log(transportDetail);
      }
    }
  }, [transportDetail]);
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
                You Booked Amazing Vehicle {TourDet.carName}
              </h1>
              <p className="mb-6 text-lg">
                Join us for an unforgettable Journey with Friends.
              </p>
              {/* <div className="mb-6">
                <p className="mb-2 text-xl font-bold">Booked When:</p>
                <p className="text-lg">{date}</p>
              </div> */}
              <div className="mb-6">
                <p className="mb-2 text-xl font-bold">Prices</p>
                <p className="text-lg">{transportDetail.transport.prices}</p>
                <p className="mb-2 text-xl font-bold">Members Limit</p>
                <p className="text-lg">
                  {transportDetail.transport.allowedGuests}
                </p>
              </div>
              <div className="mb-6">
                <p className="mb-2 text-xl font-bold">Seats</p>
                <p className="text-lg">{transportDetail.transport.seats}</p>
                <p className="text-lg">Booked Successfully</p>
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
    </div>
  );
};

export default TransportTicket;
