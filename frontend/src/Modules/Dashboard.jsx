import SideBar from "./SideBar";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import image2 from "../images/vecteezy_blue-trendy-background-design-template-for-banner-poster_.jpg";
import sub from "../images/man-user-circle-icon.png";
import { useDispatch, useSelector } from "react-redux";
import {
  resetUserSearchState,
  userBookedHotels,
  userBookedTours,
  userBookedTransport,
  userTransactions,
} from "../Redux/Slices/userInfoSlice";
import { userSearchFrToken } from "../Redux/Slices/SearchingUserSlice";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { useNavigate } from "react-router";
import { resendOtp } from "../Redux/Slices/ResendOtpSlice";
import isTokenExpired from "../../util/tokenExpiry";
const Dashboard = () => {
  const [tourBooked, setToursBooked] = useState(0);
  const [transportBooked, setTransportBooked] = useState(0);
  const [hotelBooked, setHotelBooked] = useState(0);
  const [transaction, setTransactions] = useState(0);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userAddress, setUserAddress] = useState("");
  const [userCity, setUserCity] = useState("");
  const [userAccountId, setUserAccId] = useState("");
  const [userBalance, setUserBalance] = useState(0);
  const [userVerified, setUserVerified] = useState("");
  const [imageReal, setImage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("jwtToken"); // Retrieve your token from localStorage or any other storage

    if (isTokenExpired(token)) {
      // Token is expired, log out the user
      toast.error("Your Login is expired");
      localStorage.removeItem("jwtToken"); // Remove the token from storage
      navigate("/SignIn"); // Redirect to login page
    }
  }, [navigate]);
  const {
    toursBooked,
    transportsBooked,
    hotelsBooked,
    transactions,
    errorSearch,
  } = useSelector((state) => state.userInfoSearch);
  const { userFrTokenData } = useSelector((state) => state.userSearch);

  const verifyAccount = () => {
    dispatch(resendOtp(userEmail));
    toast.success("Otp sended to your mail!");
    navigate(`/indOtp?email=${encodeURIComponent(userEmail)}`);
  };

  useEffect(() => {
    dispatch(userBookedTours());
    dispatch(userBookedTransport());
    dispatch(userBookedHotels());
    dispatch(userTransactions());
    dispatch(userSearchFrToken());
  }, [dispatch]);

  useEffect(() => {
    if (toursBooked !== null) {
      setToursBooked(toursBooked.toursCount);
    }

    if (transportsBooked !== null) {
      setTransportBooked(transportsBooked.transportCount);
    }
    if (hotelsBooked !== null) {
      setHotelBooked(hotelsBooked.hotelsCount);
    }
    if (transactions !== null) {
      setTransactions(transactions.totalTransactions);
    }
    if (userFrTokenData !== null) {
      setUserName(userFrTokenData.userInfo.userName);
      setUserEmail(userFrTokenData.userInfo.email);
      setUserPhone(userFrTokenData.userInfo.phone);
      setUserAddress(userFrTokenData.userInfo.address);
      setUserAccId(userFrTokenData.userInfo.AccountId);
      setUserBalance(userFrTokenData.userInfo.Balance);
      setUserCity(userFrTokenData.userInfo.city);
      setUserVerified(userFrTokenData.userInfo.verifiedStatus);
      setImage(userFrTokenData.userInfo.pic);
    }
    // Use a timeout to reset the state after 5 seconds
    const timer = setTimeout(() => {
      dispatch(resetUserSearchState());
    }, 5000);
    // Clear the timer on component unmount or if data/error changes
    return () => clearTimeout(timer);
  }, [
    toursBooked,
    transportsBooked,
    hotelsBooked,
    transactions,
    errorSearch,
    userFrTokenData,
    dispatch,
  ]);

  return (
    <div
      className="flex flex-col min-h-screen bg-center bg-cover"
      style={{ backgroundImage: `url(${image2})` }}
    >
      <Navbar />

      <div className="flex flex-row w-full h-full mt-20 overflow-hidden bg-opacity-0 gap-x-6 smd:mt-40">
        <SideBar />

        <div className="flex flex-col gap-y-10 p-6 items-center w-[80%] ">
          {userFrTokenData &&
            userFrTokenData.userInfo.verifiedStatus === "false" && (
              <div className="flex flex-row justify-between items-center -mt-4 p-4 bg-[#3654ff] shadow-lg shadow-fade-black w-full rounded-lg ">
                <p className="text-sm text-white font-radios ">
                  Your account is not verified. please verify your account
                </p>
                <button
                  type="button"
                  onClick={verifyAccount}
                  className="text-light-black hover:bg-[#3654ff] hover:text-yellows transition-all ease-in-out duration-300 bg-yellows p-3 rounded-lg shadow-lg shadow-fade-black"
                >
                  Verify Account
                </button>
              </div>
            )}
          <h1 className="text-white text-lg lg:text-4xl font-joining bg-[#3654ff] bg-opacity-60 p-4 rounded-lg ">
            User Booking Count
          </h1>
          <div className="flex flex-col flex-wrap items-center justify-center w-full smd:flex-row gap-y-2 gap-x-4 lg:gap-x-14">
            <div className="flex flex-col gap-y-4 justify-center items-center bg-[#3654ff] p-6 shadow-lg rounded-lg w-full sm:w-auto">
              <h1 className="text-2xl font-bold text-white font-radios">
                {tourBooked}
              </h1>
              <h3 className="text-lg font-bold text-white font-radios">
                Booked Tours
              </h3>
            </div>
            <div className="flex flex-col gap-y-4 justify-center items-center bg-[#3654ff] p-6 shadow-lg rounded-lg w-full sm:w-auto">
              <h1 className="text-2xl font-bold text-white font-radios">
                {transportBooked}
              </h1>
              <h3 className="text-lg font-bold text-white font-radios">
                Booked Transport
              </h3>
            </div>
            <div className="flex flex-col gap-y-4 justify-center items-center bg-[#3654ff] p-6 shadow-lg rounded-lg w-full sm:w-auto">
              <h1 className="text-2xl font-bold text-white font-radios">
                {hotelBooked}
              </h1>
              <h3 className="text-lg font-bold text-white font-radios">
                Booked Hotels
              </h3>
            </div>
            <div className="flex flex-col gap-y-4 justify-center items-center bg-[#3654ff] p-6 shadow-lg rounded-lg w-full sm:w-auto">
              <h1 className="text-2xl font-bold text-white font-radios">
                {transaction}
              </h1>
              <h3 className="text-lg font-bold text-white font-radios">
                Total Transactions
              </h3>
            </div>
          </div>
          <h1 className="text-white text-lg font-joining lg:text-4xl bg-[#3654ff] bg-opacity-60 p-4 rounded-lg ">
            User Personal Information
          </h1>
          <div className="bg-[#3654ff] shadow-fade-black rounded-lg shadow overflow-hidden sm:rounded-lg w-[80%] opacity-90">
            <div className="w-full px-4 py-5 sm:px-6">
              <h3 className="text-lg font-medium leading-6 text-white">
                User database
              </h3>
              <p className="mt-1 text-sm text-white">
                Details and informations about user.
              </p>
            </div>
            <div className="flex items-center justify-center w-full border-t border-gray-200">
              <dl className="flex flex-col">
                <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="mt-4 text-sm font-medium text-yellows font-radios">
                    Image
                  </dt>
                  <dd className="mt-1 text-sm text-white sm:mt-0 sm:col-span-2 font-radios">
                    <img
                      src={imageReal !== " " ? imageReal : sub}
                      alt="User Profile"
                      className="object-cover w-8 h-8 rounded-full md:h-14 md:w-14"
                    />
                  </dd>
                </div>
                <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-white font-radios">
                    Name
                  </dt>
                  <dd className="mt-1 text-sm text-white sm:mt-0 sm:col-span-2 font-radios">
                    {userName ? userName : "Not Provided"}
                  </dd>
                </div>
                <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-white font-radios">
                    User-Email
                  </dt>
                  <dd className="mt-1 text-sm text-white sm:mt-0 sm:col-span-2 font-radios">
                    {userEmail !== " " ? userEmail : "Not Provided"}
                  </dd>
                </div>
                <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-white font-radios">
                    User-Phone
                  </dt>
                  <dd className="mt-1 text-sm text-white sm:mt-0 sm:col-span-2 font-radios">
                    {userPhone !== " " ? userPhone : "Not Provided"}
                  </dd>
                </div>
                <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-white font-radios">
                    User-Address
                  </dt>
                  <dd className="mt-1 text-sm text-white sm:mt-0 sm:col-span-2 font-radios">
                    {userAddress !== " " ? userAddress : "Not Provided"}
                  </dd>
                </div>
                <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-white font-radios">
                    User-City
                  </dt>
                  <dd className="mt-1 text-sm text-white sm:mt-0 sm:col-span-2 font-radios">
                    {userCity !== " " ? userCity : "Not Provided"}
                  </dd>
                </div>
                <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-white font-radios">
                    User-Balance
                  </dt>
                  <dd className="mt-1 text-sm text-white sm:mt-0 sm:col-span-2 font-radios">
                    {userBalance ? userBalance : "Not Provided"}
                  </dd>
                </div>
                <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-white font-radios">
                    User-Verified
                  </dt>
                  <dd className="mt-1 text-sm text-white sm:mt-0 sm:col-span-2 font-radios">
                    {userVerified ? userVerified : "Not Provided"}
                  </dd>
                </div>
                <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-white font-radios">
                    userAccountId
                  </dt>
                  <dd className="mt-1 text-sm text-white sm:mt-0 sm:col-span-2 font-radios">
                    {userAccountId ? userAccountId : "Not Verified"}
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

export default Dashboard;
