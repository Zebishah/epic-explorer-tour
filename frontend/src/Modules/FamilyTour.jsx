import Navbar from "./Navbar";
import image from "../images/harrison-fitts-zE2VGbJSYns-unsplash.jpg";
import image1 from "../images/harrison-fitts-zE2VGbJSYns-unsplash.jpg";
import backgroundImage from "../images/harrison-fitts-zE2VGbJSYns-unsplash.jpg";
import Footer from "./Footer";
const FamilyTour = () => {
  return (
    <div className="overflow-hidden">
      <Navbar />

      <div className="w-full bg-light-black ">
        <div className="relative w-full smd:mt-[8rem] h-[35vh] ">
          <img
            src={image}
            alt="image"
            className="object-cover w-full h-full bg-center bg-no-repeat"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <h2 className="p-4 text-6xl font-bold text-white rounded font-radios">
              Family Tours
            </h2>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center w-full h-auto p-8 overflow-hidden bg-dark lg:flex-row gap-x-6">
          <div className="container mx-auto w-[50vw]">
            <div className="py-4 mb-8 text-center rounded bg-yellows">
              <h1 className="text-2xl font-bold">List of All Family Tours</h1>
            </div>

            <div className="flex flex-wrap justify-center gap-8">
              <div className="bg-fade-black shadow-[0_2px_18px_-6px_rgba(0,0,0,0.2)] w-full max-w-sm rounded-lg overflow-hidden font-[sans-serif]">
                <img src={image1} className="w-full" alt="Car" />
                <div className="px-4 py-6 border-2 border-t-0 border-yellows">
                  <div className="flex flex-row justify-between">
                    <h3 className="text-xl text-yellows font-radios">
                      Heading
                    </h3>
                    <h3 className="text-xl text-yellows font-radios">
                      10,000 PKR
                    </h3>
                  </div>
                  <p className="mt-4 text-sm text-white font-radios">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    auctor auctor arcu, at fermentum dui. Maecenas Lorem ipsum
                    dolor sit amet, consectetur adipiscing elit. Sed auctor
                    auctor arcu, at fermentum dui. Maecenas.
                  </p>
                  <div className="flex justify-center mt-6">
                    <button
                      type="button"
                      className="px-6 py-2.5 rounded text-sm tracking-wider font-radios border-none outline-none bg-yellows text-black"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-fade-black shadow-[0_2px_18px_-6px_rgba(0,0,0,0.2)] w-full max-w-sm rounded-lg overflow-hidden font-[sans-serif]">
                <img src={image1} className="w-full" alt="Car" />
                <div className="px-4 py-6 border-2 border-t-0 border-yellows">
                  <div className="flex flex-row justify-between">
                    <h3 className="text-xl text-yellows font-radios">
                      Heading
                    </h3>
                    <h3 className="text-xl text-yellows font-radios">
                      10,000 PKR
                    </h3>
                  </div>
                  <p className="mt-4 text-sm text-white font-radios">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    auctor auctor arcu, at fermentum dui. Maecenas Lorem ipsum
                    dolor sit amet, consectetur adipiscing elit. Sed auctor
                    auctor arcu, at fermentum dui. Maecenas.
                  </p>
                  <div className="flex justify-center mt-6">
                    <button
                      type="button"
                      className="px-6 py-2.5 rounded text-sm tracking-wider font-radios border-none outline-none bg-yellows text-black"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-fade-black shadow-[0_2px_18px_-6px_rgba(0,0,0,0.2)] w-full max-w-sm rounded-lg overflow-hidden font-[sans-serif]">
                <img src={image1} className="w-full" alt="Car" />
                <div className="px-4 py-6 border-2 border-t-0 border-yellows">
                  <div className="flex flex-row justify-between">
                    <h3 className="text-xl text-yellows font-radios">
                      Heading
                    </h3>
                    <h3 className="text-xl text-yellows font-radios">
                      10,000 PKR
                    </h3>
                  </div>
                  <p className="mt-4 text-sm text-white font-radios">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    auctor auctor arcu, at fermentum dui. Maecenas Lorem ipsum
                    dolor sit amet, consectetur adipiscing elit. Sed auctor
                    auctor arcu, at fermentum dui. Maecenas.
                  </p>
                  <div className="flex justify-center mt-6">
                    <button
                      type="button"
                      className="px-6 py-2.5 rounded text-sm tracking-wider font-radios border-none outline-none bg-yellows text-black"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-fade-black shadow-[0_2px_18px_-6px_rgba(0,0,0,0.2)] w-full max-w-sm rounded-lg overflow-hidden font-[sans-serif]">
                <img src={image1} className="w-full" alt="Car" />
                <div className="px-4 py-6 border-2 border-t-0 border-yellows">
                  <div className="flex flex-row justify-between">
                    <h3 className="text-xl text-yellows font-radios">
                      Heading
                    </h3>
                    <h3 className="text-xl text-yellows font-radios">
                      10,000 PKR
                    </h3>
                  </div>
                  <p className="mt-4 text-sm text-white font-radios">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    auctor auctor arcu, at fermentum dui. Maecenas Lorem ipsum
                    dolor sit amet, consectetur adipiscing elit. Sed auctor
                    auctor arcu, at fermentum dui. Maecenas.
                  </p>
                  <div className="flex justify-center mt-6">
                    <button
                      type="button"
                      className="px-6 py-2.5 rounded text-sm tracking-wider font-radios border-none outline-none bg-yellows text-black"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-fade-black shadow-[0_2px_18px_-6px_rgba(0,0,0,0.2)] w-full max-w-sm rounded-lg overflow-hidden font-[sans-serif]">
                <img src={image1} className="w-full" alt="Car" />
                <div className="px-4 py-6 border-2 border-t-0 border-yellows">
                  <div className="flex flex-row justify-between">
                    <h3 className="text-xl text-yellows font-radios">
                      Heading
                    </h3>
                    <h3 className="text-xl text-yellows font-radios">
                      10,000 PKR
                    </h3>
                  </div>
                  <p className="mt-4 text-sm text-white font-radios">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    auctor auctor arcu, at fermentum dui. Maecenas Lorem ipsum
                    dolor sit amet, consectetur adipiscing elit. Sed auctor
                    auctor arcu, at fermentum dui. Maecenas.
                  </p>
                  <div className="flex justify-center mt-6">
                    <button
                      type="button"
                      className="px-6 py-2.5 rounded text-sm tracking-wider font-radios border-none outline-none bg-yellows text-black"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-fade-black shadow-[0_2px_18px_-6px_rgba(0,0,0,0.2)] w-full max-w-sm rounded-lg overflow-hidden font-[sans-serif]">
                <img src={image1} className="w-full" alt="Car" />
                <div className="px-4 py-6 border-2 border-t-0 border-yellows">
                  <div className="flex flex-row justify-between">
                    <h3 className="text-xl text-yellows font-radios">
                      Heading
                    </h3>
                    <h3 className="text-xl text-yellows font-radios">
                      10,000 PKR
                    </h3>
                  </div>
                  <p className="mt-4 text-sm text-white font-radios">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    auctor auctor arcu, at fermentum dui. Maecenas Lorem ipsum
                    dolor sit amet, consectetur adipiscing elit. Sed auctor
                    auctor arcu, at fermentum dui. Maecenas.
                  </p>
                  <div className="flex justify-center mt-6">
                    <button
                      type="button"
                      className="px-6 py-2.5 rounded text-sm tracking-wider font-radios border-none outline-none bg-yellows text-black"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
              <div className="bg-fade-black shadow-[0_2px_18px_-6px_rgba(0,0,0,0.2)] w-full max-w-sm rounded-lg overflow-hidden font-[sans-serif]">
                <img src={image1} className="w-full" alt="Car" />
                <div className="px-4 py-6 border-2 border-t-0 border-yellows">
                  <div className="flex flex-row justify-between">
                    <h3 className="text-xl text-yellows font-radios">
                      Heading
                    </h3>
                    <h3 className="text-xl text-yellows font-radios">
                      10,000 PKR
                    </h3>
                  </div>
                  <p className="mt-4 text-sm text-white font-radios">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    auctor auctor arcu, at fermentum dui. Maecenas Lorem ipsum
                    dolor sit amet, consectetur adipiscing elit. Sed auctor
                    auctor arcu, at fermentum dui. Maecenas.
                  </p>
                  <div className="flex justify-center mt-6">
                    <button
                      type="button"
                      className="px-6 py-2.5 rounded text-sm tracking-wider font-radios border-none outline-none bg-yellows text-black"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
              <div className="bg-fade-black shadow-[0_2px_18px_-6px_rgba(0,0,0,0.2)] w-full max-w-sm rounded-lg overflow-hidden font-[sans-serif]">
                <img src={image1} className="w-full" alt="Car" />
                <div className="px-4 py-6 border-2 border-t-0 border-yellows">
                  <div className="flex flex-row justify-between">
                    <h3 className="text-xl text-yellows font-radios">
                      Heading
                    </h3>
                    <h3 className="text-xl text-yellows font-radios">
                      10,000 PKR
                    </h3>
                  </div>
                  <p className="mt-4 text-sm text-white font-radios">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    auctor auctor arcu, at fermentum dui. Maecenas Lorem ipsum
                    dolor sit amet, consectetur adipiscing elit. Sed auctor
                    auctor arcu, at fermentum dui. Maecenas.
                  </p>
                  <div className="flex justify-center mt-6">
                    <button
                      type="button"
                      className="px-6 py-2.5 rounded text-sm tracking-wider font-radios border-none outline-none bg-yellows text-black"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
              <div className="bg-fade-black shadow-[0_2px_18px_-6px_rgba(0,0,0,0.2)] w-full max-w-sm rounded-lg overflow-hidden font-[sans-serif]">
                <img src={image1} className="w-full" alt="Car" />
                <div className="px-4 py-6 border-2 border-t-0 border-yellows">
                  <div className="flex flex-row justify-between">
                    <h3 className="text-xl text-yellows font-radios">
                      Heading
                    </h3>
                    <h3 className="text-xl text-yellows font-radios">
                      10,000 PKR
                    </h3>
                  </div>
                  <p className="mt-4 text-sm text-white font-radios">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    auctor auctor arcu, at fermentum dui. Maecenas Lorem ipsum
                    dolor sit amet, consectetur adipiscing elit. Sed auctor
                    auctor arcu, at fermentum dui. Maecenas.
                  </p>
                  <div className="flex justify-center mt-6">
                    <button
                      type="button"
                      className="px-6 py-2.5 rounded text-sm tracking-wider font-radios border-none outline-none bg-yellows text-black"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className=" hidden smd:flex flex-col justify-center items-center gap-y-6 w-[40vw] xl:w-[20vw] p-4">
            <div className="flex flex-col items-center justify-center flex-1 p-6 border-2 rounded-lg shadow-lg bg-fade-black border-yellows">
              <h2 className="mb-4 text-lg font-bold text-yellows font-radios">
                For Enquiry
              </h2>
              <p className="text-center text-white font-radios">
                Call us on +92-51-5739027 for individual, tailored advice for
                your perfect stay or send us a message with your hotel booking
                query.
              </p>
              <p className="mt-4 text-yellows font-radios">
                Email: zebhaider123@gmail.com
              </p>
            </div>

            <div className="flex flex-col items-center justify-center flex-1 p-6 border-2 rounded-lg shadow-lg bg-fade-black border-yellows">
              <h2 className="mb-4 text-lg font-bold text-yellows font-radios">
                For Enquiry
              </h2>
              <p className="text-center text-white font-radios">
                Call us on +92-51-5739027 for individual, tailored advice for
                your perfect stay or send us a message with your hotel booking
                query.
              </p>
              <p className="mt-4 text-yellows font-radios">
                Email: zebhaider123@gmail.com
              </p>
            </div>
            <div className="bg-fade-black p-6 rounded-lg flex flex-col justify-center items-center gap-y-4 flex-1 shadow-lg border-2 border-yellows sssm:w-[100%] lg:w-[100%]">
              <h2 className="mb-4 text-lg font-bold text-yellows font-radios">
                Related Blogs
              </h2>
              <div className="flex flex-col items-center justify-center gap-y-4">
                <div className="relative h-[30vh] w-full">
                  <img
                    src={backgroundImage}
                    alt="Skardu Blog"
                    className="object-cover h-[70%] w-full rounded-lg"
                  />
                  <button className="w-full py-2 mt-2 font-bold text-black rounded bg-yellows">
                    Skardu Blogs
                  </button>
                </div>
                <div className="relative h-[30vh] w-full">
                  <img
                    src={backgroundImage}
                    alt="Balochistan Blog"
                    className="object-cover h-[70%] w-full rounded-lg"
                  />
                  <button className="w-full py-2 mt-2 font-bold text-black rounded bg-yellows">
                    Balochistan Blogs
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default FamilyTour;
