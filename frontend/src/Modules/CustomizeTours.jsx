import Footer from "./Footer";
import Navbar from "./Navbar";
import image2 from "../images/vecteezy_blue-trendy-background-design-template-for-banner-poster_.jpg";
import image from "../images/drif-riadh-YpkuRn54y4w-unsplash.jpg";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { showCustomTour } from "../Redux/Slices/ShowTourDetailsSlice";
import { useNavigate } from "react-router";
const CustomizeTours = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [tourDet, setTourDet] = useState([]);
  const [tourName, setTourName] = useState("");
  const [totalMembers, setTotalMembers] = useState("");
  const [tourDays, setTourDays] = useState("");
  const { customTours } = useSelector((state) => state.TourDetail);
  const bookTour = (id) => {
    navigate(`/BookTour?id=${encodeURIComponent(id)}`);
  };
  const handleSearch = () => {
    dispatch(showCustomTour(tourName, totalMembers, tourDays));
  };
  const handleReset = () => {
    setTourName("");
    setTotalMembers("");
    setTourDays("");
  };
  useEffect(() => {
    if (customTours.tours) {
      setTourDet(customTours.tours);
      console.log(customTours.tours);
    }
  }, [customTours]);

  return (
    <div
      className="w-full bg-center"
      style={{
        backgroundImage: `url(${image2})`,
      }}
    >
      <Navbar />
      <div className="relative w-full mt-20 h-[35vh]">
        <img
          src={image}
          alt="image"
          className="object-cover w-full h-full bg-center bg-no-repeat"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h2 className="p-4 text-6xl font-bold text-white rounded font-radios">
            Customize Tours
          </h2>
        </div>
      </div>
      <div className="w-screen max-w-screen-md m-10 mx-auto ">
        <div className="flex flex-col ">
          <div className="p-6 bg-white border border-gray-200 shadow-lg rounded-xl ">
            <form className="flex flex-col items-center justify-center gap-y-10">
              <h1 className="text-lg text-black font-radios ">
                Add Values on Which Basis You Wanna Search Tours Data
              </h1>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
                <div className="flex flex-col">
                  <label
                    htmlFor="tourName"
                    className="text-sm font-medium text-stone-600"
                  >
                    Tour City
                  </label>
                  <input
                    type="text"
                    id="tourName"
                    value={tourName}
                    onChange={(e) => setTourName(e.target.value)}
                    placeholder="type tourLocation here..."
                    className="block w-full px-2 py-2 mt-2 bg-gray-100 border border-gray-100 rounded-md shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  />
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="totalMembers"
                    className="text-sm font-medium text-stone-600"
                  >
                    Tour Members
                  </label>
                  <input
                    type="text"
                    id="totalMembers"
                    value={totalMembers}
                    onChange={(e) => setTotalMembers(e.target.value)}
                    placeholder="type TourMembers here..."
                    className="block w-full px-2 py-2 mt-2 bg-gray-100 border border-gray-100 rounded-md shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  />
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="tourDays"
                    className="text-sm font-medium text-stone-600"
                  >
                    Tour Days
                  </label>
                  <input
                    type="text"
                    id="tourDays"
                    value={tourDays}
                    onChange={(e) => setTourDays(e.target.value)}
                    placeholder="type TourDays here..."
                    className="block w-full px-2 py-2 mt-2 bg-gray-100 border border-gray-100 rounded-md shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  />
                </div>
              </div>
              <div className="grid justify-end w-full grid-cols-2 mt-6 space-x-4 md:flex">
                <button
                  className="px-8 py-2 font-medium text-gray-700 bg-gray-200 rounded-lg outline-none hover:opacity-80 focus:ring"
                  type="button"
                  onClick={handleReset}
                >
                  Reset
                </button>
                <button
                  className="px-8 py-2 font-medium text-white bg-blue-600 rounded-lg outline-none hover:opacity-80 focus:ring"
                  type="button"
                  onClick={handleSearch}
                >
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap justify-center gap-8">
        {tourDet.length > 0 &&
          tourDet.map((tour, index) => (
            <div
              className="bg-[#3654ff] w-full max-w-sm rounded-lg overflow-hidden font-[sans-serif] shadow-lg shadow-black"
              key={index}
            >
              <img src={tour.image} className="w-full" alt="Car" />
              <div className="px-4 py-6 border-[#3654ff] border-2 border-t-0">
                <div className="flex flex-row justify-between">
                  <h3 className="text-xl text-white font-radios">
                    {tour.name}
                  </h3>
                  <h3 className="text-xl text-white font-radios">
                    {tour.price}
                  </h3>
                </div>
                <p className="mt-4 text-sm text-white font-radios">
                  {tour.description}
                </p>
                <div className="flex justify-center mt-6">
                  <button
                    type="button"
                    className="px-6 py-2.5 rounded text-sm tracking-wider font-radios border-none outline-none bg-white text-[#3654ff] "
                    onClick={() => bookTour(tour._id)}
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
      <Footer />
    </div>
  );
};

export default CustomizeTours;
