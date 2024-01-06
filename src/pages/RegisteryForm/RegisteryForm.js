import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Notifications, { notify } from "react-notify-toast";
import { register } from "../../actions/auth";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const RegisteryForm = () => {
  const { authData } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (localStorage.getItem("userInfo")) {
      navigate("/");
    }
  }, []);

  let myColor = { background: "#0E1717", text: "#FFFFFF" };

  const handleValidation = () => {
    const { password, confirmPassword, firstName, lastName, email } =
      formValues;

    if (password !== confirmPassword) {
      notify.show(
        "Password and confirm password should be same.",
        "error",
        3000,
        myColor
      );
      return false;
    } else if (firstName.length < 2 || lastName.length < 2) {
      notify.show(
        "Username should be greater than 2 characters",
        "error",
        3000,
        myColor
      );
      return false;
    } else if (password.length < 8) {
      notify.show(
        "Password should be equal or greater than 8 charachers",
        "error",
        3000,
        myColor
      );

      return false;
    } else if (email === "") {
      notify.show("Email is required.", "error", 3000, myColor);
      return false;
    }
    return true;
  };

  const handleChange = (event) => {
    setFormValues({ ...formValues, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    handleValidation();
    if (handleValidation()) {
      const { email, firstName, lastName, password } = formValues;
      // const {data} = await
      dispatch(register({ email, firstName, lastName, password }));
    }
  };

  useEffect(() => {
    if (authData) {
      localStorage.setItem("userInfo", JSON.stringify(authData));
      navigate("/");

      // if (authError) {
      // }
    }
  }, [authData]);

  return (
    <div
      style={{
        backgroundImage:
          "linear-gradient(90deg,rgba(0,0,0,.5) 10%,rgba(0,0,0,.2)),url(https://i.pinimg.com/originals/a6/d8/da/a6d8da82400a7946616368d8426a7faa.jpg)",

        backgroundSize: "contain",
      }}
      className="h-screen pt-20"
    >
      <form
        style={{
          background: "rgba(255,255,255,0.02)",
          backdropFilter: "blur(5px)",
        }}
        onSubmit={(event) => handleSubmit(event)}
        className="w-5/12 border m-auto  px-10  shadow-md shadow-blue-500/100 border-indigo-600"
      >
        <div className="pt-10 pb-8 items-center justify-center flex  gap-2 flex-row">
          <img style={{ width: "100px" }} src="./images/logo1.png" alt="" />
          <h1
            style={{ color: "#AEBEC1" }}
            className="text-4xl font-bold  decoration-white text-center text-white "
          >
            {" "}
            Registery Form
          </h1>
        </div>

        <div className="flex gap-2 ">
          <input
            style={{ color: "#21475C" }}
            onChange={(e) => handleChange(e)}
            type="text"
            name="firstName"
            id="firstName"
            className="firstName focus:border-indigo-600 shadow-md shadow-blue-500/100 border p-2 text-slate-900   outline-0 border-2 rounded-md mb-4 flex-1"
            placeholder="firstName"
          />
          <br />
          <input
            style={{ color: "#21475C" }}
            onChange={(e) => handleChange(e)}
            type="text"
            name="lastName"
            id="lastName"
            className="lastName focus:border-indigo-600 shadow-md shadow-blue-500/100 border p-2 text-slate-900   outline-0 border-2 rounded-md flex-1  mb-4"
            placeholder="lastName"
          />
        </div>

        <input
          style={{ color: "#21475C" }}
          onChange={(e) => handleChange(e)}
          type="email"
          name="email"
          id="email"
          className="email focus:border-indigo-600 shadow-md shadow-blue-500/100 border p-2 text-slate-900   outline-0 border-2 rounded-md  mb-4 w-full"
          placeholder="email"
        />
        <br />
        <input
          style={{ color: "#21475C" }}
          onChange={(e) => handleChange(e)}
          type="password"
          name="password"
          id="password"
          className="password focus:border-indigo-600 shadow-md shadow-blue-500/100 border p-2 text-slate-900   outline-0 border-2 rounded-md  mb-4 w-full"
          placeholder="password"
        />
        <input
          style={{ color: "#21475C" }}
          onChange={(e) => handleChange(e)}
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          className="confirmPassword focus:border-indigo-600 shadow-md shadow-blue-500/100 border p-2 text-slate-900   outline-0 border-2 rounded-md  mb-4 w-full"
          placeholder="confirmPassword"
        />
        <br />
        <button
          style={{ color: "#21475C" }}
          type="submit"
          className="border focus:border-indigo-600 shadow-md shadow-blue-500/100 p-2 text-slate-900  outline-0 border-2 rounded-md mb-2 mt-8 w-full bg-white font-bold "
        >
          Sign up
        </button>
        <p className="font-bold text-indigo-800 text-center py-3">
          IF YOU HAVE AN ACCOUNT,{" "}
          <Link to="/login" className="underline ">
            LOGIN
          </Link>
        </p>
        <Notifications options={{ zIndex: 200, top: "-30px" }} />
      </form>
    </div>
  );
};

export default RegisteryForm;
