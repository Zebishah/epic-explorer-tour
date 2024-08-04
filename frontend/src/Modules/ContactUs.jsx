import image2 from "../img/vecteezy_abstract-wave-blue-background_9871929.jpg";
import image from "../image/Family Packages (29).png";
import ContactForm from "./ContactForm";
import Footer from "./Footer";
import SingleNavbar from "./SingleNavbar";
import { ToastContainer } from "react-toastify";
const ContactUs = () => {
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
        <ContactForm />

        <Footer />
      </div>
    </>
  );
};

export default ContactUs;
