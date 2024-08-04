import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const tourDetailSlice = createSlice({
  name: "TourDetail",
  initialState: {
    tourDetail: {
      tour: [],
      tourServiceIt: [],
    },
    roomDetail: {
      room: [],
      roomServiceIt: [],
    },
    transportDetail: {
      transport: [],
      transportServiceIt: [],
    },
    relatedTour: [],
    userDetail: [],
    customTours: [],
    relatedHotel: [],
    relatedTransport: [],
    RelatedBlogs: [],
    extraPaymentDetail: [],
    extraTPaymentDetail: [],
    extraHPaymentDetail: [],
    TourReviews: [],
    HotelReviews: [],
    TransportReviews: [],
    Review: [],
    loading: false,
    errorSearch: null,
  },
  reducers: {
    userSearchRequest: (state) => {
      state.loading = true;
      state.errorSearch = null;
    },
    tourDetailSuccess: (state, action) => {
      state.loading = false;
      state.tourDetail = action.payload;
    },
    roomDetailSuccess: (state, action) => {
      state.loading = false;
      state.roomDetail = action.payload;
    },
    customTourSuccess: (state, action) => {
      state.loading = false;
      state.customTours = action.payload;
    },
    userDetailSuccess: (state, action) => {
      state.loading = false;
      state.userDetail = action.payload;
    },
    relatedTourSuccess: (state, action) => {
      state.loading = false;
      state.relatedTour = action.payload;
    },
    extraDetailSuccess: (state, action) => {
      state.loading = false;
      state.extraPaymentDetail = action.payload;
    },
    extraTDetailSuccess: (state, action) => {
      state.loading = false;
      state.extraTPaymentDetail = action.payload;
    },
    extraHDetailSuccess: (state, action) => {
      state.loading = false;
      state.extraHPaymentDetail = action.payload;
    },
    relatedTransportSuccess: (state, action) => {
      state.loading = false;
      state.relatedTransport = action.payload;
    },
    relatedHotelSuccess: (state, action) => {
      state.loading = false;
      state.relatedHotel = action.payload;
    },
    transportDetailSuccess: (state, action) => {
      state.loading = false;
      state.transportDetail = action.payload;
    },
    RelatedBlogsSuccess: (state, action) => {
      state.loading = false;
      state.RelatedBlogs = action.payload;
    },
    TourReviewsSuccess: (state, action) => {
      state.loading = false;
      state.TourReviews = action.payload;
    },
    hotelReviewSuccess: (state, action) => {
      state.loading = false;
      state.HotelReviews = action.payload;
    },
    TransportReviewsSuccess: (state, action) => {
      state.loading = false;
      state.TransportReviews = action.payload;
    },
    ReviewSuccess: (state, action) => {
      state.loading = false;
      state.Review = action.payload;
    },
    userSearchFailure: (state, action) => {
      state.loading = false;
      state.errorSearch = action.payload;
    },
    resetUserSearchState: (state) => {
      (state.tourPackage = []),
        (state.latestTour = []),
        (state.Review = []),
        (state.errorSearch = null);
      state.loading = false;
    },
  },
});

export const {
  userSearchRequest,
  tourDetailSuccess,
  relatedTourSuccess,
  transportDetailSuccess,
  extraDetailSuccess,
  extraTDetailSuccess,
  relatedHotelSuccess,
  RelatedBlogsSuccess,
  customTourSuccess,
  TourReviewsSuccess,
  roomDetailSuccess,
  hotelReviewSuccess,
  userDetailSuccess,
  ReviewSuccess,
  relatedTransportSuccess,
  TransportReviewsSuccess,
  extraHDetailSuccess,
  userSearchFailure,
  resetUserSearchState,
} = tourDetailSlice.actions;

export const showTourDetail = (id) => async (dispatch) => {
  dispatch(userSearchRequest());
  const token = localStorage.getItem("jwtToken");
  console.log(id);
  if (id) {
    try {
      const response = await axios.post(
        `https://epic-explorer-backend.vercel.app/Tour/openTour/${id}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            auth_token: token,
          },
        }
      );

      dispatch(tourDetailSuccess(response.data));
    } catch (errorSearch) {
      const errorMessage =
        errorSearch.response && errorSearch.response.data
          ? errorSearch.response.data.message
          : errorSearch.message;
      dispatch(userSearchFailure(errorMessage));
      console.log("errorSearch:", errorMessage);
    }
  }
};
export const getTourDetail = () => async (dispatch) => {
  dispatch(userSearchRequest());
  const token = localStorage.getItem("jwtToken");

  try {
    const response = await axios.post(
      `https://epic-explorer-backend.vercel.app/User/getUserInfo`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          auth_token: token,
        },
      }
    );

    dispatch(userDetailSuccess(response.data));
  } catch (errorSearch) {
    const errorMessage =
      errorSearch.response && errorSearch.response.data
        ? errorSearch.response.data.message
        : errorSearch.message;
    dispatch(userSearchFailure(errorMessage));
    console.log("errorSearch:", errorMessage);
  }
};

