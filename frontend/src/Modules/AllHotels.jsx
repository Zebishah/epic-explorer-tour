import image from "../image/Family Packages (18).png";
import image2 from "../img/vecteezy_blue-and-white-curve-shape-background_11403724.jpg";
import Footer from "./Footer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { showHotels } from "../Redux/Slices/showAccommodationsSlice";
import { useNavigate } from "react-router";
import SingleNavbar from "./SingleNavbar";

const AllHotels = () => {
  const [Hotels, setHotels] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { hotels } = useSelector((state) => state.showAccommodations);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    dispatch(showHotels());
  }, [dispatch]);

  useEffect(() => {
    if (hotels && hotels.Hotel) {
      setHotels(hotels.Hotel);
    }
  }, [hotels]);
  let BookHotel = (id) => {
    navigate(`/AllRoom?id=${encodeURIComponent(id)}`);
  };
  let totalPages = 0;
  let currentHotels = [];
  if (Hotels && Array.isArray(Hotels)) {
    totalPages = Math.ceil(Hotels.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    currentHotels = Hotels.slice(startIndex, startIndex + itemsPerPage);
  }

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  return (
    <div
      className="z-10 flex flex-col w-full h-full gap-y-24" /* Lower z-index for the banner */
      style={{
        backgroundImage: `url(${image2})`,
      }}
    >
      {" "}
      <SingleNavbar />
      <div className="relative font-sans pointer-events-none before:absolute before:w-full before:h-full before:inset-0 before:opacity-90 before:z-10">
        <img
          src={image}
          alt=".."
          className="absolute inset-0 object-cover w-full h-full "
        />

        <div className="min-h-[350px] relative z-50 h-full max-w-6xl mx-auto flex flex-col justify-center items-center text-center text-white p-6"></div>
      </div>
      <div className="flex flex-col items-center justify-center mx-auto w-[80%] min-h-screen p-8 overflow-hidden bg-dark lg:flex-row gap-x-6">
        <div className="w-full mx-auto ">
          <div className="text-center bg-[#3654ff] py-4 rounded mb-8 text-white">
            <h1 className="text-2xl font-bold">List of All Hotels</h1>
          </div>

          <div className="flex flex-wrap justify-center gap-8">
            {currentHotels.length > 0 &&
              currentHotels.map((tour, index) => (
                <div
                  className="bg-white bg-cover bg-center w-full max-w-sm rounded-xl overflow-hidden mx-auto font-[sans-serif] shadow-lg shadow-fade-black p-5 hover:shadow-lg hover:shadow-black hover:scale-110 transition-all duration-300 ease-in-out cursor-pointer  "
                  key={index}
                  style={{
                    backgroundImage: `url(${image2})`,
                  }}
                >
                  <div className="relative">
                    <div className="absolute top-8 right-0 transform translate-y-[-50%]">
                      <div className="absolute p-2 text-white bg-blue-600 shadow-lg tag -top-4 right-2 w-max rounded-xl font-radios shadow-fade-black animate-blink">
                        Available
                      </div>
                    </div>
                    <img
                      alt="...."
                      src={tour.image}
                      className="w-full h-56 rounded-xl"
                    />
                  </div>
                  <div className="p-3 mt-2 bg-[#206eff] rounded-xl">
                    <div className="flex flex-row justify-between">
                      <h3 className="text-xl text-white font-radios">
                        {tour.name}
                      </h3>
                      <h3 className="text-xl text-white font-radios">
                        {tour.prices} pkr
                      </h3>
                    </div>

                    <p className="mt-4 text-sm text-white font-radios">
                      {tour.description}
                    </p>
                    <div className="flex flex-row justify-between mt-4 ">
                      <h3 className="text-xs text-white font-radios">
                        <span className="text-sm font-radios">Rooms : </span>
                        {tour.roomCount} Rooms
                      </h3>
                    </div>
                    <div className="flex justify-center mt-6">
                      <button
                        type="button"
                        onClick={() => BookHotel(tour._id)}
                        className="w-[40%] hover:before:bg-red rounded-xl relative h-[50px] overflow-hidden bg-white px-3 text-[#3654ff] shadow-lg transition-all ease-in-out before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-[#206eff] hover:shadow-lg hover:shadow-white before:transition-all before:duration-500 hover:text-white hover:before:left-0 hover:before:w-full"
                      >
                        <span className="relative z-10 text-lg text-radios">
                          Book Tour
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
          <div className="flex justify-center mt-8">
            <ul className="flex gap-2">
              {Array.from({ length: totalPages }, (_, index) => (
                <li key={index} className="mx-1">
                  <button
                    className={`px-3 py-1 rounded ${
                      currentPage === index + 1
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200"
                    }`}
                    onClick={() => handlePageChange(index + 1)}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AllHotels;
