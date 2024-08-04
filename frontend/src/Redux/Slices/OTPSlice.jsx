import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const otpSlice = createSlice({
  name: "OTP",
  initialState: {
    otpData: null,
    loading: false,
    otpError: null,
  },
  reducers: {
    OTPRequest: (state) => {
      state.loading = true;
      state.otpError = null;
    },
    OTPSuccess: (state, action) => {
      state.loading = false;
      state.otpData = action.payload;
    },
    OTPFailure: (state, action) => {
      state.loading = false;
      state.otpError = action.payload;
    },
    resetOTPState: (state) => {
      state.otpData = null;
      state.otpError = null;
      state.loading = false;
    },
  },
});

export const {
  OTPRequest,
  OTPSuccess,
  OTPFailure,
  resetOTPState,
} = otpSlice.actions;

export const otpSender = (otp) => async (dispatch, getState) => {
  dispatch(OTPRequest());
  const state = getState();
  const { email } = state.login;

  try {
    const response = await axios.post(
      `https://epic-explorer-backend.vercel.app/User/verifyOTP`,
      { otp, email },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch(OTPSuccess(response.data));
    console.log("Successful signUp");
  } catch (error) {
    dispatch(OTPFailure(error.response ? error.response.data : error.message));
    console.error(
      "Error:",
      error.response ? error.response.data : error.message
    );
  }
};

export default otpSlice.reducer;
