import React from "react";
import { useSelector } from "react-redux";

const Welcome = () => {
  const { authData } = useSelector((state) => state.auth);
  return (
    <div className="text-center pt-48">
      <img src="./images/hi-robot.gif" className="w-5/12 m-auto" alt="" />
      <h1 className="text-2xl">
        Welcome, <span>{authData?.firstName}!</span>
      </h1>
      <h3>Please select a chat to Start messaging.</h3>
    </div>
  );
};

export default Welcome;
