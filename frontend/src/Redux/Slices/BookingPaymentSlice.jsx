import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BookingPaymentSlice = createSlice({
  name: "Booking",
  initialState: {
    tourBooking: [],
    transportBooking: [],
    hotelBooking: [],
    loading: false,
    errorSearch: null,
  },
  reducers: {
    userSearchRequest: (state) => {
      state.loading = true;
      state.errorSearch = null;
    },
    tourBookingSuccess: (state, action) => {
      state.loading = false;
      state.tourBooking = action.payload;
    },
    transportBookingSuccess: (state, action) => {
      state.loading = false;
      state.transportBooking = action.payload;
    },
    hotelBookingSuccess: (state, action) => {
      state.loading = false;
      state.hotelBooking = action.payload;
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
  tourBookingSuccess,
  transportBookingSuccess,
  hotelBookingSuccess,
  userSearchFailure,
  resetUserSearchState,
} = BookingPaymentSlice.actions;

export const BookingsTour = (
  id,
  bookerName,
  bookerEmail,
  bookerPhone,
  bookerAddress,
  members,
  checkInDate,
  dropOffLocation,
  pickUpLocation,
  suggestion
) => async (dispatch) => {
  dispatch(userSearchRequest());
  const token = localStorage.getItem("jwtToken");

  try {
    const response = await axios.post(
      `https://epic-explorer-backend.vercel.app/Tour/getFormData/${id}`,
      {
        bookerName,
        bookerEmail,
        bookerPhone,
        bookerAddress,
        members,
        dropOffLocation,
        pickUpLocation,
        suggestion,
      },
      {
        headers: {
          "Content-Type": "application/json",
          auth_token: token,
        },
      }
    );

    dispatch(tourBookingSuccess(response.data));
  } catch (errorSearch) {
    const errorMessage =
      errorSearch.response && errorSearch.response.data
        ? errorSearch.response.data.message
        : errorSearch.message;
    dispatch(userSearchFailure(errorMessage));
    console.log("errorSearch:", errorMessage);
  }
};

export const BookingsTransport = (
  id,
  bookerName,
  bookerEmail,
  bookerPhone,
  bookerAddress,
  suggestion,
  members,
  days,
  dropOffLocation,
  pickUpLocation,
  checkInDate
) => async (dispatch) => {
  dispatch(userSearchRequest());
  const token = localStorage.getItem("jwtToken");

  try {
    const response = await axios.post(
      `https://epic-explorer-backend.vercel.app/Transport/getTransportFormData/${id}`,
      {
        bookerName,
        bookerEmail,
        bookerPhone,
        bookerAddress,
        suggestion,
        members,
        days,
        dropOffLocation,
        pickUpLocation,
        checkInDate,
      },
      {
        headers: {
          "Content-Type": "application/json",
          auth_token: token,
        },
      }
    );

    dispatch(transportBookingSuccess(response.data));
  } catch (errorSearch) {
    const errorMessage =
      errorSearch.response && errorSearch.response.data
        ? errorSearch.response.data.message
        : errorSearch.message;
    dispatch(userSearchFailure(errorMessage));
    console.log("errorSearch:", errorMessage);
  }
};

export const BookingsHotel = (
  id,
  bookerName,
  bookerEmail,
  bookerPhone,
  bookerAddress,
  suggestion,
  members,
  days,
  checkInDate
) => async (dispatch) => {
  dispatch(userSearchRequest());
  const token = localStorage.getItem("jwtToken");

  try {
    const response = await axios.post(
      `https://epic-explorer-backend.vercel.app/Room/getFormData/${id}`,
      {
        bookerName,
        bookerEmail,
        bookerPhone,
        bookerAddress,
        suggestion,
        members,
        days,
        checkInDate,
      },
      {
        headers: {
          "Content-Type": "application/json",
          auth_token: token,
        },
      }
    );

    dispatch(hotelBookingSuccess(response.data));
  } catch (errorSearch) {
    const errorMessage =
      errorSearch.response && errorSearch.response.data
        ? errorSearch.response.data.message
        : errorSearch.message;
    dispatch(userSearchFailure(errorMessage));
    console.log("errorSearch:", errorMessage);
  }
};

export default BookingPaymentSlice.reducer;
