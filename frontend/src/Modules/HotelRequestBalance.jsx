import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Footer from "./Footer";
import image from "../image/Family Packages (23).png";
import image2 from "../img/vecteezy_blue-and-white-curve-shape-background_11403724.jpg";
import { showExtraHDetail } from "../Redux/Slices/ShowTourDetailsSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import SingleNavbar from "./SingleNavbar";
import { SiBlockchaindotcom, SiStellar } from "react-icons/si";
const HotelRequestBalance = () => {
  const location = useLocation();
  const [SecretSeed, setSecretSeed] = useState("");
  const [amount, setAmount] = useState("");
  const [TourId, setTourId] = useState("");
  const [admin, setAdmin] = useState("");
  const [tourName, setTourName] = useState("");
  const [loading, setLoading] = useState(false);
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");

  let navigate = useNavigate();
  const dispatch = useDispatch();
  const { extraHPaymentDetail } = useSelector((state) => state.TourDetail);
  useEffect(() => {
    if (id) {
      dispatch(showExtraHDetail(id));
    }
  }, [dispatch]);
  useEffect(() => {
    if (extraHPaymentDetail) {
      if (extraHPaymentDetail.room) {
        console.log(extraHPaymentDetail);
        setAmount(extraHPaymentDetail.room.roomPrice);
        setAdmin(extraHPaymentDetail.admin);
        setTourName(extraHPaymentDetail.room.roomName);
        setTourId(extraHPaymentDetail.room.roomId);
      }
    }
  }, [extraHPaymentDetail]);

  const ProceedPayment = async () => {
    setLoading(true);
    console.log(SecretSeed);
    try {
      const response = await axios.post(
        `https://epic-explorer-backend.vercel.app/Room/RoomPayment/${id}`,
        { amount: amount.toString(), SecretSeed },
        {
          headers: {
            auth_token: localStorage.getItem("jwtToken"),
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.data;
      console.log(data);
      if (data.success == true) {
        setLoading(false);
        toast.success("Hotel successfully Booked");
        const timer = setTimeout(() => {
          navigate(`/HotelTicket?id=${TourId}`);
        }, 3000);
        return () => clearTimeout(timer);
      }
      console.log("Successful");
    } catch (error) {
      setLoading(false);
      console.error("Error:", error);
      toast.error(error.response.data.message);
    }
  };
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
        <div className="flex flex-col items-center justify-center h-screen gap-y-12 xl:-mt-20">
          <h1 className="text-white bg-[#206eff] p-3 rounded-lg shadow-lg shadow-fade-black text-4xl font-joining">
            Payment Form{" "}
          </h1>
          <div className="flex flex-row -mt-5 gap-x-6 justify-center items-start w-[80%] rounded-lg">
            {" "}
            <form className=" flex flex-col gap-y-6 justify-center items-center bg-[#206eff] w-[90%] h-auto rounded-lg shadow-lg p-16">
              <div className="flex flex-col gap-y-3">
                {" "}
                <p className="p-3 text-lg text-center text-blue-600 bg-white shadow-lg text-radios rounded-xl shadow-white">
                  Secure Payment Process with Stellar Blockchain.
                </p>
                <div className="flex flex-row items-center justify-center gap-x-3">
                  <div className="flex flex-col items-center justify-center gap-y-3">
                    {" "}
                    <SiStellar
                      size={30}
                      className="w-full mx-auto text-center text-white"
                    />
                    <p className="text-lg text-center text-white text-radios ">
                      Stellar
                    </p>
                  </div>
                  <div className="flex flex-col items-center justify-center gap-y-3">
                    {" "}
                    <SiBlockchaindotcom
                      size={30}
                      className="w-full mx-auto text-center text-white"
                    />
                    <p className="text-lg text-center text-white text-radios ">
                      Blockchain
                    </p>
                  </div>
                </div>
              </div>

              <p className="p-3 text-lg text-center text-blue-600 bg-white shadow-lg text-radios rounded-xl shadow-white">
                You have booked {tourName} and your total Payment amount in PKR
                is
                {amount} pkr
              </p>
              <p className="p-3 text-lg text-center text-blue-600 bg-white shadow-lg text-radios rounded-xl shadow-white">
                Please enter your Account details to proceed with payment.
              </p>
              <div className="grid gap-4 sm:grid-cols-1 sm:gap-6">
                <div className="sm:col-span-2">
                  <label
                    htmlFor="name"
                    className="block mb-2 text-lg font-medium text-white font-radios dark:text-white"
                  >
                    Sender-SecretSeed
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="bg-gray-50 border border-gray-300 p-3 text-wrap text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.50 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Your SecretSeed"
                    required
                    value={SecretSeed}
                    onChange={(e) => setSecretSeed(e.target.value)}
                  />
                </div>
                <div className="w-full">
                  <label
                    htmlFor="startDate"
                    className="block mb-2 text-lg font-medium text-gray-900 font-radios dark:text-white"
                  >
                    Recipient-Account
                  </label>
                  <input
                    type="text"
                    name="startDate"
                    id="startDate"
                    value={admin}
                    className="block w-full p-3 text-sm border border-gray-300 rounded-lg bg-gray-50 text-wrap focus:ring-primary-600 focus:border-primary-600 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Recipient Account"
                    required
                  />
                </div>
                <div className="w-full">
                  <label
                    htmlFor="price"
                    className="block mb-2 text-lg font-medium text-gray-900 font-radios dark:text-white"
                  >
                    Amount to pay
                  </label>
                  <input
                    type="text"
                    name="price"
                    id="price"
                    className="bg-gray-50 border border-gray-300 p-3 text-wrap text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.50 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    value={`${amount} pkr`}
                    required
                    disabled
                  />
                </div>

                <button
                  type="button"
                  onClick={ProceedPayment}
                  className="flex items-center justify-center p-3 text-black transition-all duration-300 ease-in-out rounded-lg shadow-sm bg-yellows font-radios hover:bg-white hover:text-blue-600"
                  disabled={loading}
                >
                  {loading ? (
                    <svg
                      className="w-5 h-5 text-black animate-spin"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C6.477 0 2 4.477 2 10h2zm2 5.291A7.96 7.96 0 014 12H2c0 2.137.84 4.09 2.209 5.535l1.791-1.244z"
                      ></path>
                    </svg>
                  ) : (
                    `Pay ${amount} pkr`
                  )}
                </button>
                <div className="flex flex-row mt-4 gap-x-2 ">
                  <input
                    type="checkbox"
                    name="check"
                    id="check"
                    className="w-4 h-4"
                    required
                  />
                  <p className="text-sm font-radios text-white -mt-0.5">
                    Confirm Your Payment
                  </p>
                </div>
              </div>
            </form>
            <div className="md:flex flex-col gap-y-6 justify-center items-center bg-[#206eff] w-[30%] h-auto rounded-lg shadow-lg px-7 py-6 hidden">
              <h1 className="text-[#206eff] bg-white p-3 rounded-lg shadow-lg shadow-fade-black">
                Payment Form{" "}
              </h1>
              <div className="flex flex-row items-center justify-center gap-x-3">
                <div className="flex flex-col items-center justify-center gap-y-3">
                  {" "}
                  <SiStellar
                    size={30}
                    className="w-full mx-auto text-center text-white"
                  />
                  <p className="text-lg text-center text-white text-radios ">
                    Stellar
                  </p>
                </div>
                <div className="flex flex-col items-center justify-center gap-y-3">
                  {" "}
                  <SiBlockchaindotcom
                    size={30}
                    className="w-full mx-auto text-center text-white"
                  />
                  <p className="text-lg text-center text-white text-radios ">
                    Blockchain
                  </p>
                </div>
              </div>
              <table className="w-full text-white">
                <tbody>
                  <tr>
                    <th className="py-2 pr-4 text-sm text-left font-radios">
                      Hotel-Name:
                    </th>
                    <td className="py-2 text-sm">{tourName}</td>
                  </tr>
                  <tr>
                    <th className="py-2 pr-4 text-sm text-left font-radios">
                      Total Amount:
                    </th>
                    <td className="py-2 text-sm">{amount} pkr</td>
                  </tr>
                  <tr>
                    <th className="py-2 pr-4 text-sm text-left font-radios">
                      Discount:
                    </th>
                    <td className="py-2 text-sm">5% Discount</td>
                  </tr>
                  <tr>
                    <th className="py-2 pr-4 text-sm text-left font-radios">
                      Booking Status:
                    </th>
                    <td className="py-2 text-sm">Not Booked</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default HotelRequestBalance;
