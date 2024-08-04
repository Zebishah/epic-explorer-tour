import { faCar, faHotel, faMap } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Footer from "./Footer";
import Navbar from "./Navbar";
import SideBar from "./SideBar";
import image2 from "../images/vecteezy_blue-trendy-background-design-template-for-banner-poster_.jpg";
import { Link } from "react-router-dom";
const BookingOptions = () => {
  return (
    <div
      className="flex flex-col min-h-screen bg-center bg-cover"
      style={{ backgroundImage: `url(${image2})` }}
    >
      <Navbar />
      <div className="flex flex-row w-full h-full mt-20 overflow-hidden bg-opacity-0 gap-x-6 bg-light-black smd:mt-40">
        <SideBar />

        <div className="flex flex-col justify-center gap-y-10 p-6 items-center w-[80%] ">
          <h1 className="text-white text-5xl font-joining bg-[#3654ff] bg-opacity-70 p-4 rounded-lg ">
            User Bookings
          </h1>
          <section className="benefits-container grid grid-cols-1 md:grid-cols-3 gap-4 px-4 py-16 w-[80%]">
            <Link to={"/tourBooked"}>
              <div className="benefit-card bg-[#3654ff] rounded-md shadow-lg p-4 flex flex-col items-center gap-y-3">
                <FontAwesomeIcon
                  icon={faMap}
                  className="items-center text-4xl text-white"
                ></FontAwesomeIcon>
                <div className="flex flex-col items-center justify-center gap-y-0">
                  <h3 className="mb-2 text-xl font-semibold text-white ">
                    Tours Booking
                  </h3>
                  <p className="text-center text-white ">
                    Thrilling adventures await! Join us for adrenaline-pumping
                    journeys experiences worldwide.
                  </p>
                </div>
              </div>
            </Link>
            <Link to={"/hotelBooked"}>
              <div className="benefit-card bg-[#3654ff] rounded-md shadow-lg p-4 flex flex-col items-center gap-y-3">
                <FontAwesomeIcon
                  icon={faHotel}
                  className="items-center text-4xl text-white"
                ></FontAwesomeIcon>
                <div className="flex flex-col items-center justify-center gap-y-0">
                  <h3 className="mb-2 text-xl font-semibold text-center text-white">
                    Hotel Bookings
                  </h3>
                  <p className="text-center text-white">
                    Thrilling adventures await! Join us for adrenaline-pumping
                    journeys experiences worldwide.
                  </p>
                </div>
              </div>
            </Link>
            <Link to={"/transportBooked"}>
              <div className="benefit-card bg-[#3654ff] rounded-md shadow-lg p-4 flex flex-col items-center gap-y-3 ">
                <FontAwesomeIcon
                  icon={faCar}
                  className="items-center text-4xl text-white"
                ></FontAwesomeIcon>
                <div className="flex flex-col items-center justify-center gap-y-0">
                  <h3 className="mb-2 text-xl font-semibold text-center text-white">
                    transport Bookings
                  </h3>
                  <p className="text-center text-white">
                    Thrilling adventures await! Join us for adrenaline-pumping
                    journeys experiences worldwide.
                  </p>
                </div>
              </div>
            </Link>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BookingOptions;
