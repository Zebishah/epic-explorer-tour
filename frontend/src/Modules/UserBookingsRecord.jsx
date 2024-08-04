import Footer from "./Footer";
import SideBar from "./SideBar";
import UserBooking from "./UserBooking";

const UserBookingsRecord = () => {
  return (
    <div className="flex flex-row w-full h-full overflow-hidden gap-x-6 bg-light-black">
      <SideBar />

      <div className="flex flex-col items-center flex-grow gap-y-10 lg:p-6 ">
        <UserBooking />
        <Footer />
      </div>
    </div>
  );
};

export default UserBookingsRecord;
