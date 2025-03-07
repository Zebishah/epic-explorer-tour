import { faSignOut } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import image2 from "../images/Epic_Explorer__3_-removebg-preview.png";
import image from "../images/man-user-circle-icon.png";
import {
  faCaretDown,
  faTimes,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import {
  faEnvelope,
  faGlobe,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import {
  faInstagram,
  faLinkedin,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import {
  resetUserSearchState,
  userSearchFrToken,
} from "../Redux/Slices/SearchingUserSlice";

// const queryParams = new URLSearchParams(location.search);
// const userName = queryParams.get("userName") || "";
// import AboveNavbar from "./AboveNavbar";
const Navbar = () => {
  const navigate = useNavigate();
  const [isPackagesOpen, setIsPackagesOpen] = useState(false);
  const [imageReal, setImage] = useState("");
  const [isBookingsOpen, setIsBookingsOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const dispatch = useDispatch();
  const { userFrTokenData } = useSelector((state) => state.userSearch);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    dispatch(userSearchFrToken());
  }, [dispatch]);
  let Logout = () => {
    localStorage.removeItem("jwtToken");
    navigate("/SignIn");
  };
  useEffect(() => {
    if (userFrTokenData) {
      setUserName(userFrTokenData.userInfo.userName);
      setImage(userFrTokenData.userInfo.pic);
      // Use a timeout to reset the state after 5 seconds
      const timer = setTimeout(() => {
        dispatch(resetUserSearchState());
      }, 5000);
      // Clear the timer on component unmount or if data/error changes
      return () => clearTimeout(timer);
    }
  }, [userFrTokenData, dispatch]);

  return (
    <div className="z-20 flex flex-col w-full gap-y-1 ">
      <ToastContainer />
      <nav className="  hidden smd:flex flex-col smd:flex-row gap-y-4 justify-center lg:gap-x-36 smd:gap-x-10 py-4 px-4 bg-[#ffffffd5] opacity-100  w-full fixed top-0 left-0 right-0 z-10">
        <Link to={"/"}>
          <div className="flex items-center justify-center">
            <img
              className="object-cover h-10 w-28 smd:h-12 smd:w-32" // Adjust these values as needed
              src={image2}
              alt="Store Logo"
            />
          </div>
        </Link>
        <div className="flex flex-row items-center justify-center gap-x-6">
          <div className="flex flex-row items-center justify-center gap-x-2">
            <FontAwesomeIcon
              className=" text-[#3654ff] smd:text-sm text-[10px] rounded-full hover:bg-[#3654ff] hover:text-white transition-all 0.5s ease-in-out "
              icon={faEnvelope}
            ></FontAwesomeIcon>
            <p className="text-[#3654ff] font-radios smd:text-sm text-[10px]">
              zebihaider123@gmail.com
            </p>
          </div>

          <div className="flex flex-row items-center justify-center gap-x-2">
            <FontAwesomeIcon
              className="text-[#3654ff] smd:text-sm text-[10px] p-2 rounded-full hover:bg-[#3654ff] hover:text-white transition-all 0.5s ease-in-out "
              icon={faPhone}
            ></FontAwesomeIcon>
            <p className="text-[#3654ff] font-radios smd:text-sm text-[10px]">
              0310-5904269
            </p>
          </div>
        </div>

        <div className="flex flex-row items-center justify-center lg:space-x-6 sm:space-x-4">
          <FontAwesomeIcon
            className=" text-[#3654ff] cursor-pointer p-2 smd:text-2xl text-sm rounded-full transition-all ease-in-out hover:bg-[#3654ff] hover:text-white  "
            icon={faInstagram}
          ></FontAwesomeIcon>
          <FontAwesomeIcon
            className=" text-[#3654ff] cursor-pointer p-2 smd:text-2xl text-sm rounded-full transition-all ease-in-out hover:bg-[#3654ff] hover:text-white  "
            icon={faWhatsapp}
          ></FontAwesomeIcon>
          <FontAwesomeIcon
            className=" text-[#3654ff] cursor-pointer p-2 smd:text-2xl text-sm rounded-full transition-all ease-in-out hover:bg-[#3654ff] hover:text-white  "
            icon={faLinkedin}
          ></FontAwesomeIcon>
          <FontAwesomeIcon
            className=" text-[#3654ff] cursor-pointer p-2 smd:text-2xl text-sm rounded-full transition-all ease-in-out hover:bg-[#3654ff] hover:text-white  "
            icon={faGlobe}
          ></FontAwesomeIcon>
        </div>
      </nav>
      <nav className="flex justify-between py-4 px-4 bg-[#ffffffd5] opacity-100 fixed w-full smd:mt-[4.69rem] left-0 right-0 z-10">
        <div className="flex items-center">
          <img
            className="object-cover h-12 w-28 smd:h-12 smd:w-32" // Adjust these values as needed
            src={image2}
            alt="Store Logo"
          />
        </div>
        <div className="items-center hidden md:flex lg:space-x-9 sm:space-x-4">
          <Link
            to={"/"}
            className="font-radios p-2 rounded-xl hover:shadow-lg hover:shadow-fade-black flex lg:text-[14px] md:text-[12px] text-[#3654ff] cursor-pointer duration-300 hover:bg-[#3654ff] hover:text-white transition-all ease-in-out  "
          >
            Home
          </Link>
          <div className="relative ">
            <Link
              className="font-radios p-2 rounded-xl hover:shadow-lg hover:shadow-fade-black flex items-center cursor-pointer duration-300 text-[#3654ff] lg:text-[14px] md:text-[12px] hover:bg-[#3654ff] hover:text-white transition-all ease-in-out"
              onMouseEnter={() => setIsPackagesOpen(true)}
              onClick={() => setIsPackagesOpen(!isPackagesOpen)}
            >
              Packages
              <FontAwesomeIcon icon={faCaretDown} className="mt-1 ml-1" />
            </Link>
            {isPackagesOpen && (
              <div
                className="absolute z-10 flex flex-col items-center w-40 p-2 mt-2 bg-blue-600 shadow-lg rounded-xl hover:shadow-lg hover:shadow-fade-black shadow-black -ml-14"
                onMouseLeave={() => setIsPackagesOpen(false)}
              >
                <Link
                  to={"/FamilyTours"}
                  href="#"
                  className="font-radios block px-2 py-2 text-sm text-white hover:text-blue-600 hover:bg-white rounded-md lg:text-[14px] md:text-[12px] "
                >
                  Family Packages{" "}
                </Link>
                <Link
                  to={"/HoneyMoonPackages"}
                  href="#"
                  className="font-radios block px-2 py-2 text-sm text-white hover:text-blue-600 hover:bg-white rounded-md lg:text-[14px] md:text-[12px]"
                >
                  Honey Packages{" "}
                </Link>
                <Link
                  to={"/PersonalPackages"}
                  href="#"
                  className="font-radios block px-2 py-2 text-sm text-white hover:text-blue-600 hover:bg-white rounded-md lg:text-[14px] md:text-[12px]"
                >
                  Personal Packages{" "}
                </Link>
              </div>
            )}
          </div>
          <div className="relative">
            <Link
              className="font-radios p-2 rounded-xl hover:shadow-lg hover:shadow-fade-black flex items-center text-[#3654ff] cursor-pointer duration-300 lg:text-[14px] md:text-[12px] hover:bg-[#3654ff] hover:text-white transition-all ease-in-out"
              onMouseEnter={() => setIsBookingsOpen(true)}
              onClick={() => setIsBookingsOpen(!isBookingsOpen)}
            >
              Bookings
              <FontAwesomeIcon icon={faCaretDown} className="mt-1 ml-1" />
            </Link>
            {isBookingsOpen && (
              <div
                className="absolute z-10 flex flex-col items-center w-40 py-2 mt-2 -ml-6 bg-blue-600 rounded-md shadow-lg shadow-black"
                onMouseLeave={() => setIsBookingsOpen(false)}
              >
                <Link
                  to={"/AllTours"}
                  href="#"
                  className="font-radios p-2 rounded-xl hover:shadow-lg hover:shadow-fade-black block px-2 py-2 text-sm text-white hover:text-blue-600 hover:bg-white lg:text-[14px] md:text-[12px]"
                >
                  Tour Booking{" "}
                </Link>
                <Link
                  to={"/AllHotels"}
                  href="#"
                  className="font-radios p-2 rounded-xl hover:shadow-lg hover:shadow-fade-black block px-2 py-2 text-sm text-white hover:text-blue-600 hover:bg-white lg:text-[14px] md:text-[12px]"
                >
                  Hotel booking{" "}
                </Link>
                <Link
                  to={"/AllTransport"}
                  href="#"
                  className="font-radios p-2 rounded-xl hover:shadow-lg hover:shadow-fade-black block px-2 py-2 text-sm text-white hover:text-blue-600 hover:bg-white lg:text-[14px] md:text-[12px]"
                >
                  Transport booking{" "}
                </Link>
              </div>
            )}
          </div>
          <Link
            to={"/discountedTour"}
            className="font-radios p-2 rounded-xl hover:shadow-lg hover:shadow-fade-black flex text-[#3654ff] cursor-pointer duration-300 hover:bg-[#3654ff] hover:text-white transition-all ease-in-out lg:text-[14px] md:text-[12px]"
          >
            Discounts{" "}
          </Link>
          <Link
            to={"/Blogs"}
            className="font-radios p-2 rounded-xl hover:shadow-lg hover:shadow-fade-black flex text-[#3654ff] cursor-pointer duration-300 hover:bg-[#3654ff] hover:text-white transition-all ease-in-out lg:text-[14px] md:text-[12px]"
          >
            Blog{" "}
          </Link>
          <Link
            to={"/chatBot"}
            className="font-radios p-2 rounded-xl hover:shadow-lg hover:shadow-fade-black flex text-[#3654ff] cursor-pointer duration-300 hover:bg-[#3654ff] hover:text-white transition-all ease-in-out lg:text-[14px] md:text-[12px]"
          >
            ChatBot{" "}
          </Link>
          <Link
            to={"/ContactUs"}
            className=" font-radios p-2 rounded-xl hover:shadow-lg hover:shadow-fade-black flex text-[#3654ff] cursor-pointer duration-300 hover:bg-[#3654ff] hover:text-white transition-all ease-in-out lg:text-[14px] md:text-[12px]"
          >
            Contact Us{" "}
          </Link>
        </div>
        <div className="flex items-center smd:space-x-5 sssm:space-x-2">
          {localStorage.getItem("jwtToken") ? (
            <Link
              to={"/Dashboard"}
              className="font-radios p-2 rounded-xl flex cursor-pointer hover:shadow-lg hover:bg-[#3654ff] hover:shadow-fade-black duration-300 font-semibold text-[#3654ff] hover:text-white sssm:text-sm lg:text-[14px] md:text-[12px] transition-all ease-in-out"
            >
              {" "}
              <div className="flex-row items-center justify-center hidden lg:flex gap-x-1 hover:text-white ">
                <div className="mr-4 overflow-hidden rounded-full ">
                  <img
                    src={imageReal !== " " ? imageReal : image}
                    alt="image"
                    className="w-10 h-10"
                  />
                </div>
                <p className="text-lg font-radios">{userName}</p>
              </div>
            </Link>
          ) : (
            <Link
              to={"/signUp"}
              className="font-radios p-2 rounded-xl hover:shadow-lg flex hover:shadow-fade-black text-[#3654ff] cursor-pointer duration-300 hover:bg-[#3654ff] hover:text-white transition-all ease-in-out sssm:text-sm lg:text-[14px] md:text-[12px]"
            >
              <svg
                className="fill-current h-5 w-5 mr-2 mt-0.5"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                version="1.1"
                width={24}
                height={24}
                viewBox="0 0 24 24"
              >
                <path d="M12 0L11.34 .03L15.15 3.84L16.5 2.5C19.75 4.07 22.09 7.24 22.45 11H23.95C23.44 4.84 18.29 0 12 0M12 4C10.07 4 8.5 5.57 8.5 7.5C8.5 9.43 10.07 11 12 11C13.93 11 15.5 9.43 15.5 7.5C15.5 5.57 13.93 4 12 4M12 6C12.83 6 13.5 6.67 13.5 7.5C13.5 8.33 12.83 9 12 9C11.17 9 10.5 8.33 10.5 7.5C10.5 6.67 11.17 6 12 6M.05 13C.56 19.16 5.71 24 12 24L12.66 23.97L8.85 20.16L7.5 21.5C4.25 19.94 1.91 16.76 1.55 13H.05M12 13C8.13 13 5 14.57 5 16.5V18H19V16.5C19 14.57 15.87 13 12 13M12 15C14.11 15 15.61 15.53 16.39 16H7.61C8.39 15.53 9.89 15 12 15Z" />
              </svg>
              Register
            </Link>
          )}
          <div>
            {localStorage.getItem("jwtToken") ? (
              <Link
                to={"/Dashboard"}
                className="font-radios p-3 rounded-xl flex cursor-pointer hover:text-white hover:shadow-lg hover:bg-[#3654ff] hover:shadow-fade-black duration-300 font-semibold text-[#3654ff] sssm:text-sm lg:text-[14px] md:text-[12px] transition-all ease-in-out"
              >
                {" "}
                <li
                  className="flex flex-row items-center gap-x-4 hover:text-white"
                  onClick={Logout}
                >
                  <span className="flex flex-row gap-x-4 text-[#3654ff] hover:text-white items-center transition-all duration-300 ease-in-out cursor-pointer ">
                    <FontAwesomeIcon
                      icon={faSignOut}
                      className="text-lg hover:text-white"
                    />
                    <p className="hidden text-lg smd:block font-radios hover:text-white">
                      Logout
                    </p>
                  </span>
                </li>
              </Link>
            ) : (
              <Link
                className="font-radios p-2 rounded-xl hover:shadow-lg hover:shadow-fade-black flex cursor-pointer duration-300 font-semibold text-[#3654ff] sssm:text-sm md:text-[12px] hover:bg-[#3654ff] hover:text-white transition-all ease-in-out"
                to={"/SignIn"}
              >
                <svg
                  className="fill-current h-5 w-5 mr-2 mt-0.5"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  version="1.1"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                >
                  <path d="M10,17V14H3V10H10V7L15,12L10,17M10,2H19A2,2 0 0,1 21,4V20A2,2 0 0,1 19,22H10A2,2 0 0,1 8,20V18H10V20H19V4H10V6H8V4A2,2 0 0,1 10,2Z" />
                </svg>
                Login
              </Link>
            )}
          </div>

          <button
            className="p-2 rounded-xl hover:shadow-lg hover:shadow-fade-black lg:hidden text-[#3654ff] focus:outline-none ssm:text-base md:text-lg hover:bg-[#3654ff] hover:text-white transition-all ease-in-out"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} />
          </button>
        </div>
      </nav>
      {isMenuOpen && (
        <div className="fixed flex flex-col items-center w-full mt-20 space-y-2 rounded-md shadow-md lg:hidden smd:mt-40 bg-light-black ">
          <Link className="p-2 rounded-xl hover:shadow-lg hover:shadow-fade-black flex sm:text-sm md:text-[12px] text-[#3654ff] hover:bg-[#3654ff] hover:text-white transition-all ease-in-out cursor-pointer duration-300 ">
            Home
          </Link>
          <div className="relative">
            <Link
              className="p-2 rounded-xl hover:shadow-lg hover:shadow-fade-black flex items-center cursor-pointer duration-300 text-[#3654ff] hover:bg-[#3654ff] hover:text-white transition-all ease-in-out lg:text-[16px] md:text-[12px]"
              onClick={() => setIsPackagesOpen(!isPackagesOpen)}
            >
              Packages
              <FontAwesomeIcon icon={faCaretDown} className="mt-1 ml-1" />
            </Link>
            {isPackagesOpen && (
              <div className="absolute z-10 flex flex-col items-center mt-2 -ml-6 rounded-md shadow-lg w-28 bg-fade-black shadow-black">
                <Link
                  href="#"
                  className="p-2 rounded-xl hover:shadow-lg hover:shadow-fade-black block px-2 py-2 text-sm text-[#3654ff] hover:bg-[#3654ff] hover:text-white transition-all ease-in-out sm:text-sm lg:text-[16px] md:text-[12px] "
                >
                  Package 1{" "}
                </Link>
                <Link
                  href="#"
                  className="p-2 rounded-xl hover:shadow-lg hover:shadow-fade-black block px-2 py-2 text-sm text-[#3654ff] hover:bg-[#3654ff] hover:text-white transition-all ease-in-out sm:text-sm lg:text-[16px] md:text-[12px]"
                >
                  Package 2{" "}
                </Link>
                <Link
                  href="#"
                  className="p-2 rounded-xl hover:shadow-lg hover:shadow-fade-black block px-2 py-2 text-sm text-[#3654ff] hover:bg-[#3654ff] hover:text-white transition-all ease-in-out sm:text-sm lg:text-[16px] md:text-[12px]"
                >
                  Package 3{" "}
                </Link>
              </div>
            )}
          </div>
          <div className="relative">
            <Link
              className="p-2 rounded-xl hover:shadow-lg hover:shadow-fade-black flex items-center text-[#3654ff] hover:bg-[#3654ff] hover:text-white transition-all ease-in-out cursor-pointer duration-300 lg:text-[16px] md:text-[12px]"
              onClick={() => setIsBookingsOpen(!isBookingsOpen)}
            >
              Bookings
              <FontAwesomeIcon icon={faCaretDown} className="mt-1 ml-1" />
            </Link>
            {isBookingsOpen && (
              <div className="absolute z-10 flex flex-col items-center mt-2 -ml-6 rounded-md shadow-lg w-28 bg-light-black shadow-black">
                <Link
                  href="#"
                  className="p-2 rounded-xl hover:shadow-lg hover:shadow-fade-black block px-2 py-2 text-sm text-[#3654ff] hover:bg-[#3654ff] hover:text-white transition-all ease-in-out sm:text-sm lg:text-[16px] md:text-[12px]"
                >
                  booking 1{" "}
                </Link>
                <Link
                  href="#"
                  className="p-2 rounded-xl hover:shadow-lg hover:shadow-fade-black block px-2 py-2 text-sm text-[#3654ff] hover:bg-[#3654ff] hover:text-white transition-all ease-in-out sm:text-sm lg:text-[16px] md:text-[12px]"
                >
                  booking 2{" "}
                </Link>
                <Link
                  href="#"
                  className="p-2 rounded-xl hover:shadow-lg hover:shadow-fade-black block px-2 py-2 text-sm text-[#3654ff] hover:bg-[#3654ff] hover:text-white transition-all ease-in-out sm:text-sm lg:text-[16px] md:text-[12px]"
                >
                  booking 3{" "}
                </Link>
              </div>
            )}
          </div>
          <Link className="p-2 rounded-xl hover:shadow-lg hover:shadow-fade-black flex text-[#3654ff] hover:bg-[#3654ff] hover:text-white transition-all ease-in-out cursor-pointer duration-300 sm:text-sm lg:text-[16px] md:text-[12px]">
            Discounts{" "}
          </Link>
          <Link className="p-2 rounded-xl hover:shadow-lg hover:shadow-fade-black flex text-[#3654ff] hover:bg-[#3654ff] hover:text-white transition-all ease-in-out cursor-pointer duration-300 sm:text-sm lg:text-[16px] md:text-[12px]">
            Blog{" "}
          </Link>
          <Link className="p-2 rounded-xl hover:shadow-lg hover:shadow-fade-black flex text-[#3654ff] hover:bg-[#3654ff] hover:text-white transition-all ease-in-out cursor-pointer duration-300 sm:text-sm lg:text-[16px] md:text-[12px]">
            Contact Us{" "}
          </Link>
          <Link className="p-2 rounded-xl hover:shadow-lg hover:shadow-fade-black flex text-[#3654ff] hover:bg-[#3654ff] hover:text-white transition-all ease-in-out cursor-pointer duration-300">
            Favorites
          </Link>
          <Link className="p-2 rounded-xl hover:shadow-lg hover:shadow-fade-black flex text-[#3654ff] hover:bg-[#3654ff] hover:text-white transition-all ease-in-out cursor-pointer duration-300">
            Discounts
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
