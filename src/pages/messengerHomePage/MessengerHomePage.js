import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { FiChevronDown } from "react-icons/fi";
import { AiOutlineMail } from "react-icons/ai";
import { BsFillPersonFill } from "react-icons/bs";

import FristPartOfMessenger from "./FristPartOfMessenger";
import SecondPartOfMessenger from "./SecondPartOfMessenger";
import Welcome from "./Welcome";
import { io } from "socket.io-client";
import { useContext } from "react";
import { SocketContext } from "../../context";

const MessengerHomePage = () => {
  const socket = useRef();
  const { authData } = useSelector((state) => state.auth);
  const [currentChatUser, setCurrentChatUser] = useState();

  const { setMe, answerCall, call, callAccepted, setCall, userVideo, setSocket, myVideo } = useContext(SocketContext);

  console.log(currentChatUser);

  const host = "https://library-b.ethical-digit.com";

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("currentChatUser", JSON.stringify(currentChatUser))
  }, [currentChatUser])

  useEffect(() => {
    if (authData !== null) {
      navigate("/");
    } else {
      navigate("/register");
    }
  }, [authData]);

  // useEffect(() => {
  //   if (currentChatUser) {
  //     // setSocket(io("ws://localhost:5000"));
  //     socket.current = io("ws://localhost:5000");
  //   }
  // }, [currentChatUser]);

  useEffect(() => {
    if (authData) {
      socket.current = io(host);
      setSocket(socket)
      socket.current.emit("add-user", authData?._id);

      socket.current.on("welcome", (message) => {
        console.log(message);
        setMe(message);
      });
    }
  }, [authData]);




  useEffect(() => {
    socket.current.on("callUser", ({ from, name: callerName, signal }) => {
      console.log({ isReceivingCall: true, from, name: callerName, signal })
      setCall({ isReceivingCall: true, from, name: callerName, signal });
    });

    socket.current.on('testing', data => {
      console.log(data, 'testing socket')
    })

  }, [socket]);

  const photos = [
    "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  ];

  const handleLogout = () => {
    dispatch({ type: "STARTLOADING" });

    dispatch({ type: "LOGOUT" });
    dispatch({ type: "ENDLOADING" });
  };

  const handleChatUserChange = (currentUser) => {
    setCurrentChatUser(currentUser);
  };

  return (
    <div className="flex min-h-screen">
      <div className="border w-3/12  border-amber-700">
        <FristPartOfMessenger
          currentChatUser={currentChatUser}
          handleChatUserChange={handleChatUserChange}
        />
      </div>
      <div className="flex-1 border border-amber-700">
        {currentChatUser === undefined ? (
        <div>
        <Welcome />
           </div>
        ) : (
          <SecondPartOfMessenger
            socket={socket}
            currentChatUser={currentChatUser}
          />
        )}
      </div>
      <div className="border w-3/12 border-amber-700 text-center py-9">
        <div className="inline-block min-h-[80px]  w-3/12 bg-current rounded-full ring-2 ring-white">
          {/* <h1 className="text-white">{authData.firstName.charAt(0)}</h1> */}
          <img
            className="rounded-full ring-2 ring-white"
            src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          // alt={authData?.result.name.charAt(0)}
          //alt = {authData?.firstName.charAt(0)}
          />
        </div>

        <h1 className="text-[2rem] font-bold my-2">
          {authData?.firstName && authData.firstName}{" "}
          {authData?.lastName && authData.lastName} {authData?.result?.name}
        </h1>
        <div className="border w-11/12 m-auto p-2 flex flex-row">
          <button className="flex justify-between items-center w-full">
            <span>Personal Info</span>
            <FiChevronDown />
          </button>
        </div>
        <div className="border w-11/12 m-auto p-2">
          <div className="flex justify-between items-center w-full py-2">
            <span>
              {authData?.email && authData.email} {authData?.result?.email}
            </span>
            <AiOutlineMail className="text-2xl" />
          </div>
          <div className="flex justify-between items-center w-full py-2">
            <span>
              {authData?._id && authData._id} {authData?.result?.googleId}
            </span>
            <BsFillPersonFill className="text-2xl" />
          </div>
        </div>
        <div className="border w-11/12 m-auto p-2 flex flex-row mt-2">
          <button className="flex justify-between items-center w-full">
            <span>Images ({photos.length})</span>
            <FiChevronDown />
          </button>
        </div>
        <div className="border w-11/12 p-1 mb-2 flex flex-wrap gap-1 justify-center m-auto">
          {photos?.map((detail, index) => (
            <img src={detail} className="w-[3.5rem]" key={index} alt="" />
          ))}
        </div>
        <div className="border w-11/12 m-auto p-2 flex flex-row mt-2">
          <button className="flex justify-between items-center w-full">
            <span>Files ({photos.length})</span>
            <FiChevronDown />
          </button>
        </div>
        <button
          onClick={() => handleLogout()}
          className="w-11/12 my-2 border text-[1.2rem] p-2 font-bold bg-gradient-to-br bg-gradient-to-r from-violet-500 to-fuchsia-500"
        >
          Log out
        </button>
        {(call.isReceivingCall && !callAccepted) && (
          <div>
            {call.name} is calling:
            <button onClick={() => { answerCall(); }}>accept</button>

          </div>
        )}
        {/* <video ref={userVideo} autoPlay playsInline muted={callAccepted} /> */}


      </div>
    </div>
  );
};

export default MessengerHomePage;
