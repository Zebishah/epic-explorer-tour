import { useState } from "react";
import ReactStars from "react-rating-stars-component";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { showTransportReviews } from "../Redux/Slices/ShowTourDetailsSlice";
const ReviewTransport = (id) => {
  const [Reviews, setReviews] = useState([]);
  const dispatch = useDispatch();
  const { TransportReviews } = useSelector((state) => state.TourDetail);

  useEffect(() => {
    dispatch(showTransportReviews(id));
  }, [dispatch]);

  useEffect(() => {
    if (TransportReviews) {
      if (TransportReviews.getReview) {
        setReviews(TransportReviews.getReview.slice(0, 3));
        console.log(TransportReviews.getReview);
      }
    }
  }, [TransportReviews]);

  const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return new Intl.DateTimeFormat("en-GB", options).format(
      new Date(dateString)
    );
  };
  return (
    <div className="max-w-4xl p-6 mx-auto">
      <h2 className="text-center text-2xl font-bold mb-6 text-white bg-[#206eff] p-3 rounded-lg shadow-lg">
        Customer Reviews
      </h2>
      {Reviews.map((review, index) => (
        <div
          key={index}
          className="flex flex-col items-start p-6 mb-6 bg-white rounded-lg shadow-lg shadow-black md:flex-row md:items-start"
        >
          <img
            src={review.image}
            alt={review.name}
            className="w-12 h-12 mb-4 mr-4 rounded-full md:mb-0"
          />
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <div className="flex flex-col items-start">
                <h3 className="text-lg font-radios">{review.name}</h3>
                <div className="flex items-center">
                  <ReactStars
                    count={5}
                    value={review.rating}
                    size={30}
                    activeColor="#FFD700"
                    isHalf={false}
                    edit={false}
                  />
                </div>
                <h3 className="text-lg font-radios">
                  About {review.reviewedService}
                </h3>
              </div>
              <span className="text-sm text-gray-500">
                {formatDate(review.createdAt)}
              </span>
            </div>
            <p className="mb-4 text-gray-700">{review.words}</p>
            <div className="flex items-center text-gray-500">
              <div className="flex items-center mr-4">
                <svg
                  className="w-5 h-5 mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M3.172 4.828a4 4 0 010 5.656L3 12h2a1 1 0 011 1v1a1 1 0 011 1h6a1 1 0 011-1v-1a1 1 0 011-1h2l-.172-.516a4 4 0 010-5.656l-.172-.172a4 4 0 00-5.656 0L10 7.172l-.828-.828a4 4 0 00-5.656 0l-.344.344zM6 11l4 4 4-4H6z" />
                </svg>
                {review.likes}
              </div>
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm4 3h2V7H6v1zm6 0h2V7h-2v1zm-3 0h2V7h-2v1z" />
                </svg>
                {review.comments}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReviewTransport;
