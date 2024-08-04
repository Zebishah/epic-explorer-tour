import image1 from "../images/dino-reichmuth-A5rCN8626Ck-unsplash.jpg";
import ContactForm from "./ContactForm";
import EpicIntro from "./EpicIntro";
import Footer from "./Footer";
import LatestTours from "./LatestTours";
import OtherBookings from "./OtherBookings";
import Reviews from "./Reviews";
import TourPackages from "./TourPackages";
import WhyEpicExplorer from "./WhyEpicExplorer";
import image2 from "../img/vecteezy_blue-and-white-curve-shape-background_11403724.jpg";
import { useNavigate } from "react-router";
const LandingPage = () => {
  const navigate = useNavigate();
  const BookTour = (e) => {
    e.preventDefault();
    navigate("/AllTours");
  };
  const CustomizeTour = () => {
    navigate("/CustomizeTours");
  };

  return (
    <div
      className="flex flex-col w-screen bg-white bg-center gap-y-24 lg:gap-y-10 "
      style={{
        backgroundImage: `url(${image2})`,
      }}
    >
      <div
        className="flex flex-col items-center justify-center w-full h-screen text-white bg-center bg-no-repeat bg-cover"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${image1})`,
        }}
      >
        <header className="p-2 text-center hero">
          <div className="hero-content">
            <h1 className="mb-4 text-4xl font-bold text-white hero-title md:text-5xl lg:text-6xl">
              WELCOME TO EPIC EXPLORER
            </h1>
            <p className="mb-6 text-lg hero-text md:text-xl lg:text-2xl">
              Lets create travel memories together
            </p>
            <div className="flex flex-row items-center justify-center hero-buttons gap-x-6">
              <button
                type="submit"
                onClick={BookTour}
                className=" mt-4 w-[40%] smd:w-[20%] hover:before:bg-red rounded-xl relative h-[50px] overflow-hidden border border-[#3654ff] bg-[#00000065] px-3 text-white shadow-lg transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-[#3654ff] before:transition-all before:duration-500 hover:text-white hover:shadow-fade-black hover:before:left-0 hover:before:w-full"
              >
                <span className="relative z-10 text-lg text-radios">
                  Book Tour
                </span>
              </button>
              <button
                type="button"
                onClick={CustomizeTour}
                className=" mt-4 w-[40%] smd:w-[20%] hover:before:bg-red rounded-xl relative h-[50px] overflow-hidden border border-[#3654ff] bg-[#00000065] px-3 text-white shadow-lg transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-[#3654ff] before:transition-all before:duration-500 hover:text-white hover:shadow-fade-black hover:before:left-0 hover:before:w-full"
              >
                <span className="relative z-10 text-lg text-radios">
                  Customize Tours
                </span>
              </button>
            </div>
          </div>
        </header>
      </div>

      <EpicIntro />
      <WhyEpicExplorer />
      <TourPackages />
      <LatestTours />
      <OtherBookings />
      <Reviews />
      <ContactForm />
      <Footer />
    </div>
  );
};

export default LandingPage;
