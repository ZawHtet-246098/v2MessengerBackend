import React, { useState } from "react";
import Notifications, { notify } from "react-notify-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { validatationOTP } from "../../actions/resetPasswordAction";

const OTPSubmitForm = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState({
    otpNumber: "",
  });

  const location = useLocation();
  const dispatch = useDispatch();

  // console.log(otp);
  const handleValidationForLogin = () => {
    const { otpNumber } = otp;

    if (otpNumber.length < 6) {
      notify.show("OTP must be at least 6 number!!!", "error", 3000, myColor);
      //   toast.error("Email is required!!!  etw323", toastOptions);
      return false;
    }
    return true;
  };

  const handleSubmitForOTP = async (event) => {
    event.preventDefault();

    handleValidationForLogin();
    if (handleValidationForLogin()) {
      const { otpNumber } = otp;
      const emailAndotp = { otp: otpNumber, email: location.state.email };

      dispatch(validatationOTP(emailAndotp, navigate));
    }
  };

  const handleChange = (event) => {
    setOtp({
      ...otp,
      [event.target.name]: event.target.value,
    });
  };

  let myColor = { background: "#0E1717", text: "#FFFFFF" };

  return (
    <div
      style={{
        // backgroundImage:
        //   "url(https://i.pinimg.com/originals/a6/d8/da/a6d8da82400a7946616368d8426a7faa.jpg)",
        backgroundImage:
          "linear-gradient(90deg,rgba(0,0,0,.5) 10%,rgba(0,0,0,.2)),url(https://i.pinimg.com/originals/a6/d8/da/a6d8da82400a7946616368d8426a7faa.jpg)",

        backgroundSize: "contain",
      }}
      className="h-screen pt-40"
    >
      <div>
        <form
          style={{
            background: "rgba(255,255,255,0.02)",
            backdropFilter: "blur(5px)",
          }}
          onSubmit={(event) => handleSubmitForOTP(event)}
          className="w-5/12 border m-auto  px-10 pb-8   shadow-md shadow-blue-500/100 border-indigo-600"
        >
          <h3
            style={{ color: "#AEBEC1" }}
            className="text-2xl font-bold  decoration-white pt-10 pb-4 text-start border-b-[2px]"
          >
            Enter security code
          </h3>
          <p style={{ color: "#AEBEC1" }}>
            Please check your emails for a message with your code. Your code is
            6 numbers long.
          </p>

          <div className="border-b-[2px] pt-5 pb-2 flex gap-5">
            <input
              style={{ color: "#21475C" }}
              onChange={(e) => handleChange(e)}
              type="text"
              name="otpNumber"
              id="OTP"
              className="OTP border  p-2 text-slate-900 focus:border-indigo-600  shadow-md shadow-blue-500/100  outline-0 border-2 rounded-md  mb-4 w-7/12"
              placeholder="OTP"
            />
            <div style={{ color: "#AEBEC1" }}>
              <p>We sent your code to:</p>
              {location.state.email !== null && (
                <p className="font-bold">{location.state.email}</p>
              )}
            </div>
          </div>

          <div className="mb-2 mt-8 flex gap-5 justify-end ">
            <button
              style={{ color: "#21475C" }}
              type="submit"
              className="border bg-white font-bold p-2 text-slate-900 focus:border-indigo-600 shadow-md shadow-blue-500/100  outline-0 border-2 rounded-md  w-3/12 "
            >
              Cancle
            </button>

            <button
              style={{ color: "#21475C" }}
              type="submit"
              className="border bg-white font-bold p-2 text-slate-900 focus:border-indigo-600 shadow-md shadow-blue-500/100  outline-0 border-2 rounded-md  w-3/12 "
            >
              Continue
            </button>
          </div>
          <Notifications options={{ zIndex: 200, top: "-30px" }} />
        </form>
      </div>
    </div>
  );
};

export default OTPSubmitForm;
