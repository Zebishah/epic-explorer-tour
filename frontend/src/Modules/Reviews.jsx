import image from "../images/man-user-circle-icon.png";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Rating from "react-rating-stars-component";
import { showReviewStart } from "../Redux/Slices/TourPackagesSlice";
import image2 from "../img/vecteezy_modern-business-white-background-with-line-seamless-pattern_20389979-1.jpg";
const Reviews = () => {
  const [Reviews, setReviews] = useState([]);
  const dispatch = useDispatch();
  const { Review } = useSelector((state) => state.TourPackage);

  useEffect(() => {
    dispatch(showReviewStart());
  }, [dispatch]);

  useEffect(() => {
    if (Review) {
      if (Review.allReviews) {
        setReviews(Review.allReviews.slice(0, 3));
      }
    }
  }, [Review]);
  const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return new Intl.DateTimeFormat("en-GB", options).format(
      new Date(dateString)
    );
  };
  return (
    <div className="flex flex-col items-center justify-center w-full h-auto mt-16 gap-y-20">
      <h1 className="text-white text-lg smd:text-5xl font-joining bg-[#206eff] p-6 rounded-lg shadow-lg shadow-fade-black">
        Reviews
      </h1>
      <div className="flex flex-col justify-center items-center space-y-10 h-auto p-12 w-[100%] smd:w-[80%]">
        {Reviews.map((review, index) => (
          <div
            className="bg-[#206eff] bg-center bg-cover border-2 border-[#3654ff] p-8 rounded-xl shadow-lg shadow-fade-black"
            key={index}
            style={{
              backgroundImage: `url(${image2})`,
            }}
          >
            <div className="flex flex-col items-center mb-4 lg:flex-row gap-x-4">
              <div className="mr-4 overflow-hidden rounded-full">
                <img
                  src={review.image ? review.image : image}
                  alt="..."
                  className="w-64"
                />
              </div>
              <div>
                <div className="flex flex-col items-start justify-start mt-2">
                  <div className="flex items-center justify-between w-full mt-6">
                    <h2 className="text-sm text-fade-black smd:text-xl font-radios">
                      {review.name}
                    </h2>
                    <p className="text-sm text-[#3654ff] text-end font-radios smd:text-lg">
                      {formatDate(review.createdAt)}
                    </p>
                  </div>

                  <Rating
                    count={5}
                    value={review.rating}
                    size={30}
                    activeColor="#FFD700" // Gold color
                    edit={false} // Disable rating
                  />

                  <p className="text-sm text-justify text-gray-500 font-radios smd:text-lg">
                    “{review.words}”
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
