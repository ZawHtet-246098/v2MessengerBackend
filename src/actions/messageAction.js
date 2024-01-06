import axios from "axios";
import * as api from "../api";

export const getAllMessages = (currentChatUsers) => async (dispatch) => {
  console.log(currentChatUsers);
  try {
    const { data } = await api.getAllMessages(currentChatUsers);
    console.log("====================================");
    console.log(data);
    console.log("====================================");
    dispatch({ type: "GETALLMESSAGES", data });
  } catch (error) {
    const data = error.response.data;
    console.log("====================================");
    console.log(data);
    console.log("====================================");
  }
};

export const addMessageToDB = (sendMessageData) => async (dispatch) => {
  try {
    console.log(sendMessageData);
    const { data } = await api.sendMessage(sendMessageData);
  } catch (error) {
    const data = error.response.data;
    console.log("====================================");
    console.log(data);
    console.log("====================================");
  }
};
