import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCar } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { showRoomDetail } from "../Redux/Slices/ShowTourDetailsSlice";
import { useDispatch, useSelector } from "react-redux";
const TransportService = (id) => {
  const dispatch = useDispatch();
  const [Hotel, setHotel] = useState([]);
  const [activities, setActivities] = useState([]);
  const [priceInclude, setPriceInclude] = useState([]);
  const [priceExclude, setPriceExclude] = useState([]);
  const [CompleteInfo, setCompleteInfo] = useState([{}]);
  const [ServicesDet, setServicesDet] = useState({});
  const { roomDetail } = useSelector((state) => state.TourDetail);

  useEffect(() => {
    if (id) {
      dispatch(showRoomDetail(id));
    }
  }, [dispatch]);
  useEffect(() => {
    if (roomDetail) {
      setHotel(roomDetail?.room?.features || {});
      setServicesDet(roomDetail?.roomServiceIt || {});
      setActivities(roomDetail?.roomServiceIt?.services || []);
      setPriceInclude(roomDetail?.roomServiceIt?.priceIncludes || []);
      setPriceExclude(roomDetail?.roomServiceIt?.priceExcludes || []);
      setCompleteInfo(roomDetail?.roomServiceIt?.completeInfo || [{}]);
      console.log(roomDetail.roomServiceIt);
    }
  }, [roomDetail]);

  return (
    <div className="flex flex-col items-center justify-center p-8 overflow-x-hidden bg-dark">
      <div className="flex flex-col items-center justify-center m-auto ml-0 ">
        <div className="text-center bg-[#206eff] p-4 rounded mb-8">
          <h1 className="text-2xl font-bold text-white text-w">
            Services and Itineraries of Room
          </h1>
        </div>

        <div className="flex flex-col items-start justify-center w-screen p-8 -ml-8 lg:flex-row ">
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
                  Transport Info:
                </h2>
                <ul className="text-white list-disc list-inside font-radios">
                  {Hotel.length > 0 &&
                    Hotel.map((item, index) => <li key={index}>{item}</li>)}
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
                CompleteInfo:
              </h2>
              <div className="text-white">
                {CompleteInfo.length > 0 &&
                  CompleteInfo.map((dayS, index) => (
                    <div key={index}>
                      <h3 className="font-bold font-radios mb-2 bg-white text-[#206eff] w-max p-2 rounded-lg ">
                        Attribute: {dayS.attribute}
                      </h3>

                      {Array.isArray(dayS.detail) ? (
                        dayS.detail.map((service, idx) => (
                          <p key={idx} className="bg-white text-[#206eff] mb-4">
                            Detail: {service}
                          </p>
                        ))
                      ) : (
                        <p className="mb-4">
                          {" "}
                          <b>Detail:</b> {dayS.detail}
                        </p>
                      )}
                    </div>
                  ))}
              </div>
            </div>
          </div>

          {/* Enquiry and Weather Section */}
          <div className="flex flex-col justify-start gap-y-6 w-full md:w-[80%] lg:w-[40%] p-4">
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
                Wanna Book More Transport?
              </h2>
              <FontAwesomeIcon
                icon={faCar}
                className="text-4xl text-white"
              ></FontAwesomeIcon>
              <div className="text-center">
                <p className="text-2xl text-white font-radios">
                  Contact Us For Details
                </p>
                <p className="text-white font-radios">
                  There are Many Special Offers Waiting For you
                </p>
                <p className="text-white font-radios">
                  Visit Our Website For Booking
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransportService;
