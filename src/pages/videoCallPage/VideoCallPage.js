

import React, { useContext, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { SocketContext } from "../../context";
import './style.css'

import { ImPhoneHangUp } from 'react-icons/im'
import { BiMicrophone } from 'react-icons/bi'
import { BsFillCameraVideoFill } from 'react-icons/bs'
import { FaExpandArrowsAlt } from 'react-icons/fa'
import { AiFillSetting } from 'react-icons/ai'

import { io } from "socket.io-client";

const VideoCallPage = () => {
  const { name, callAccepted, myVideo, userVideo, callEnded, stream, call, callUser, setStream, socket, answerCall } =
    useContext(SocketContext);
  const { authData } = useSelector((state) => state.auth);

  // const socket = useRef();

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        setStream(currentStream);
        console.log(myVideo?.current, 'myVideo.current')
        console.log(myVideo, 'myVideo')
        console.log(currentStream)
        if(call?.isReceivingCall) {
          answerCall(currentStream);
      }
        if (currentStream) {
          myVideo.current.srcObject = currentStream;

          
        }
      });
  }, []);



  // const roomId = 'heowie';
  // const host = "http://localhost:5000";

  // useEffect(() => {
  //   socket.current = io(host);

  //   socket.current.emit("join-room", roomId, 'zaw');

  //   socket.current.on('user-connected', userId => {
  //     console.log('User connected' + userId);
  //   })
  // }, [])

  const currentChatUser = JSON.parse(localStorage.getItem('currentChatUser'))

  useEffect(() => {
    if (!callAccepted) {

      callUser(currentChatUser?._id, authData?._id)

    }

  }, [currentChatUser])


  console.log(myVideo);
  console.log(stream)
  console.log(currentChatUser?._id)


  return (
    <div style={{ minHeight: "100%", maxWidth: '100%', zIndex: '100' }} className="flex videoCallPopedUp">
      <div className="border-r-2 w-8/12 flex gap-5 justify-center">
        {/* {stream && ( */}
        <div className=" w-10/12 min-h-96 max-h-110 rounded mt-4 relative">
          <div style={{ width: '60px', position: 'absolute', top: '6px', left: '9px' }} className="inline-block min-h-[30px] rounded-full ring-2 ring-white">
            <img
              className="rounded-full ring-2 ring-white"
              src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt={authData?.result?.name.charAt(0)}
            // alt={authData?.firstName.charAt(0)}
            />
          </div>
          <h3 style={{ position: 'absolute', top: '0', left: '70px', fontSize: '1.5rem' }} className="text-white font-bold p-3">{authData?.firstName && authData.firstName}{" "}
            {authData?.lastName && authData.lastName} {authData?.result?.name}</h3>
          <video
            playsInline
            muted 
            ref={myVideo && myVideo}
            autoPlay
            style={{ width: '100%', height: '89%', zIndex: '10000', borderRadius: '10px' }}
          // className={classes.video}
          />
          

          <div className="text-center mt-2 flex items-center justify-center gap-4">

            <button style={{ width: "40px", height: '40px', background: '#151924', fontSize: '1.2rem', borderRadius: '50%' }} className="p-2 text-white"><BiMicrophone style={{ margin: '0', marginLeft: '.18rem' }} /></button>
            <button style={{ width: "40px", height: '40px', background: '#151924', fontSize: '1.2rem', borderRadius: '50%' }} className="p-2 text-white"><BsFillCameraVideoFill style={{ margin: '0', marginLeft: '.1rem' }} /></button>
            <button style={{ width: "55px", height: '53px', background: '#FF0000', fontSize: '2.2rem', borderRadius: '5px' }} className="p-1 text-white"><ImPhoneHangUp style={{ margin: '0', marginLeft: '.3rem' }} /></button>
            <button style={{ width: "40px", height: '40px', background: '#151924', fontSize: '1.2rem', borderRadius: '50%' }} className="p-2 text-white"><FaExpandArrowsAlt style={{ margin: '0', marginLeft: '.2rem' }} /></button>
            <button style={{ width: "40px", height: '40px', background: '#151924', fontSize: '1.2rem', borderRadius: '50%' }} className="p-2 text-white"><AiFillSetting style={{ margin: '0', marginLeft: '.2rem' }} /></button>


          </div>
        </div>
        {/* )} */}
        {/* <div className="border w-5/12 min-h-96 max-h-96 mt-12">other</div> */}
      </div>
      <div className=" w-4/12 text-center">For chatting part
      {callAccepted && !callEnded && (
            <>
              <h1>accepted call</h1>

              <video playsInline ref={userVideo} autoPlay style={{ width: '100%', height: '89%', zIndex: '10000', borderRadius: '10px' }} />
            </>

          )}
      </div>
    </div>
  );
};

export default VideoCallPage;
