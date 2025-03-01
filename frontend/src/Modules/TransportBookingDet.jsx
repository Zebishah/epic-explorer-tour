import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { transportBookingDetail } from "../Redux/Slices/UserBookingSlice";
import Footer from "./Footer";
import Navbar from "./Navbar";
import SideBar from "./SideBar";
import image1 from "../images/vecteezy_blue-trendy-background-design-template-for-banner-poster_.jpg";
const TransportBookingDet = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { transportBookingDet } = useSelector((state) => state.userBookings);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get("id");

    if (id) {
      dispatch(transportBookingDetail(id));
    }
  }, [location.search, dispatch]);

  const [bookedTransportNo, setBookedTransportNo] = useState(0);

  const [CarName, setCarName] = useState("");
  const [price, setPrice] = useState(0);
  const [Seats, setSeats] = useState("");
  const [ReserveDays, setReserveDays] = useState("");
  const [checkInDate, setCheckInDate] = useState("");
  const [Travelers, setTravelers] = useState([]);
  const [bookerName, setBookerName] = useState("");
  const [bookerEmail, setBookerEmail] = useState("");
  const [bookerPhone, setBookerPhone] = useState("");
  const [bookerAddress, setBookerAddress] = useState("");
  const [suggestion, setSuggestion] = useState("");
  const [members, setMembers] = useState("");
  const [booksCount, setBooksCount] = useState(0);
  const resetState = () => {
    setBookedTransportNo(0);
    setCarName("");
    setPrice(0);
    setSeats("");

    setReserveDays("");
    setCheckInDate("");
    setTravelers([]);
    setBookerName("");
    setBookerEmail("");
    setBookerPhone("");
    setBookerAddress("");
    setSuggestion("");
    setMembers("");
    setBooksCount(0);
  };
  useEffect(() => {
    if (
      transportBookingDet &&
      transportBookingDet.Transports &&
      transportBookingDet.Transports.length > 0
    ) {
      const transport = transportBookingDet.Transports[0];
      resetState();
      setBookedTransportNo(transport.bookedTransportNo);

      setCarName(transport.carName);
      setPrice(transport.price);
      setSeats(transport.seats);
      setReserveDays(transport.days);
      setCheckInDate(transport.checkInDate);
      setTravelers(transport.travelers);
      setBookerName(transport.bookerName);
      setBookerEmail(transport.bookerEmail);
      setBookerPhone(transport.bookerPhone);
      setBookerAddress(transport.bookerAddress);
      setSuggestion(transport.suggestion);
      setMembers(transport.members);
      setBooksCount(transport.BooksCount);
    }
  }, [transportBookingDet]);

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
            transport Bookings
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
                    transport Type
                  </dt>
                  <dd className="mt-1 text-sm text-white sm:mt-0 sm:col-span-2 font-radios">
                    {Seats || "Not Provided"}
                  </dd>
                </div>
                <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-yellows font-radios">
                    Booked-transport No
                  </dt>
                  <dd className="mt-1 text-sm text-white sm:mt-0 sm:col-span-2 font-radios">
                    {bookedTransportNo || "Not Provided"}
                  </dd>
                </div>
                <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-yellows font-radios">
                    transport Name
                  </dt>
                  <dd className="mt-1 text-sm text-white sm:mt-0 sm:col-span-2 font-radios">
                    {CarName || "Not Provided"}
                  </dd>
                </div>
                <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-yellows font-radios">
                    transport Price
                  </dt>
                  <dd className="mt-1 text-sm text-white sm:mt-0 sm:col-span-2 font-radios">
                    {price || "Not Provided"}
                  </dd>
                </div>

                <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-yellows font-radios">
                    End Date
                  </dt>
                  <dd className="mt-1 text-sm text-white sm:mt-0 sm:col-span-2 font-radios">
                    {ReserveDays || "Not Provided"}
                  </dd>
                </div>
                <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-yellows font-radios">
                    Check-In Date
                  </dt>
                  <dd className="mt-1 text-sm text-white sm:mt-0 sm:col-span-2 font-radios">
                    {checkInDate || "Not Provided"}
                  </dd>
                </div>
                <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-yellows font-radios">
                    Travelers
                  </dt>
                  <dd className="mt-1 text-sm text-white sm:mt-0 sm:col-span-2 font-radios">
                    {Travelers && Travelers.length > 0
                      ? Travelers.join(", ")
                      : "Not Provided"}
                  </dd>
                </div>
                <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-yellows font-radios">
                    Booker Name
                  </dt>
                  <dd className="mt-1 text-sm text-white sm:mt-0 sm:col-span-2 font-radios">
                    {bookerName || "Not Provided"}
                  </dd>
                </div>
                <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-yellows font-radios">
                    Booker Email
                  </dt>
                  <dd className="mt-1 text-sm text-white sm:mt-0 sm:col-span-2 font-radios">
                    {bookerEmail || "Not Provided"}
                  </dd>
                </div>
                <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-yellows font-radios">
                    Booker Phone
                  </dt>
                  <dd className="mt-1 text-sm text-white sm:mt-0 sm:col-span-2 font-radios">
                    {bookerPhone || "Not Provided"}
                  </dd>
                </div>
                <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-yellows font-radios">
                    Booker Address
                  </dt>
                  <dd className="mt-1 text-sm text-white sm:mt-0 sm:col-span-2 font-radios">
                    {bookerAddress || "Not Provided"}
                  </dd>
                </div>
                <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-yellows font-radios">
                    Suggestion
                  </dt>
                  <dd className="mt-1 text-sm text-white sm:mt-0 sm:col-span-2 font-radios">
                    {suggestion || "Not Provided"}
                  </dd>
                </div>
                <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-yellows font-radios">
                    Members
                  </dt>
                  <dd className="mt-1 text-sm text-white sm:mt-0 sm:col-span-2 font-radios">
                    {members || "Not Provided"}
                  </dd>
                </div>
                <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-yellows font-radios">
                    Books Count
                  </dt>
                  <dd className="mt-1 text-sm text-white sm:mt-0 sm:col-span-2 font-radios">
                    {booksCount}
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

export default TransportBookingDet;
