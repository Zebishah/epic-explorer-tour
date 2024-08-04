import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import image2 from "../images/Epic_Explorer__3_-removebg-preview.png";
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
import { Link } from "react-router-dom";
const AboveNavbar = () => {
  return (
    <div className="z-20 flex flex-col">
      <nav className="fixed top-0 left-0 right-0 z-10 flex flex-col justify-center w-full px-4 py-4 bg-white shadow-lg smd:flex-row gap-y-4 lg:gap-x-44 smd:gap-x-10 backdrop-blur-md">
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
              className=" text-[#3654ff] smd:text-sm text-[10px] rounded-full hover:bg-fade-black hover:text-[#3654ff] transition-all 0.5s ease-in-out "
              icon={faEnvelope}
            ></FontAwesomeIcon>
            <p className="text-[#3654ff] font-radios smd:text-sm text-[10px]">
              zebihaider123@gmail.com
            </p>
          </div>

          <div className="flex flex-row items-center justify-center gap-x-2">
            <FontAwesomeIcon
              className="text-[#3654ff] smd:text-sm text-[10px] p-2 rounded-full hover:bg-fade-black hover:text-[#3654ff] transition-all 0.5s ease-in-out "
              icon={faPhone}
            ></FontAwesomeIcon>
            <p className="text-[#3654ff] font-radios smd:text-sm text-[10px]">
              0310-5904269
            </p>
          </div>
        </div>

        <div className="flex flex-row items-center justify-center lg:space-x-6 sm:space-x-4">
          <FontAwesomeIcon
            className=" text-[#3654ff] cursor-pointer p-2 smd:text-2xl text-sm rounded-full transition-all ease-in-out hover:bg-[#3654ff] hover:text-black  "
            icon={faInstagram}
          ></FontAwesomeIcon>
          <FontAwesomeIcon
            className=" text-[#3654ff] cursor-pointer p-2 smd:text-2xl text-sm rounded-full transition-all ease-in-out hover:bg-[#3654ff] hover:text-black  "
            icon={faWhatsapp}
          ></FontAwesomeIcon>
          <FontAwesomeIcon
            className=" text-[#3654ff] cursor-pointer p-2 smd:text-2xl text-sm rounded-full transition-all ease-in-out hover:bg-[#3654ff] hover:text-black  "
            icon={faLinkedin}
          ></FontAwesomeIcon>
          <FontAwesomeIcon
            className=" text-[#3654ff] cursor-pointer p-2 smd:text-2xl text-sm rounded-full transition-all ease-in-out hover:bg-[#3654ff] hover:text-black  "
            icon={faGlobe}
          ></FontAwesomeIcon>
        </div>
      </nav>
    </div>
  );
};

export default AboveNavbar;
