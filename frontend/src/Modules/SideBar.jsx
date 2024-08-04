import {
  faBell,
  faCartPlus,
  faDashboard,
  faDollar,
  faDollarSign,
  faDoorOpen,
  faHeart,
  faPen,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import image from "../images/man-user-circle-icon.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// import Favorites from "./Favorites";
import { useNavigate } from "react-router";
import {
  resetUserSearchState,
  userSearchFrToken,
} from "../Redux/Slices/SearchingUserSlice";

const SideBar = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [imageReal, setImage] = useState("");
  const dispatch = useDispatch();
  const { errorSearch, userFrTokenData } = useSelector(
    (state) => state.userSearch
  );
  useEffect(() => {
    dispatch(userSearchFrToken());
  }, [dispatch]);

  useEffect(() => {
    if (userFrTokenData) {
      setUserName(userFrTokenData.userInfo.userName);
      setEmail(userFrTokenData.userInfo.email);
      setImage(userFrTokenData.userInfo.pic);

      // Use a timeout to reset the state after 5 seconds
      const timer = setTimeout(() => {
        dispatch(resetUserSearchState());
      }, 5000);
      // Clear the timer on component unmount or if data/error changes
      return () => clearTimeout(timer);
    }
  }, [userFrTokenData, errorSearch, dispatch]);

  const navigate = useNavigate();
  let Bookings = () => {
    navigate("/Bookings");
  };
  let payment = () => {
    navigate("/PaymentOptions");
  };
  let Logout = () => {
    localStorage.removeItem("jwtToken");
    navigate("/SignIn");
  };
  let Notifications = () => {
    navigate("/Notifications");
  };
  let Password = () => {
    navigate("/changePassword");
  };

  let Favoritess = () => {
    navigate("/Favorites");
  };
  let goDashboard = () => {
    navigate("/dashboard");
  };
  let goUserProfile = () => {
    navigate("/userProfile");
  };

  return (
    <div className=" flex flex-col items-center gap-y-14 bg-[#3654ff] w-[18%] p-6 h-[100vh] opacity-85 transition-all duration-500 ease-in-out">
      <h1 className="text-xs text-white lg:text-2xl smd:text-lg font-joining ">
        User Dashboard
      </h1>
      <div className="flex flex-col items-center justify-center gap-y-4">
        <div className="flex flex-col items-center justify-center gap-y-3">
          <img
            src={imageReal !== " " ? imageReal : image}
            alt="profile"
            className="object-cover w-8 h-8 rounded-full md:h-14 md:w-14"
          />
          <div className="flex-col items-center justify-center hidden smd:flex gap-y-2">
            <p className="mt-1 text-xs text-white font-radios lg:text-lg">
              {userName}
            </p>
            <p className="text-xs text-white font-radios lg:text-sm">{email}</p>
          </div>
        </div>
      </div>
      <ul className="flex flex-col justify-start gap-y-4 items-stajustify-start">
        <li
          className="flex flex-row items-center gap-x-4 "
          onClick={goDashboard}
        >
          <span className="flex flex-row gap-x-4 text-white items-center transition-all duration-500 ease-in-out cursor-pointer hover:text-[#3654ff] hover:bg-white p-3 rounded hover:shadow-lg hover:shadow-fade-black">
            <FontAwesomeIcon icon={faDashboard} className="text-lg" />
            <p className="hidden text-lg smd:block font-radios ">Dashboard</p>
          </span>
        </li>
        <li
          className="flex flex-row items-center gap-x-4"
          onClick={goUserProfile}
        >
          <span className="flex flex-row gap-x-4 text-white items-center transition-all duration-500 ease-in-out cursor-pointer hover:text-[#3654ff] hover:bg-white p-3 rounded hover:shadow-lg hover:shadow-fade-black">
            <FontAwesomeIcon icon={faUser} className="text-lg" />
            <p className="hidden text-lg smd:block font-radios ">
              Profile Info
            </p>
          </span>
        </li>
        <li className="flex flex-row items-center gap-x-4" onClick={Bookings}>
          <span className="flex flex-row gap-x-4 text-white items-center transition-all duration-500 ease-in-out cursor-pointer hover:text-[#3654ff] hover:bg-white p-3 rounded hover:shadow-lg hover:shadow-fade-black">
            <FontAwesomeIcon icon={faCartPlus} className="text-lg" />
            <p className="hidden text-lg smd:block font-radios ">Bookings</p>
          </span>
        </li>
        <li className="flex flex-row items-center gap-x-4" onClick={Password}>
          <span className="flex flex-row gap-x-4 text-white items-center transition-all duration-500 ease-in-out cursor-pointer hover:text-[#3654ff] hover:bg-white p-3 rounded hover:shadow-lg hover:shadow-fade-black">
            <FontAwesomeIcon icon={faPen} className="text-lg" />
            <p className="hidden text-lg smd:block font-radios ">Password</p>
          </span>
        </li>
        <li className="flex flex-row items-center gap-x-4" onClick={Favoritess}>
          <span className="flex flex-row gap-x-4 text-white items-center transition-all duration-500 ease-in-out cursor-pointer hover:text-[#3654ff] hover:bg-white p-3 rounded hover:shadow-lg hover:shadow-fade-black">
            <FontAwesomeIcon icon={faHeart} className="text-lg" />
            <p className="hidden text-lg smd:block font-radios ">Favorites</p>
          </span>
        </li>
        <li className="flex flex-row items-center gap-x-4" onClick={Logout}>
          <span className="flex flex-row gap-x-4 text-white items-center transition-all duration-500 ease-in-out cursor-pointer hover:text-[#3654ff] hover:bg-white p-3 rounded hover:shadow-lg hover:shadow-fade-black">
            <FontAwesomeIcon icon={faDoorOpen} className="text-lg" />
            <p className="hidden text-lg smd:block font-radios ">Logout</p>
          </span>
        </li>
        <li className="flex flex-row items-center gap-x-4" onClick={payment}>
          <span className="flex flex-row gap-x-4 text-white items-center transition-all duration-500 ease-in-out cursor-pointer hover:text-[#3654ff] hover:bg-white p-3 rounded hover:shadow-lg hover:shadow-fade-black">
            <FontAwesomeIcon icon={faDollarSign} className="text-lg" />
            <p className="hidden text-lg smd:block font-radios ">Payments</p>
          </span>
        </li>
        <li
          className="flex flex-row items-center gap-x-4"
          onClick={Notifications}
        >
          <span className="flex flex-row gap-x-4 text-white items-center transition-all duration-500 ease-in-out cursor-pointer hover:text-[#3654ff] hover:bg-white p-3 rounded hover:shadow-lg hover:shadow-fade-black">
            <FontAwesomeIcon icon={faBell} className="text-lg" />
            <p className="hidden text-lg smd:block font-radios ">
              Notification
            </p>
          </span>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
