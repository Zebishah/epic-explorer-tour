import io from "socket.io-client";
import { useEffect, useState } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import SideBar from "./SideBar";
import image1 from "../images/vecteezy_blue-trendy-background-design-template-for-banner-poster_.jpg";
import { useDispatch, useSelector } from "react-redux";
import { userNotifications } from "../Redux/Slices/userInfoSlice";

// Ensure this matches your server's address and port

const Notifications = () => {
  const [notification, setNotifications] = useState([]);

  const dispatch = useDispatch();
  const { notifications } = useSelector((state) => state.userInfoSearch);
  useEffect(() => {
    dispatch(userNotifications());
    const socket = io("http://localhost:5000");
    console.log("Attempting to connect to server...");

    socket.on("connect", () => {
      console.log("Connected to server");
    });

    socket.on("notification", (data) => {
      console.log("Notification received:", data);
      setNotifications((prev) => [...prev, data]);
    });

    socket.on("connect_error", (error) => {
      console.error("Connection error:", error);
    });

    socket.on("error", (error) => {
      console.error("Socket error:", error);
    });

    return () => {
      socket.disconnect();
      console.log("Disconnected from server");
    };
  }, [dispatch]);
  useEffect(() => {
    if (notifications) {
      setNotifications(notifications.userNotifications || []);
    }
  }, [notifications]);

  return (
    <div
      className="flex flex-col min-h-screen "
      style={{ backgroundImage: `url(${image1})` }}
    >
      <Navbar />
      <div className="flex flex-row w-full h-full mt-20 overflow-hidden bg-opacity-0 gap-x-6 bg-light-black smd:mt-40">
        <SideBar />
        <div className="flex flex-col gap-y-10 p-6 items-center w-[80%] ">
          <h1 className="p-4 text-lg text-white bg-blue-600 rounded-lg lg:text-4xl font-joining bg-opacity-60">
            User Notifications
          </h1>

          <div className="flex flex-col gap-y-2 flex-grow flex-wrap items-center min-h-screen smd:w-[85%] w-[90%]">
            {notification.length > 0 &&
              notification.map((Notification, index) => (
                <div
                  key={index}
                  className="relative flex items-center w-full p-4 mx-auto bg-white rounded-lg shadow-xl"
                >
                  <span className="absolute top-0 right-0 px-2 mt-2 mr-2 text-xs font-bold text-green-900 uppercase bg-green-400 border rounded-full">
                    New
                  </span>
                  <span className="absolute bottom-0 right-0 py-1 m-1 mr-3 text-xs font-bold text-gray-500 uppercase font-radios">
                    {new Date(Notification.date).toLocaleString()}
                  </span>
                  <img
                    className="w-12 h-12 rounded-full"
                    alt="John Doe's avatar"
                    src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&faces=1&faceindex=1&facepad=2.5&w=500&h=500&q=80"
                  />
                  <div className="ml-5">
                    <h4 className="text-lg leading-tight text-gray-900 font-radios">
                      {Notification.title}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {Notification.message}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Notifications;
