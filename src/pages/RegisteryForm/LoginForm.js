import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Notifications, { notify } from "react-notify-toast";
import { login, loginWithFacebook, register } from "../../actions/auth";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FacebookLogin from "react-facebook-login";
import { GoogleLogin } from "react-google-login";

import { AiFillGoogleCircle } from "react-icons/ai";

const LoginForm = () => {
  const navigate = useNavigate();
  const { authData } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const [loginFormValues, setLoginFormValues] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleFacebookLogin = () => {
    window.open("http://localhost:5000/user/facebookAuth", "_self");
  };

  const responseFacebook = async (res) => {
    console.log(res);
  };

  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;

    console.log("====================================");
    console.log(result);
    console.log("====================================");

    try {
      // dispatch({ type: AUTH, data: { result, token } });
      dispatch({ type: "LOGIN", data: { result, token } });

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const googleError = (error) => {
    console.log(error);
    console.log("Google sing in was unsuccessful. Try again later");
  };

  useEffect(() => {
    if (localStorage.getItem("userInfo")) {
      navigate("/");
    }
  }, []);

  let myColor = { background: "#0E1717", text: "#FFFFFF" };

  const handleValidationForLogin = () => {
    const { password, email } = loginFormValues;

    if (email === "") {
      notify.show("Email is required!!!", "error", 3000, myColor);
      //   toast.error("Email is required!!!  etw323", toastOptions);
      return false;
    } else if (password === "") {
      notify.show("Password is required!!", "error", 3000, myColor);

      //   toast.error("Password is required!!", toastOptions);

      return false;
    }
    return true;
  };

  const handleChange = (event) => {
    setLoginFormValues({
      ...loginFormValues,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmitForLogin = async (event) => {
    event.preventDefault();
    handleValidationForLogin();
    if (handleValidationForLogin()) {
      const { email, password } = loginFormValues;
      // const {data} = await
      dispatch(login({ email, password }));
    }
  };

  useEffect(() => {
    if (authData) {
      localStorage.setItem("userInfo", JSON.stringify(authData));
      navigate("/");
    }
  }, [authData]);

  return (
    <div
      style={{
        // backgroundImage:
        //   "url(https://i.pinimg.com/originals/a6/d8/da/a6d8da82400a7946616368d8426a7faa.jpg)",
        backgroundImage:
          "linear-gradient(90deg,rgba(0,0,0,.5) 10%,rgba(0,0,0,.2)),url(https://i.pinimg.com/originals/a6/d8/da/a6d8da82400a7946616368d8426a7faa.jpg)",

        backgroundSize: "contain",
      }}
      className="h-screen pt-14"
    >
      <form
        style={{
          background: "rgba(255,255,255,0.02)",
          backdropFilter: "blur(5px)",
        }}
        onSubmit={(event) => handleSubmitForLogin(event)}
        className="w-5/12 border m-auto  px-10   shadow-md shadow-blue-500/100 border-indigo-600"
      >
        <div className="pt-10 pb-8 items-center justify-center flex  gap-2 flex-row">
          <img style={{ width: "100px" }} src="./images/logo1.png" alt="" />
          <h1
            style={{ color: "#AEBEC1" }}
            className="text-4xl font-bold  decoration-white text-center text-white "
          >
            {" "}
            Login Form
          </h1>
        </div>
        {/* <h1
          style={{ color: "#AEBEC1" }}
          className="text-4xl font-bold  decoration-white p-10 text-center"
        ></h1> */}
        <div className="flex gap-2 ">
          <input
            style={{ color: "#21475C" }}
            onChange={(e) => handleChange(e)}
            type="text"
            name="name"
            id="name"
            className="name border p-2 text-slate-900 focus:border-indigo-600 shadow-md shadow-blue-500/100   outline-0 border-2 rounded-md mb-4 flex-1"
            placeholder="name"
          />
        </div>

        <input
          style={{ color: "#21475C" }}
          onChange={(e) => handleChange(e)}
          type="email"
          name="email"
          id="email"
          className="email border p-2 text-slate-900 focus:border-indigo-600  shadow-md shadow-blue-500/100  outline-0 border-2 rounded-md  mb-4 w-full"
          placeholder="email"
        />
        <br />
        <input
          style={{ color: "#21475C" }}
          onChange={(e) => handleChange(e)}
          type="password"
          name="password"
          id="password"
          className="password outline-0 border p-2 text-slate-900 focus:border-indigo-600  shadow-md shadow-blue-500/100   border-2 rounded-md  mb-4 w-full outline-violet-500"
          placeholder="password"
        />

        <button
          style={{ color: "#21475C" }}
          type="submit"
          className="border bg-white font-bold p-2 text-slate-900 focus:border-indigo-100 shadow-md shadow-blue-500/100  outline-0 border-2 rounded-md mb-2 mt-8 w-full "
        >
          Login
        </button>
        <GoogleLogin
          clientId="564033717568-bu2nr1l9h31bhk9bff4pqbenvvoju3oq.apps.googleusercontent.com"
          render={(renderProps) => (
            <button
              style={{ width: "100%", color: "#AEBEC1", background: "#D0463B" }}
              // className={classes.googleButton}
              className="border relative bg-white font-bold p-2 text-slate-900 focus:border-indigo-100 shadow-md shadow-blue-500/100  outline-0 border-2 rounded-md mb-2 mt-2 w-full "
              color="primary"
              fullWidth
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
              // startIcon={<Icon />}
              variant="contained"
            >
              <span className="absolute left-8 top-1">
                <AiFillGoogleCircle className="text-3xl" />
              </span>
              <span> Sign In with Google</span>
            </button>
          )}
          onSuccess={googleSuccess}
          onFailure={googleError}
          cookiePolicy="single_host_origin"
        />
        {/* <FacebookLogin
          appId="707710300713123"
          autoLoad={true}
          fields="name,email,picture"
          // onClick={componentClicked}
          callback={responseFacebook}
          cssClass="my-facebook-button-class"
          icon="fa-facebook"
          // className="border bg-white font-bold p-2 text-slate-900 focus:border-indigo-100 shadow-md shadow-blue-500/100  outline-0 border-2 rounded-md mb-2 mt-2 w-full "
          style={{ width: "100%", color: "#AEBEC1", background: "#D0463B" }}
        /> */}
        {/* <button
          style={{ color: "#21475C" }}
          onClick={handleFacebookLogin}
          className="border bg-white font-bold p-2 text-slate-900 focus:border-indigo-100 shadow-md shadow-blue-500/100  outline-0 border-2 rounded-md mb-2 mt-8 w-full "
        >
          Login in with facebook
        </button> */}

        <p className="text-center font-bold underline text-indigo-800 py-3">
          <Link to="/passwordreset">Forgotten password?</Link>
        </p>
        <p className="font-bold text-indigo-900 text-center py-3">
          IF YOU DON'T HAVE AN ACCOUNT,{" "}
          <Link to="/register" className="underline ">
            REGISTER
          </Link>
        </p>
        <Notifications options={{ zIndex: 200, top: "-20px" }} />
      </form>
    </div>
  );
};

export default LoginForm;
