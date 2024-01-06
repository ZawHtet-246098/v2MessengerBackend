import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  registerpage: {
    width: "100vw",
    height: "100vh",
    backgroundSize: "cover",
    background:
      "url(https://i.pinimg.com/originals/cd/9a/7a/cd9a7aee52a3fc5aa5d5ff4369542839.jpg)",
  },
  registerForm: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    background: "rgba(255,255,255,0.5)",
    backdropFilter: "blur(5px)",
    padding: "3rem",
    borderRadius: "1rem",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
}));
