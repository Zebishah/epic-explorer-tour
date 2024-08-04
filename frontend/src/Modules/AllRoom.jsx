import image from "../image/Family Packages (18).png";
import image2 from "../img/vecteezy_blue-and-white-curve-shape-background_11403724.jpg";
import Footer from "./Footer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  showFilterRoom,
  showRooms,
} from "../Redux/Slices/showAccommodationsSlice";
import { useLocation, useNavigate } from "react-router";
import SingleNavbar from "./SingleNavbar";

const AllRoom = () => {
  const [Rooms, setRooms] = useState([]);
  const [Hotel, setHotel] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { room, filterRooms } = useSelector(
    (state) => state.showAccommodations
  );
  const [selectedPrices, setSelectedPrices] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");
  const handleCheckboxChange = (event, setState, state) => {
    const { value, checked } = event.target;
    if (checked) {
      setState([...state, value]);
    } else {
      setState(state.filter((item) => item !== value));
    }
  };
  useEffect(() => {
    dispatch(showRooms(id));
  }, [dispatch]);

  useEffect(() => {
    if (room && room.rooms) {
      setRooms(room.rooms);
      setHotel(room.hotel);
      console.log(room);
    }
  }, [room]);
  useEffect(() => {
    if (filterRooms && filterRooms.rooms) {
      setRooms(filterRooms.rooms);
      console.log(filterRooms.rooms);
    }
  }, [filterRooms]);
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    dispatch(
      showFilterRoom(
        selectedCategories,
        selectedPrices,
        selectedMembers,
        selectedLocations,
        searchTerm
      )
    );
  };

  const search = () => {
    console.log(
      selectedPrices,
      selectedCategories,
      selectedMembers,
      selectedLocations
    );
    dispatch(
      showFilterRoom(
        selectedCategories,
        selectedPrices,
        selectedMembers,
        selectedLocations,
        searchTerm
      )
    );
  };
  useEffect(() => {
    if (
      selectedPrices.length === 0 &&
      selectedCategories.length === 0 &&
      selectedLocations.length === 0 &&
      selectedMembers.length === 0 &&
      searchTerm === ""
    ) {
      // Show all tours when no filters are selected
      setRooms(room.rooms);
    } else {
      // Show filtered tours when any filter is selected
      dispatch(
        showFilterRoom(
          selectedCategories,
          selectedPrices,
          selectedMembers,
          selectedLocations,
          searchTerm
        )
      );
    }
  }, [
    selectedPrices,
    selectedCategories,
    selectedMembers,
    selectedLocations,
    searchTerm,
    room,
    dispatch,
  ]);
  let bookHotel = (Lid) => {
    console.log(Lid);
    navigate(`/BookHotel?id=${encodeURIComponent(Lid)}`);
  };
  const totalPages = Math.ceil(Rooms.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentRooms = Rooms.slice(startIndex, startIndex + itemsPerPage);

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
      <div className="flex flex-col items-center justify-center w-full min-h-screen p-8 overflow-hidden bg-dark lg:flex-row gap-x-6">
        <div className="w-full mx-auto ">
          <div className="text-center bg-[#3654ff] py-4 rounded mb-8 text-white">
            <h1 className="text-2xl font-bold">List of All Rooms</h1>
          </div>

          <div className="flex flex-col gap-8 lg:flex-row">
            <div
              className="w-full lg:w-[20%] p-4 bg-white rounded-lg shadow-lg"
              style={{
                backgroundImage: `url(${image2})`,
              }}
            >
              <h3 className="mb-4 text-lg font-bold">Filters</h3>
              <div>
                <h4 className="mb-2 font-semibold ">price</h4>
                {[
                  "2000-3000",
                  "3000-4000",
                  "4000-5000",
                  "6000-7000",
                  "16000-18000",
                  "20000-30000",
                  "30000-40000",
                  "40000-50000",
                  "50000-60000",
                  "60000-70000",
                  "70000-80000",
                ].map((price) => (
                  <div key={price}>
                    <input
                      type="checkbox"
                      id={price}
                      name={price}
                      value={price}
                      className="mt-3"
                      onChange={(e) =>
                        handleCheckboxChange(
                          e,
                          setSelectedPrices,
                          selectedPrices
                        )
                      }
                    />
                    <label className="ml-2 font-radios " htmlFor={price}>
                      {price}
                    </label>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <h4 className="mb-2 font-semibold">Category</h4>
                {[
                  "Suite rooms",
                  "Couple rooms",
                  "Vip rooms",
                  "Simple rooms",
                  "Heavy rooms",
                ].map((category) => (
                  <div key={category}>
                    <input
                      type="checkbox"
                      id={category}
                      name={category}
                      value={category}
                      className="mt-3"
                      onChange={(e) =>
                        handleCheckboxChange(
                          e,
                          setSelectedCategories,
                          selectedCategories
                        )
                      }
                    />
                    <label className="ml-2 font-radios" htmlFor={category}>
                      {category}
                    </label>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <h4 className="mb-2 font-semibold">Members Limit</h4>
                {["2", "3", "4", "5", "7", "8", "9"].map((Members) => (
                  <div key={Members}>
                    <input
                      type="checkbox"
                      id={Members}
                      name={Members}
                      value={Members}
                      className="mt-3"
                      onChange={(e) =>
                        handleCheckboxChange(
                          e,
                          setSelectedMembers,
                          selectedMembers
                        )
                      }
                    />
                    <label className="ml-2 font-radios" htmlFor={Members}>
                      {Members} members
                    </label>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <h4 className="mb-2 font-semibold">Room Location</h4>
                {[
                  "BeachFront",
                  "balconyfront",
                  "TopFloor",
                  "LowFloor",
                  "Vip Location",
                  "Entry Location",
                ].map((location) => (
                  <div key={location}>
                    <input
                      type="checkbox"
                      id={location}
                      name={location}
                      value={location}
                      className="mt-3"
                      onChange={(e) =>
                        handleCheckboxChange(
                          e,
                          setSelectedLocations,
                          selectedLocations
                        )
                      }
                    />
                    <label className="ml-2 font-radios" htmlFor={location}>
                      {location}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col w-full gap-y-3 lg:w-3/4">
              <div className="text-center bg-[#3654ff] py-4 rounded mb-8 text-white">
                <h1 className="text-2xl font-radios">Search for any Room</h1>
              </div>
              <div className="flex items-center justify-center mb-6 gap-x-1">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={handleSearch}
                  className="w-[50%] px-4 py-4 rounded-2xl shadow-lg shadow-black"
                  placeholder="Search for Room..."
                />
                <button
                  className="bg-[#3654ff] text-white px-6 py-4 shadow-lg shadow-fade-black rounded-xl transition-all duration-300 ease-in-out hover:bg-white hover:text-blue-600"
                  onClick={search}
                >
                  Search
                </button>
              </div>

              <div className="flex flex-wrap justify-center gap-8">
                {currentRooms.length > 0 &&
                  currentRooms.map((tour, index) => (
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
                            <span className="text-sm font-radios">
                              Hotel :{" "}
                            </span>
                            {Hotel}
                          </h3>
                        </div>
                        <div className="flex justify-center mt-6">
                          <button
                            type="button"
                            onClick={() => bookHotel(tour._id)}
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
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AllRoom;
