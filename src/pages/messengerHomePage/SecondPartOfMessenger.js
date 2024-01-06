import React, { useEffect, useState, useRef, useContext } from "react";
import Avatar from "react-avatar";
import EmojiPicker from "emoji-picker-react";
import VideoCallPage from "../videoCallPage/VideoCallPage";
import { useNavigate } from "react-router-dom";

import { BsFillCameraVideoFill } from "react-icons/bs";
import { BsFillTelephoneFill } from "react-icons/bs";
import { MdError, MdSend } from "react-icons/md";
import { BsPlusLg, BsEmojiSmile } from "react-icons/bs";

import { useDispatch, useSelector } from "react-redux";
import { addMessageToDB, getAllMessages } from "../../actions/messageAction";
import { SocketContext } from "../../context";

const SecondPartOfMessenger = ({ currentChatUser, socket }) => {
  const { authData } = useSelector((state) => state.auth);
  const { messages } = useSelector((state) => state.message);
  const { setMe, answerCall, call, callAccepted, setCall, userVideo, callEnded, myVideo } = useContext(SocketContext);


  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [arrivalMessage, setArrivalMessage] = useState(null);

  const [message, setMessage] = useState();
  const dispatch = useDispatch();
  const scrollRef = useRef();

  const [myMessages, setMyMessages] = useState([]);
  const navigate = useNavigate()
  
  const [openModel, setOpenModel] = useState(false)

  const handleEmojiPickerhideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  useEffect(() => {
    if (messages) {
      setMyMessages([...messages]);
    }
  }, [messages]);

  useEffect(() => {
    const currentChatUsers = {
      from: (authData?._id && authData._id) || authData?.result?.googleId,
      to: currentChatUser?._id,
    };
    dispatch(getAllMessages(currentChatUsers));
  }, [currentChatUser]);

  const handleSendMsg = async (e) => {
    e.preventDefault();
    if (message !== "") {
      socket.current.emit("send-msg", {
        to: currentChatUser?._id,
        from: authData?._id,
        msg: message,
      });

      const sendMessageData = {
        from: authData?._id,
        to: currentChatUser?._id,
        msg: message,
      };
      dispatch(addMessageToDB(sendMessageData));
      // myMessages.push({ fromSelf: true, message: message });
      setMyMessages([...myMessages, { fromSelf: true, message: message }]);

      setMessage("");
      setShowEmojiPicker(false);
    }

    // if (socket.current) {
    //   socket.current.on("msg-recieve", (msg) => {
    //     console.log(msg);
    //     setArrivalMessage({ fromSelf: false, message: msg });
    //   });
    // }
  };

  useEffect(() => {
    // if (socket.current) {
    console.log("i am here");

    socket.current?.on("msg-recieve", (message) => {
      setArrivalMessage({ fromSelf: false, message: message });
    });
    // }
  }, [socket.current]);

  // useEffect(() => {
  //   // if (socket.current) {
  //   console.log("i am here");
  //   socket.on("msg-recieve", (data) => {
  //     console.log(data);

  //     // for (let i = 0; i < this.users.length; i++) {
  //     //   const user = this.users[i];
  //     //   if (user.userID === from) {
  //     //     user.messages.push({
  //     //       content,
  //     //       fromSelf: false,
  //     //     });
  //     //     if (user !== this.selectedUser) {
  //     //       user.hasNewMessages = true;
  //     //     }
  //     //     break;
  //     //   }
  //     // }
  //   });
  //   // }
  // }, [socket.current]);

  useEffect(() => {
    arrivalMessage && setMyMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [myMessages]);

  return (
    <div className="h-screen relative">
      <div className="flex border p-2 itmes-center">
        <Avatar
          size="55"
          round={true}
          // src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          name={`${currentChatUser?.firstName} ${currentChatUser?.lastName}`}
        />

        <div className="pl-3  w-6/12">
          <h1 className="text-2xl font-bold">
            {currentChatUser?.firstName} {currentChatUser?.lastName}
          </h1>
          <p>active now</p>
        </div>

        <div className="flex   w-5/12 flex justify-end items-center">
          <BsFillCameraVideoFill onClick={() => { 
          navigate('./videoCall');
        // setOpenModel(true)
          }} className="text-2xl mx-4  text-[#3C2F95]" />
          <BsFillTelephoneFill className="text-2xl mx-4 text-[#3C2F95]" />
          <MdError className="text-2xl mx-4 text-[#3C2F95]" />
        </div>
      </div>
      <div className="h-[79%] scrollParent px-2 overflow-y-scroll">
        {myMessages?.map((detail, index) => (
          <div ref={scrollRef} key={index}>
            <div
              className={`message ${detail.fromSelf ? "sended" : "recieved"}`}
            >
              <div className="content ">
                <p>{detail.message}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <form action="" onSubmit={(e) => handleSendMsg(e)}>
        <div className=" px-3 flex items-center focus:outline-none mx-3">
          <BsPlusLg className="text-3xl mx-3 text-[#3C2F95]" />
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            type="text"
            className="w-full border-slate-500 border rounded p-3 outline-0"
          />
          <div className="flex">
            <div className="relative">
              <BsEmojiSmile
                onClick={handleEmojiPickerhideShow}
                className="text-3xl mx-3 text-[#3C2F95]"
              />
              <div
                style={{ top: "-460px", left: "-350px" }}
                className="absolute"
              >
                {showEmojiPicker && (
                  <EmojiPicker
                    style={{ background: "#E8DEFF" }}
                    // onEmojiClick={handleEmojiClick}
                    onEmojiClick={(emojiObject) =>
                      setMessage((prevMsg) => prevMsg + emojiObject.emoji)
                    }
                  />
                )}
              </div>
            </div>

            <MdSend
              onClick={(e) => handleSendMsg(e)}
              className="text-3xl mx-3  text-[#3C2F95]"
            />
          </div>
        </div>
      </form>
      {
        call?.isReceivingCall && (
          <div className="bg-black w-[80%] h-[80%] absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] text-white">
            {/* <div className="videoCallPopedUpChild"> */}
            {/* <VideoCallPage /> */}
            {/* </div> */}
            <h1> {call?.name} one is calling you!</h1>
            <button onClick={() => { 
            navigate('./videoCall');
            // openModel(true)
            }}>Answer</button>
          </div>
        )
      }
     
    </div>
  );
};

export default SecondPartOfMessenger;
