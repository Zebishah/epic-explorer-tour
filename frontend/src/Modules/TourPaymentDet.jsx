import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { tourPaymentDetail } from "../Redux/Slices/UserBookingSlice";
import Footer from "./Footer";
import Navbar from "./Navbar";
import SideBar from "./SideBar";
import image1 from "../images/vecteezy_blue-trendy-background-design-template-for-banner-poster_.jpg";
const TourPaymentDet = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { tourPaymentDet } = useSelector((state) => state.userBookings);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get("id");

    if (id) {
      dispatch(tourPaymentDetail(id));
    }
  }, [location.search, dispatch]);

  const [tourName, setTourName] = useState("");
  const [tourPrice, setTourPrice] = useState(0);
  const [SenderAccId, setSenderAccId] = useState("");
  const [ReceiverAccId, setReceiverAccId] = useState("");
  const [BookerName, setBookerName] = useState("");
  const [DeliveryCharges, setDeliveryCharges] = useState("");

  const resetState = () => {
    setTourName("");
    setTourPrice(0);
    setSenderAccId("");
    setReceiverAccId("");
    setBookerName("");
    setDeliveryCharges("");
  };
  useEffect(() => {
    if (
      tourPaymentDet &&
      tourPaymentDet.Tour &&
      tourPaymentDet.Tour.length > 0
    ) {
      const tour = tourPaymentDet.Tour[0];
      resetState();
      setTourName(tour.tourName);
      setTourPrice(tour.totalPrice);
      setSenderAccId(tour.senderAccountId);
      setReceiverAccId(tour.ReceiverAccountId);
      setBookerName(tour.booker);
      setDeliveryCharges(tour.deliveryCharges);
    }
  }, [tourPaymentDet]);

  return (
    <div
      className="flex flex-col min-h-screen bg-center bg-cover"
      style={{ backgroundImage: `url(${image1})` }}
    >
      <Navbar />
      <div className="flex flex-row w-full h-full mt-20 overflow-hidden bg-opacity-0 gap-x-6 bg-light-black smd:mt-40">
        <SideBar />
        <div className="flex flex-col justify-center gap-y-10 p-6 items-center w-[80%]">
          <h1 className="p-4 my-10 text-4xl font-bold text-yellows bg-fade-black rounded-xl">
            Tour Bookings
          </h1>
          <div className="bg-fade-black shadow-yellows rounded-lg shadow overflow-hidden sm:rounded-lg w-[80%]">
            <div className="w-full px-4 py-5 sm:px-6">
              <h3 className="text-lg font-medium leading-6 text-yellows">
                User Database
              </h3>
              <p className="mt-1 text-sm text-white">
                Details and information about user.
              </p>
            </div>
            <div className="flex items-center justify-center w-full border-t border-gray-200">
              <dl className="flex flex-col">
                <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-yellows font-radios">
                    Tour Name
                  </dt>
                  <dd className="mt-1 text-sm text-white sm:mt-0 sm:col-span-2 font-radios">
                    {tourName || "Not Provided"}
                  </dd>
                </div>

                <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-yellows font-radios">
                    Sender Account-Id
                  </dt>
                  <dd className="mt-1 text-sm text-white sm:mt-0 sm:col-span-2 font-radios">
                    {SenderAccId || "Not Provided"}
                  </dd>
                </div>
                <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-yellows font-radios">
                    Tour Price
                  </dt>
                  <dd className="mt-1 text-sm text-white sm:mt-0 sm:col-span-2 font-radios">
                    {tourPrice || "Not Provided"}
                  </dd>
                </div>
                <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-yellows font-radios">
                    Receiver Account-Id
                  </dt>
                  <dd className="mt-1 text-sm text-white sm:mt-0 sm:col-span-2 font-radios">
                    {ReceiverAccId || "Not Provided"}
                  </dd>
                </div>
                <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-yellows font-radios">
                    Booker Name
                  </dt>
                  <dd className="mt-1 text-sm text-white sm:mt-0 sm:col-span-2 font-radios">
                    {BookerName || "Not Provided"}
                  </dd>
                </div>
                <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-yellows font-radios">
                    Extra Charges
                  </dt>
                  <dd className="mt-1 text-sm text-white sm:mt-0 sm:col-span-2 font-radios">
                    {DeliveryCharges || "Not Provided"}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TourPaymentDet;
