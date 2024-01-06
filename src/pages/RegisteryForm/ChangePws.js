import React, { useState } from "react";
import Notifications, { notify } from "react-notify-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { changePassword } from "../../actions/resetPasswordAction";

const ChangePws = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [updatePws, setUpdatePws] = useState({
    password: "",
    confirmPassword: "",
  });
  const location = useLocation();

  let myColor = { background: "#0E1717", text: "#FFFFFF" };

  const handleValidationForLogin = () => {
    const { password, confirmPassword } = updatePws;

    if (password.length < 4) {
      notify.show(
        "Password must be longer than 4 characters!",
        "error",
        3000,
        myColor
      );
      return false;
    } else if (password !== confirmPassword) {
      notify.show(
        "Password and confirm password password must be matched!",
        "error",
        3000,
        myColor
      );

      //   toast.error("Email is required!!!  etw323", toastOptions);
      return false;
    }
    return true;
  };

  const handleChange = (event) => {
    setUpdatePws({
      ...updatePws,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmitForChangePwsForm = async (event) => {
    event.preventDefault();

    handleValidationForLogin();
    if (handleValidationForLogin()) {
      const updatePasswordData = {
        email: location.state,
        password: updatePws.password,
      };

      //   dispatch(resetPws(resetGmail, navigate));
      dispatch(changePassword(updatePasswordData, navigate));
    }
  };

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
      {/* <br /> <br /> <br /> */}
      <form
        style={{
          background: "rgba(255,255,255,0.02)",
          backdropFilter: "blur(5px)",
        }}
        onSubmit={(event) => handleSubmitForChangePwsForm(event)}
        className="w-5/12 border m-auto  px-10   shadow-md shadow-blue-500/100 border-indigo-600"
      >
        <h3
          style={{ color: "#AEBEC1" }}
          className="text-2xl font-bold  decoration-white pt-10 pb-4 text-start border-b-[2px]"
        >
          Change Your Password
        </h3>
        <div className="py-5">
          <p className="pb-3 text-white">
            password must be at least 6 charachers and match with confrim
            password!!!
          </p>
          <input
            style={{ color: "#21475C" }}
            onChange={(e) => handleChange(e)}
            type="password"
            name="password"
            id="password"
            className="password outline-0 border p-2 text-slate-900 focus:border-indigo-600  shadow-md shadow-blue-500/100   border-2 rounded-md  mb-4 w-full outline-violet-500"
            placeholder="password"
          />
          <input
            style={{ color: "#21475C" }}
            onChange={(e) => handleChange(e)}
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            className="confirmPassword outline-0 border p-2 text-slate-900 focus:border-indigo-600  shadow-md shadow-blue-500/100   border-2 rounded-md  mb-4 w-full outline-violet-500"
            placeholder="confirm password"
          />
        </div>

        <button
          style={{ color: "#21475C" }}
          type="submit"
          className="border bg-white font-bold p-2 text-slate-900 focus:border-indigo-600 shadow-md shadow-blue-500/100  outline-0 border-2 rounded-md mb-5 w-full "
        >
          Submit
        </button>
        <Notifications options={{ zIndex: 200, top: "50px" }} />
      </form>
    </div>
  );
};

export default ChangePws;
