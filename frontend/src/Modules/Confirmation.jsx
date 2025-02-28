import { useNavigate } from "react-router";
import Footer from "./Footer";
import Navbar from "./Navbar";

const Confirmation = () => {
  let Navigate = useNavigate();
  let ProceedPayment = () => {
    Navigate("/Ticket");
  };

  return (
    <div className="bg-light-black">
      <Navbar />
      <div className="flex flex-col items-center justify-center h-screen bg-light-black">
        <form
          onSubmit={ProceedPayment}
          className=" flex flex-col gap-y-6 justify-center items-center bg-fade-black w-[60%] h-[60%] rounded-lg shadow-lg"
        >
          <p className="text-lg text-center text-yellows text-radios">
            Are You Sure You wanna proceed with Your payment Please Click on
            confirm to Complete the tour payment
          </p>

          <button
            type="submit"
            className="p-3 text-black rounded-lg shadow-sm bg-yellows font-radios"
          >
            Confirm Payment
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Confirmation;
