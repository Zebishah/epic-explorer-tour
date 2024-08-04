import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import backgroundImage from "../images/marc-zimmer-a5QnUtau8lo-unsplash.jpg";
import { faSun } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import {
  showRelatedBlogs,
  showTourDetail,
} from "../Redux/Slices/ShowTourDetailsSlice";
import { useDispatch, useSelector } from "react-redux";
const TourService = (id) => {
  const dispatch = useDispatch();
  const [tourDet, setTourDet] = useState({});
  const [TourBlog, setTourBlog] = useState([]);
  const [activities, setActivities] = useState([]);
  const [priceInclude, setPriceInclude] = useState([]);
  const [priceExclude, setPriceExclude] = useState([]);
  const [daysServices, setDaysServices] = useState([]);
  const [ServicesDet, setServicesDet] = useState({});
  const { tourDetail, RelatedBlogs } = useSelector((state) => state.TourDetail);

  useEffect(() => {
    if (id) {
      dispatch(showTourDetail(id));
      dispatch(showRelatedBlogs(id));
    }
  }, []);
  useEffect(() => {
    if (tourDetail) {
      setTourDet(tourDetail?.tour || {});
      setServicesDet(tourDetail?.tourServiceIt || {});
      setActivities(tourDetail?.tourServiceIt?.activities || []);
      setPriceInclude(tourDetail?.tourServiceIt?.priceIncludes || []);
      setPriceExclude(tourDetail?.tourServiceIt?.priceExcludes || []);
      setDaysServices(tourDetail?.tourServiceIt?.daysServices || []);
    }
  }, [tourDetail]);

  useEffect(() => {
    if (RelatedBlogs && RelatedBlogs.blogs) {
      setTourBlog(RelatedBlogs.blogs.slice(0, 2));
    }
  }, [RelatedBlogs]);
  return (
    <div className="flex flex-col items-center justify-center p-8 overflow-x-hidden bg-dark">
      <div className="flex flex-col items-center justify-center m-auto ml-0 ">
        <div className="text-center bg-[#206eff] p-4 rounded mb-8">
          <h1 className="text-2xl font-bold text-white font-radios">
            Services and Itineraries of Trip
          </h1>
        </div>

        <div className="flex flex-col items-center justify-center w-screen p-8 -ml-8 lg:flex-row ">
          <div className="flex flex-col items-center justify-start w-full gap-y-6">
            {/* Services Section */}
            <div className="flex flex-col items-center justify-center w-full gap-6 ssm:flex-row">
              <div className="bg-[#2571ff] p-6 rounded-lg flex-1 shadow-lg border-2 border-[#3a7fff]">
                <h2 className="text-[#206eff] bg-white p-3 text-lg font-radios w-max rounded-xl font-bold mb-4">
                  Activities
                </h2>
                {activities && activities.length > 0 && (
                  <ul className="text-white list-disc list-inside font-radios">
                    {activities.map((activity, index) => (
                      <li key={index}>{activity}</li>
                    ))}
                  </ul>
                )}
                <div className="mt-4">
                  <h3 className="text-[#206eff] bg-white p-3 text-lg font-radios w-max rounded-xl font-bold mb-4">
                    Price Includes:
                  </h3>
                  <ul className="text-white list-disc list-inside font-radios">
                    {priceInclude.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="bg-[#206eff] p-6 rounded-lg flex-1 shadow-lg border-2 border-[#206eff]">
                <h2 className="text-[#206eff] bg-white p-3 text-lg font-radios w-max rounded-xl font-bold mb-4">
                  Tour Info:
                </h2>
                <ul className="text-white list-disc list-inside font-radios">
                  <li>Tour is {tourDet.name}</li>
                  <li>{tourDet.departureTime} is the Departure Time</li>
                  <li>
                    Departure & Return: {tourDet.Departure_ReturnLocation}
                  </li>
                  <li>Availability upto: {tourDet.endDate} </li>
                  <li>
                    Members Limit: Members Limit is {tourDet.membersLimit}{" "}
                    Members
                  </li>
                </ul>
                <div className="mt-4">
                  <h3 className="text-[#206eff] bg-white p-3 text-lg font-radios w-max rounded-xl font-bold mb-4">
                    Price Excludes:
                  </h3>
                  <ul className="text-white list-disc list-inside font-radios">
                    {priceExclude.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            {/* Itinerary Section */}
            <div className="bg-[#206eff] p-6 rounded-lg w-full flex-1 shadow-lg border-2 border-[#206eff]">
              <h2 className="text-[#206eff] bg-white p-3 text-lg font-radios w-max rounded-xl font-bold mb-4">
                Itinerary:
              </h2>
              <div className="text-white">
                {daysServices.length > 0 &&
                  daysServices.map((dayS, index) => (
                    <div key={index}>
                      <h3 className="mb-2 font-bold font-radios">{dayS.day}</h3>
                      <ul className="list-disc list-inside font-radios">
                        {dayS.services.map((service, idx) => (
                          <li key={idx}>{service}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          {/* Enquiry and Weather Section */}
          <div className="flex flex-col gap-y-6 w-full md:w-[80%] lg:w-[40%] p-4">
            <div className="bg-[#206eff] p-6 rounded-lg flex flex-col justify-center items-center flex-1 shadow-lg border-2 border-[#206eff]">
              <h2 className="text-[#206eff] bg-white p-3 text-lg font-radios w-max rounded-xl font-bold mb-4">
                For Enquiry
              </h2>
              <p className="text-center text-white font-radios">
                Call us on +92-51-5739027 for individual, tailored advice for
                your perfect stay or send us a message with your hotel booking
                query.
              </p>
              <p className="mt-4 text-white font-radios">
                Email: zebhaider123@gmail.com
              </p>
            </div>

            <div className="bg-[#206eff] p-6 rounded-lg flex flex-col space-y-4 justify-center items-center flex-1 shadow-lg border-2 border-[#206eff]">
              <h2 className="text-[#206eff] bg-white p-3 text-lg font-radios w-max rounded-xl font-bold mb-4">
                Weather updates for Skardu
              </h2>
              <FontAwesomeIcon
                icon={faSun}
                className="text-4xl text-white"
              ></FontAwesomeIcon>
              <div className="text-center">
                <p className="text-2xl text-white font-radios">Sunny Day</p>
                <p className="text-white font-radios">30% temp | 30% percep</p>
                <p className="text-white font-radios">
                  Its a sunny and hot day in Skardu
                </p>
              </div>
            </div>

            <div className="bg-[#206eff] p-6 rounded-lg flex flex-col justify-center items-center gap-y-4 flex-1 shadow-lg border-2 border-[#206eff]">
              <h2 className="text-[#206eff] bg-white p-3 text-lg font-radios w-max rounded-xl font-bold mb-4">
                Related Blogs
              </h2>
              <div className="flex flex-col items-center justify-center gap-y-4">
                {TourBlog.map((blog, index) => (
                  <div className="relative h-[30vh] w-full" key={index}>
                    <img
                      src={backgroundImage}
                      alt="Skardu Blog"
                      className="object-cover h-[70%] w-full rounded-lg"
                    />
                    <button className="bg-white text-[#206eff] font-radios text-lg py-2 rounded w-full mt-2 hover:bg-[#0e1f3f] hover:text-white transition-all duration-300 ease-in-out">
                      {blog.name} Blog
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourService;
