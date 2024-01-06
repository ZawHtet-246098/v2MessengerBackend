import React, { useEffect } from "react";
import RegisteryForm from "./pages/RegisteryForm/RegisteryForm";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import LoginForm from "./pages/RegisteryForm/LoginForm";
import { ToastContainer } from "react-toastify";
import MessengerHomePage from "./pages/messengerHomePage/MessengerHomePage";
import VideoCallPage from "./pages/videoCallPage/VideoCallPage";

import ForgetPassword from "./pages/RegisteryForm/ForgetPassword";
import OTPSubmitForm from "./pages/RegisteryForm/OTPSubmitForm";
import ChangePws from "./pages/RegisteryForm/ChangePws";
import Loading from "./pages/loading/Loading";
import { useSelector, useDispatch } from "react-redux";

const App = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  console.log(loading);

  // useEffect(() => {
  //   setTimeout(() => {
  //     dispatch({ type: "STARTLOADIN" });
  //   }, 1000);
  //   dispatch({ type: "ENDLOADING" });
  // }, []);

  return (
    <BrowserRouter>
      {loading && <Loading />}
      <Routes>
        <Route path="/" element={<MessengerHomePage />} />
        <Route path="/videoCall" element={<VideoCallPage />} />
        <Route path="/register" element={<RegisteryForm />}></Route>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/passwordreset" element={<ForgetPassword />} />
        <Route path="/passwordreset/otp" element={<OTPSubmitForm />} />
        <Route path="/passwordreset/changepws" element={<ChangePws />} />
      </Routes>
      {/* {window.loading && <Loading />} */}
    </BrowserRouter>
  );
};

export default App;
