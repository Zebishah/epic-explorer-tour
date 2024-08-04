import image from "../images/marc-zimmer-a5QnUtau8lo-unsplash.jpg";
const BookTourBanner = () => {
  return (
    <div className="w-full h-screen">
      <img
        src={image}
        alt="image"
        className="w-full h-[40%] object-cover bg-center bg-no-repeat"
      />
    </div>
  );
};

export default BookTourBanner;
