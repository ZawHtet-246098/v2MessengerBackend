import axios from "axios";

const API = axios.create({ baseURL: "https://library-b.ethical-digit.com" });

export const register = (formValues) => API.post("/user/signup", formValues);

export const login = (loginFormValues) =>
  API.post("/user/login", loginFormValues);

export const loginWithFacebook = () => API.get("/user/facebookAuth");

export const sendEmail = (resetGmail) =>
  API.post("resetPassword/sendmail", resetGmail);

export const otpvalidation = (emailAndotp) =>
  API.post("resetPassword/validateOTP", emailAndotp);

export const changepws = (updatePasswordData) =>
  API.post("resetPassword/changepws", updatePasswordData);

export const getAllUsers = () => API.get("user/getAllUsers");

export const getAllMessages = (currentChatUsers) =>
  API.post("message/getMessages", currentChatUsers);

export const sendMessage = (sendMessageData) =>
  API.post("message/addmessage", sendMessageData);