export const showRoomDetail = (id) => async (dispatch) => {
  dispatch(userSearchRequest());

  const token = localStorage.getItem("jwtToken");

  try {
    const response = await axios.post(
      `https://epic-explorer-backend.vercel.app/Room/openRoom/${id}`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          auth_token: token,
        },
      }
    );

    dispatch(roomDetailSuccess(response.data));
  } catch (errorSearch) {
    const errorMessage =
      errorSearch.response && errorSearch.response.data
        ? errorSearch.response.data.message
        : errorSearch.message;
    dispatch(userSearchFailure(errorMessage));
    console.log("errorSearch:", errorMessage);
  }
};
export const showTransportDetail = (id) => async (dispatch) => {
  dispatch(userSearchRequest());
  const token = localStorage.getItem("jwtToken");

  try {
    const response = await axios.post(
      `https://epic-explorer-backend.vercel.app/Transport/openTransport/${id}`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          auth_token: token,
        },
      }
    );

    dispatch(transportDetailSuccess(response.data));
  } catch (errorSearch) {
    const errorMessage =
      errorSearch.response && errorSearch.response.data
        ? errorSearch.response.data.message
        : errorSearch.message;
    dispatch(userSearchFailure(errorMessage));
    console.log("errorSearch:", errorMessage);
  }
};

