const FooterExample = () => {
  return (
    <footer className="w-full shadow-lg bg-light-black">
      <div className=" flex flex-wrap w-[80%] px-4 py-16 mx-auto sm:px-6 lg:px-8">
        <div className="flex flex-row items-center justify-center gap-x-10">
          <div className="border-2 border-purple-500 w-min h-min">
            <img src={logo} className="w-40 h-44 -mt-14" alt="logo" />
            <div className="-mt-10">
              <p className="max-w-xs text-sm text-white font-radios">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Voluptas, accusantium.
              </p>
              <div className="flex flex-col mt-4 gap-y-4">
                <div className="flex flex-row gap-x-4 ">
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    className="text-lg text-yellows"
                  ></FontAwesomeIcon>
                  <p className="text-sm text-white font-radios">
                    zebihaider123@gmail.com
                  </p>
                </div>
                <div className="flex flex-row gap-x-4 ">
                  <FontAwesomeIcon
                    icon={faPhone}
                    className="text-lg text-yellows"
                  ></FontAwesomeIcon>
                  <p className="text-sm text-white font-radios">
                    +92-3105904269{" "}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex mt-8 space-x-4 border-2 border-orange-500 w-min h-min">
              <FontAwesomeIcon
                className="w-6 h-6 smd:text-sm text-[10px] p-2 rounded-full text-yellows hover:bg-yellows hover:text-black transition-all duration-200 ease-in-out hover:shadow-lg hover:shadow-yellows cursor-pointer  "
                icon={faFacebook}
              ></FontAwesomeIcon>
              <FontAwesomeIcon
                className="w-6 h-6 smd:text-sm text-[10px] p-2 rounded-full text-yellows hover:bg-yellows hover:text-black transition-all duration-200 ease-in-out hover:shadow-lg hover:shadow-yellows cursor-pointer "
                icon={faInstagram}
              ></FontAwesomeIcon>
              <FontAwesomeIcon
                className="w-6 h-6 smd:text-sm text-[10px] p-2 rounded-full text-yellows hover:bg-yellows hover:text-black transition-all duration-200 ease-in-out hover:shadow-lg hover:shadow-yellows cursor-pointer "
                icon={faGithub}
              ></FontAwesomeIcon>
              <FontAwesomeIcon
                className="w-6 h-6 smd:text-sm text-[10px] p-2 rounded-full text-yellows hover:bg-yellows hover:text-black transition-all duration-200 ease-in-out hover:shadow-lg hover:shadow-yellows cursor-pointer "
                icon={faGlobe}
              ></FontAwesomeIcon>
              <FontAwesomeIcon
                className="w-6 h-6 smd:text-sm text-[10px] p-2 rounded-full text-yellows hover:bg-yellows hover:text-black transition-all duration-200 ease-in-out hover:shadow-lg hover:shadow-yellows cursor-pointer "
                icon={faYoutube}
              ></FontAwesomeIcon>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-10 lg:col-span-2 sm:grid-cols-2 lg:grid-cols-4">
            <div className="border-2 border-purple-500">
              <p className="font-medium text-yellows font-radios">
                Important Links
              </p>
              <nav className="flex flex-col mt-4 space-y-4 text-sm ">
                <a className="text-white hover:opacity-75 font-radios" href>
                  {" "}
                  Home Page{" "}
                </a>
                <a className="text-white hover:opacity-75 font-radios" href>
                  {" "}
                  About{" "}
                </a>
                <a className="text-white hover:opacity-75 font-radios" href>
                  {" "}
                  Blogs{" "}
                </a>
                <a className="text-white hover:opacity-75 font-radios" href>
                  {" "}
                  Contact-Us{" "}
                </a>
                <a className="text-white hover:opacity-75 font-radios" href>
                  {" "}
                  Reviews{" "}
                </a>
                <a className="text-white hover:opacity-75 font-radios" href>
                  {" "}
                  FAQS{" "}
                </a>
              </nav>
            </div>
            <div className="border-2 border-purple-500">
              <p className="font-medium text-yellows font-radios">Services</p>
              <nav className="flex flex-col mt-4 space-y-4 text-sm text-gray-500">
                <a className="text-white hover:opacity-75 font-radios" href>
                  {" "}
                  Tour Booking{" "}
                </a>
                <a className="text-white hover:opacity-75 font-radios" href>
                  {" "}
                  Hotel Booking{" "}
                </a>
                <a className="text-white hover:opacity-75 font-radios" href>
                  {" "}
                  Room Booking{" "}
                </a>
                <a className="text-white hover:opacity-75 font-radios" href>
                  {" "}
                  Transport Booking{" "}
                </a>
                <a className="text-white hover:opacity-75 font-radios" href>
                  {" "}
                  View Bookings{" "}
                </a>
                <a className="text-white hover:opacity-75 font-radios" href>
                  {" "}
                  View Payment{" "}
                </a>
              </nav>
            </div>
            <div className="border-2 border-purple-500">
              <p className="font-medium text-yellows font-radios">
                Helpful Links
              </p>
              <nav className="flex flex-col mt-4 space-y-4 text-sm text-gray-500">
                <a className="text-white hover:opacity-75 font-radios" href>
                  {" "}
                  Tour Packages{" "}
                </a>
                <a className="text-white hover:opacity-75 font-radios" href>
                  {" "}
                  Hotel packages{" "}
                </a>
                <a className="text-white hover:opacity-75 font-radios" href>
                  {" "}
                  Transport Packages{" "}
                </a>
                <a className="text-white hover:opacity-75 font-radios" href>
                  {" "}
                  Family Packages{" "}
                </a>
                <a className="text-white hover:opacity-75 font-radios" href>
                  {" "}
                  Personal Packages{" "}
                </a>
                <a className="text-white hover:opacity-75 font-radios" href>
                  {" "}
                  HoneyMoon Packages{" "}
                </a>
              </nav>
            </div>
            <div className="smd:w-[19vw] border-2 border-purple-500">
              <p className="font-medium text-yellows font-radios">
                Follow us on
              </p>
              <nav className="flex flex-col w-full mt-4 space-y-10 text-sm">
                <p className="text-sm text-white font-radios">
                  Epic Explorer is an innovative tour and travel website
                  designed to offer seamless travel experiences.
                </p>
                <div className="flex flex-row">
                  <input
                    type="text"
                    className="w-40 p-3 placeholder:text-white"
                    placeholder="Type here....."
                  />
                  <button className="p-3 text-black bg-yellows">Submit</button>
                </div>
                <div className="flex flex-row gap-x-4">
                  <FontAwesomeIcon
                    className="w-6 h-6 smd:text-sm text-[10px] p-2 rounded-full text-yellows hover:bg-yellows hover:text-black transition-all duration-200 ease-in-out hover:shadow-lg hover:shadow-yellows cursor-pointer  "
                    icon={faFacebook}
                  ></FontAwesomeIcon>
                  <FontAwesomeIcon
                    className="w-6 h-6 smd:text-sm text-[10px] p-2 rounded-full text-yellows hover:bg-yellows hover:text-black transition-all duration-200 ease-in-out hover:shadow-lg hover:shadow-yellows cursor-pointer "
                    icon={faInstagram}
                  ></FontAwesomeIcon>
                  <FontAwesomeIcon
                    className="w-6 h-6 smd:text-sm text-[10px] p-2 rounded-full text-yellows hover:bg-yellows hover:text-black transition-all duration-200 ease-in-out hover:shadow-lg hover:shadow-yellows cursor-pointer "
                    icon={faGithub}
                  ></FontAwesomeIcon>
                  <FontAwesomeIcon
                    className="w-6 h-6 smd:text-sm text-[10px] p-2 rounded-full text-yellows hover:bg-yellows hover:text-black transition-all duration-200 ease-in-out hover:shadow-lg hover:shadow-yellows cursor-pointer "
                    icon={faGlobe}
                  ></FontAwesomeIcon>
                  <FontAwesomeIcon
                    className="w-6 h-6 smd:text-sm text-[10px] p-2 rounded-full text-yellows hover:bg-yellows hover:text-black transition-all duration-200 ease-in-out hover:shadow-lg hover:shadow-yellows cursor-pointer "
                    icon={faYoutube}
                  ></FontAwesomeIcon>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterExample;
