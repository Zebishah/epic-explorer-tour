import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showRelatedHotels } from "../Redux/Slices/ShowTourDetailsSlice";
import { useNavigate } from "react-router";

import image2 from "../img/vecteezy_blue-and-white-curve-shape-background_11403724.jpg";
const RelatedHotel = (id) => {
  const dispatch = useDispatch();
  const [HotelDet, setHotelDet] = useState([]);
  const navigate = useNavigate();
  const { relatedHotel } = useSelector((state) => state.TourDetail);

  useEffect(() => {
    if (id) {
      dispatch(showRelatedHotels(id));
    }
  }, []);
  useEffect(() => {
    if (relatedHotel && relatedHotel.rooms) {
      setHotelDet(relatedHotel.rooms.slice(0, 3));
    }
    console.log(relatedHotel);
  }, [relatedHotel]);
  const BookHotel = (id) => {
    navigate(`/BookHotel?id=${encodeURIComponent(id)}`);
  };
  return (
    <div className="flex flex-col flex-wrap items-center justify-center p-8 space-y-14">
      <h1 className="bg-[#206eff] text-white p-4 w-max rounded-xl text-5xl font-joining ">
        Related Transport
      </h1>
      <div className="flex flex-row md:mt-0 sssm:mt-72 gap-y-4 flex-wrap w-[85%]">
        {HotelDet.map((tour, index) => (
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
                <h3 className="text-xl text-white font-radios">{tour.name}</h3>
                <h3 className="text-xl text-white font-radios">
                  {tour.prices} pkr
                </h3>
              </div>

              <p className="mt-4 text-sm text-white font-radios">
                {tour.description}
              </p>
              <div className="flex flex-row justify-between mt-4 ">
                <h3 className="text-xs text-white font-radios">
                  <span className="text-sm font-radios">Hotel : </span>
                  {tour.hotelName}
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
    </div>
  );
};

export default RelatedHotel;