export const showRelatedTours = ({ id }) => async (dispatch) => {
  dispatch(userSearchRequest());
  id = id.toString();
  try {
    const response = await axios.post(
      `https://epic-explorer-backend.vercel.app/Tour/RelatedTour`,
      { id },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch(relatedTourSuccess(response.data));
  } catch (errorSearch) {
    const errorMessage =
      errorSearch.response && errorSearch.response.data
        ? errorSearch.response.data.message
        : errorSearch.message;
    dispatch(userSearchFailure(errorMessage));
    console.log("errorSearch:", errorMessage);
  }
};
export const showRelatedHotels = ({ id }) => async (dispatch) => {
  dispatch(userSearchRequest());
  id = id.toString();
  try {
    const response = await axios.post(
      `https://epic-explorer-backend.vercel.app/Room/RelatedRoom`,
      { id },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch(relatedHotelSuccess(response.data));
  } catch (errorSearch) {
    const errorMessage =
      errorSearch.response && errorSearch.response.data
        ? errorSearch.response.data.message
        : errorSearch.message;
    dispatch(userSearchFailure(errorMessage));
    console.log("errorSearch:", errorMessage);
  }
};
export const showRelatedTransport = ({ id }) => async (dispatch) => {
  dispatch(userSearchRequest());
  id = id.toString();
  try {
    const response = await axios.post(
      `https://epic-explorer-backend.vercel.app/Transport/RelatedTransport`,
      { id },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response.data);
    dispatch(relatedTransportSuccess(response.data));
  } catch (errorSearch) {
    const errorMessage =
      errorSearch.response && errorSearch.response.data
        ? errorSearch.response.data.message
        : errorSearch.message;
    dispatch(userSearchFailure(errorMessage));
    console.log("errorSearch:", errorMessage);
  }
};
export const showRelatedBlogs = ({ id }) => async (dispatch) => {
  dispatch(userSearchRequest());
  id = id.toString();
  try {
    const response = await axios.post(
      `https://epic-explorer-backend.vercel.app/Blog/getTourBlog`,
      { id },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch(RelatedBlogsSuccess(response.data));
  } catch (errorSearch) {
    const errorMessage =
      errorSearch.response && errorSearch.response.data
        ? errorSearch.response.data.message
        : errorSearch.message;
    dispatch(userSearchFailure(errorMessage));
    console.log("errorSearch:", errorMessage);
  }
};
export const showTourReviews = ({ id }) => async (dispatch) => {
  dispatch(userSearchRequest());
  id = id.toString();
  try {
    const response = await axios.post(
      `https://epic-explorer-backend.vercel.app/Review/getTourReviews`,
      { id },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch(TourReviewsSuccess(response.data));
  } catch (errorSearch) {
    const errorMessage =
      errorSearch.response && errorSearch.response.data
        ? errorSearch.response.data.message
        : errorSearch.message;
    dispatch(userSearchFailure(errorMessage));
    console.log("errorSearch:", errorMessage);
  }
};
export const showHotelReviews = ({ id }) => async (dispatch) => {
  dispatch(userSearchRequest());

  try {
    const response = await axios.post(
      `https://epic-explorer-backend.vercel.app/Review/getHotelReviews`,
      { id },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch(hotelReviewSuccess(response.data));
  } catch (errorSearch) {
    const errorMessage =
      errorSearch.response && errorSearch.response.data
        ? errorSearch.response.data.message
        : errorSearch.message;
    dispatch(userSearchFailure(errorMessage));
    console.log("errorSearch:", errorMessage);
  }
};
export const showExtraPDetail = (id) => async (dispatch) => {
  dispatch(userSearchRequest());

  try {
    const response = await axios.post(
      `https://epic-explorer-backend.vercel.app/User/extraPaymentDetail`,
      { id },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch(extraDetailSuccess(response.data));
  } catch (errorSearch) {
    const errorMessage =
      errorSearch.response && errorSearch.response.data
        ? errorSearch.response.data.message
        : errorSearch.message;
    dispatch(userSearchFailure(errorMessage));
    console.log("errorSearch:", errorMessage);
  }
};
export const showExtraHDetail = (id) => async (dispatch) => {
  dispatch(userSearchRequest());

  try {
    const response = await axios.post(
      `https://epic-explorer-backend.vercel.app/User/extraHPaymentDetail`,
      { id },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch(extraHDetailSuccess(response.data));
  } catch (errorSearch) {
    const errorMessage =
      errorSearch.response && errorSearch.response.data
        ? errorSearch.response.data.message
        : errorSearch.message;
    dispatch(userSearchFailure(errorMessage));
    console.log("errorSearch:", errorMessage);
  }
};
export const showExtraTDetail = (id) => async (dispatch) => {
  dispatch(userSearchRequest());

  try {
    const response = await axios.post(
      `https://epic-explorer-backend.vercel.app/User/extraTPaymentDetail`,
      { id },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch(extraTDetailSuccess(response.data));
  } catch (errorSearch) {
    const errorMessage =
      errorSearch.response && errorSearch.response.data
        ? errorSearch.response.data.message
        : errorSearch.message;
    dispatch(userSearchFailure(errorMessage));
    console.log("errorSearch:", errorMessage);
  }
};
export const showTransportReviews = ({ id }) => async (dispatch) => {
  dispatch(userSearchRequest());
  id = id.toString();
  try {
    const response = await axios.post(
      `https://epic-explorer-backend.vercel.app/Review/getTransportReviews`,
      { id },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch(TransportReviewsSuccess(response.data));
  } catch (errorSearch) {
    const errorMessage =
      errorSearch.response && errorSearch.response.data
        ? errorSearch.response.data.message
        : errorSearch.message;
    dispatch(userSearchFailure(errorMessage));
    console.log("errorSearch:", errorMessage);
  }
};
export const addReviews = ({ id }, name, email, words, rating) => async (
  dispatch
) => {
  dispatch(userSearchRequest());
  id = id.toString();
  const token = localStorage.getItem("jwtToken");
  try {
    const response = await axios.post(
      `https://epic-explorer-backend.vercel.app/Review/addReviews`,
      { id, name, email, words, rating },
      {
        headers: {
          "Content-Type": "application/json",
          auth_token: token,
        },
      }
    );

    dispatch(ReviewSuccess(response.data));
  } catch (errorSearch) {
    const errorMessage =
      errorSearch.response && errorSearch.response.data
        ? errorSearch.response.data.message
        : errorSearch.message;
    dispatch(userSearchFailure(errorMessage));
    console.log("errorSearch:", errorMessage);
  }
};

export const showCustomTour = (tourLocation, membersLimit, days) => async (
  dispatch
) => {
  dispatch(userSearchRequest());

  try {
    const response = await axios.post(
      `https://epic-explorer-backend.vercel.app/Tour/customizedTour`,
      { tourLocation, membersLimit, days },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch(customTourSuccess(response.data));
  } catch (errorSearch) {
    const errorMessage =
      errorSearch.response && errorSearch.response.data
        ? errorSearch.response.data.message
        : errorSearch.message;
    dispatch(userSearchFailure(errorMessage));
    console.log("errorSearch:", errorMessage);
  }
};
export default tourDetailSlice.reducer;
