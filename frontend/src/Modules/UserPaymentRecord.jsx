import Footer from "./Footer";
import PaymentsHistory from "./PaymentsHistory";
import SideBar from "./SideBar";

const UserPaymentRecord = () => {
  return (
    <div className="flex flex-row w-full h-full overflow-hidden gap-x-6 bg-light-black">
      <SideBar />

      <div className="flex flex-col items-center flex-grow gap-y-10 lg:p-6 ">
        <PaymentsHistory />
        <Footer />
      </div>
    </div>
  );
};

export default UserPaymentRecord;
