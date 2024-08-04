import image2 from "../img/vecteezy_blue-and-white-curve-shape-background_11403724.jpg";
import image from "../image/Family Packages (25).png";
import SingleNavbar from "./SingleNavbar";
import { ToastContainer } from "react-toastify";
import Footer from "./Footer";
const ChatBot = () => {
  return (
    <>
      {" "}
      <ToastContainer />
      <div
        className="z-10 flex flex-col w-full h-full gap-y-24" /* Lower z-index for the banner */
        style={{
          backgroundImage: `url(${image2})`,
        }}
      >
        <SingleNavbar />

        <div className="relative font-sans pointer-events-none before:absolute before:w-full before:h-full before:inset-0 before:opacity-90 before:z-10">
          <img
            src={image}
            alt=".."
            className="absolute inset-0 object-cover w-full h-full "
          />

          <div className="min-h-[350px] relative z-50 h-full max-w-6xl mx-auto flex flex-col justify-center items-center text-center text-white p-6"></div>
        </div>
        <div className="flex flex-col items-center justify-center w-screen mb-10 gap-y-7">
          <h1 className="text-white bg-[#206eff] p-3 rounded-lg shadow-lg shadow-fade-black text-4xl font-joining">
            Customer Support{" "}
          </h1>{" "}
          <iframe
            width="350"
            height="430"
            allow="microphone;"
            className="shadow-lg shadow-black rounded-2xl"
            src="https://console.dialogflow.com/api-client/demo/embedded/506ef279-6ea7-4040-8d52-67c0707c6329"
          ></iframe>
          ;
        </div>
        <Footer />
      </div>
    </>
  );
};

export default ChatBot;
