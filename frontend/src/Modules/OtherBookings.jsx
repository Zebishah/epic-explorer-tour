import backgroundImage from "../images/traffic-vehicle-urban-reflections-city.jpg";
import backgroundImage2 from "../images/pexels-pixabay-261102.jpg";
import { useNavigate } from "react-router";

const OtherBookings = () => {
  const navigate = useNavigate();
  const BookTransport = () => {
    navigate("/AllTransport");
  };
  const BookHotel = () => {
    navigate("/AllHotels");
  };

  return (
    <div className="flex flex-col w-full h-auto mt-16">
      <h1 className="flex items-center justify-center p-4 mx-auto text-3xl text-white bg-blue-600 rounded-lg shadow-lg w-max font-joining">
        Other Bookings
      </h1>
      <div className="flex flex-col items-center justify-center h-full space-y-6 lg:p-8">
        <div className="relative border-2 border-[#3654ff] bg-gradient-to-r from-purple-600 to-blue-600 text-white overflow-hidden w-[80%] h-[40vh] rounded-xl shadow-lg shadow-fade-black">
          <div className="absolute inset-0 ">
            <img
              src={backgroundImage}
              alt="....."
              className="object-cover w-full h-full bg-center"
            />
            <div className="absolute inset-0 bg-black opacity-50" />
          </div>
          <div className="relative z-10 flex flex-col items-center justify-center h-full text-center">
            <h1 className="mb-4 text-2xl font-bold leading-tight md:text-5xl">
              Book Some Amazing Transport Services
            </h1>
            <p className="text-lg text-gray-300 mb-8 w-[90%]">
              Discover amazing Transport and services that await you.
            </p>
            <button
              type="button"
              onClick={BookTransport}
              className=" mt-4 w-[55%] md:w-[25%] hover:before:bg-red rounded-xl relative h-[50px] overflow-hidden border border-[#3654ff] bg-[#00000065] px-3 text-white shadow-lg transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-[#3654ff] before:transition-all before:duration-500 hover:text-white hover:shadow-[#3654ff] hover:before:left-0 hover:before:w-full"
            >
              <span className="relative z-10 text-lg text-radios">
                Book Transport
              </span>
            </button>
          </div>
        </div>

        <div className="relative border-2 border-[#3654ff] bg-gradient-to-r from-purple-600 to-blue-600 h-[40vh] text-white overflow-hidden w-[80%] rounded-xl shadow-lg shadow-fade-black">
          <div className="absolute inset-0">
            <img
              src={backgroundImage2}
              className="object-cover w-full h-full bg-center"
            />
            <div className="absolute inset-0 bg-black opacity-50" />
          </div>
          <div className="relative z-10 flex flex-col items-center justify-center h-full text-center">
            <h1 className="mb-4 text-2xl font-bold leading-tight md:text-5xl">
              Book Some Amazing Hotel Services
            </h1>
            <p className="mb-8 text-lg text-gray-300 ">
              Discover amazing Hotels and services that await you.
            </p>
            <button
              type="button"
              onClick={BookHotel}
              className=" mt-4 w-[55%] md:w-[25%] hover:before:bg-red rounded-xl relative h-[50px] overflow-hidden border border-[#3654ff] bg-[#00000065] px-3 text-white shadow-lg transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-[#3654ff] before:transition-all before:duration-500 hover:text-white hover:shadow-[#3654ff] hover:before:left-0 hover:before:w-full"
            >
              <span className="relative z-10 text-lg text-radios">
                Book Hotels
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtherBookings;
