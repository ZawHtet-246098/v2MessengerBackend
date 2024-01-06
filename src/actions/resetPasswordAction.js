import axios from "axios";
import * as api from "../api";
import Notifications, { notify } from "react-notify-toast";

let myColor = { background: "#0E1717", text: "#FFFFFF" };

export const resetPws = (resetGmail, navigate) => async (dispatch) => {
  try {
    const { data } = await api.sendEmail(resetGmail);
    if (data.success === true) {
      navigate("/passwordreset/otp", { state: resetGmail });
    }
  } catch (error) {
    const data = error.response.data;
    console.log("====================================");
    console.log(data);
    console.log("====================================");
  }
};

export const validatationOTP = (emailAndotp, navigate) => async (dispatch) => {
  try {
    // await notify.show(
    //   "OTP validation is processing properly!!!",
    //   "warning",
    //   2000,
    //   myColor
    // );

    const { data } = await api.otpvalidation(emailAndotp);
    if (data.success === true) {
      navigate("/passwordreset/changepws", { state: emailAndotp.email });
    }
  } catch (error) {
    const data = error.response.data;
    notify.show(data.msg, "error", 3000, myColor);
  }
};

export const changePassword =
  (updatePasswordData, navigate) => async (dispatch) => {
    try {
      // notify.show(
      //   "Updating password is processing properly!!!",
      //   "warning",
      //   1000,
      //   myColor
      // );
      const { data } = await api.changepws(updatePasswordData);

      if (data.success === true) {
        notify.show(data.msg, "warning", 3000, myColor);

        navigate("/login");
      }
    } catch (error) {
      const data = error.response.data;
      console.log(data);
      notify.show(data.msg, "error", 3000, myColor);
    }
  };
