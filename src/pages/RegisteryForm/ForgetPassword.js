import React, { useState } from "react";
import Notifications, { notify } from "react-notify-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { resetPws } from "../../actions/resetPasswordAction";

const ForgetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [resetGmail, setResetGmail] = useState({
    email: "",
  });

  const handleValidationForLogin = () => {
    const { email } = resetGmail;

    if (email === "") {
      notify.show("Email is required!!!", "error", 3000, myColor);
      //   toast.error("Email is required!!!  etw323", toastOptions);
      return false;
    }
    return true;
  };

  const handleChange = (event) => {
    setResetGmail({
      ...resetGmail,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmitForFrogetPws = async (event) => {
    event.preventDefault();

    handleValidationForLogin();
    if (handleValidationForLogin()) {
      dispatch(resetPws(resetGmail, navigate));
      notify.show(
        "Email sending is processing properly!!!",
        "warning",
        3000,
        myColor
      );
    }
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
      <form
        style={{
          background: "rgba(255,255,255,0.02)",
          backdropFilter: "blur(5px)",
        }}
        onSubmit={(event) => handleSubmitForFrogetPws(event)}
        className="w-5/12 border m-auto  px-10 pb-8   shadow-md shadow-blue-500/100 border-indigo-600"
      >
        <h3
          style={{ color: "#AEBEC1" }}
          className="text-2xl font-bold  decoration-white pt-10 pb-4 text-start border-b-[2px]"
        >
          Reset Your Password
        </h3>
        <p style={{ color: "#AEBEC1" }}>
          Please enter your email address or mobile number to receive the code
          to reset your password?
        </p>

        <div className="border-b-[2px] pt-5 pb-2">
          <input
            style={{ color: "#21475C" }}
            onChange={(e) => handleChange(e)}
            type="email"
            name="email"
            id="email"
            className="email border  p-2 text-slate-900 focus:border-indigo-600  shadow-md shadow-blue-500/100  outline-0 border-2 rounded-md  mb-4 w-full"
            placeholder="email"
          />
        </div>

        <button
          style={{ color: "#21475C" }}
          type="submit"
          className="border bg-white font-bold p-2 text-slate-900 focus:border-indigo-600 shadow-md shadow-blue-500/100  outline-0 border-2 rounded-md mb-2 mt-8 w-full "
        >
          Get a OTP
        </button>
        <Notifications options={{ zIndex: 200, top: "-30px" }} />
      </form>
    </div>
  );
};

export default ForgetPassword;
