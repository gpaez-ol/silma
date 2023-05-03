import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

//MaterialUI
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

//Components
import { WhiteButton } from "../components/Button";
import Logo from "../img/Logo.png";

export default function Login(classes: any) {
  classes = useStyles();

  const API_URL = "http://localhost:3000/local/";

  //State
  const [values, setValues] = useState({
    email: "",
    password: "",
    showPassword: false,
  });

  const { email, password, showPassword } = values;

  const handleChange =
    (name: any) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [name]: e.target.value });
    };

  const navigate = useNavigate();

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(API_URL + "login", {
        email,
        password,
      });

      console.log(data);

      setValues({ email: "", password: "", showPassword: false });
      toast.success("Login succesfully!");
      console.log("Login succesfully!");
      navigate("/");
    } catch (err) {
      console.log("Login fail!");
      toast.error("Login fail!");
    }
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (e: { preventDefault: () => void }) => {
    e.preventDefault();
  };

  return (
    <div className={classes.backgroundContainer}>
      <div className={classes.overlay}>
        <img className={classes.logoImg} src={Logo}></img>
        <div className={classes.formContainer}>
          <div style={{ display: "flex" }}>
            <input
              type="text"
              placeholder="Correo electrónico"
              className={classes.userInput}
              onChange={handleChange("email")}
              value={email}
            />
          </div>

          <div className={classes.passwordContainer}>
            <input
              type={values.showPassword ? "text" : "password"}
              placeholder="Contraseña"
              className={classes.passwordInput}
              onChange={handleChange("password")}
              value={password}
            />
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
            >
              {values.showPassword ? (
                <Visibility style={{ color: "white" }} />
              ) : (
                <VisibilityOff style={{ color: "white" }} />
              )}
            </IconButton>
          </div>
          <div>
            <WhiteButton onClick={handleSubmit}>Iniciar sesión</WhiteButton>
          </div>
        </div>
      </div>
      <div className={classes.footerBlue}></div>
      <div className={classes.footerRed}></div>
      <div className={classes.footerGreen}></div>
      <div className={classes.footerPurple}></div>
    </div>
  );
}

//Styles
const useStyles = makeStyles(() => ({
  backgroundContainer: {
    minWidth: "100vw",
    minHeight: "100vh",
  },
  overlay: {
    width: "100vw",
    height: "95vh",
    //backgroundImage: 'linear-gradient(to bottom, rgba(249, 238, 236,1)0%, rgba(249, 238, 236,1)50%, rgba(249, 238, 236,1)100%)',
    justifyContent: "space-evenly",
    margin: "auto",
    display: "flex",
    flexDirection: "column",
  },
  logoImg: {
    maxWidth: "35%",
    height: "auto",
    padding: 0,
    margin: 0,
    transform: "translate(20%, -10%)",
  },
  formContainer: {
    position: "absolute",
    left: "50%",
    margin: "auto",
    padding: "50px",
    width: "30%",
    maxWidth: "400px",
    borderRadius: "25px",
    boxShadow: "0 3px 5px 2px rgba(32,40,67,1)",
    backgroundImage:
      "linear-gradient(to bottom, rgba(223,31,38,1)0%, rgba(223,31,38,1)50%, rgba(223,31,38,1)100%)",
  },
  passwordInput: {
    flex: "1",
    width: "100%",
    padding: "15px",
    outline: "none",
    borderRadius: "25px",
    border: "none",
    background: "none",
    color: "white",
    fontSize: "18px",
    "&::placeholder": {
      color: "rgba(255,255,255,0.75)",
    },
  },
  userInput: {
    width: "100%",
    padding: "15px",
    outline: "none",
    borderRadius: "25px",
    border: "none",
    marginBottom: "20px",
    background: "rgba(255,255,255,0.25)",
    color: "white",
    fontSize: "18px",
    "&::placeholder": {
      color: "rgba(255,255,255,0.75)",
    },
  },
  passwordContainer: {
    display: "flex",
    width: "100%",
    background: "rgba(255,255,255,0.25)",
    borderRadius: "25px",
    border: "none",
    marginBottom: "20px",
  },
  link: {
    color: "white",
    "&:hover": {
      color: "white",
    },
    fontSize: "15px",
  },
  line: {
    textAlign: "center",
    borderTop: "1px solid white",
  },
  footerBlue: {
    position: "absolute",
    margin: "auto",
    paddingBottom: "40px",
    width: "100%",
    maxWidth: "25vw",
    boxShadow: "0 3px 5px 2px rgba(32,40,67,1)",
    backgroundImage:
      "linear-gradient(to bottom, rgba(16, 95, 158,1)0%, rgba(16, 95, 158,1)50%, rgba(16, 95, 158,1)100%)",
  },
  footerRed: {
    position: "absolute",
    left: "25%",
    margin: "auto",
    paddingBottom: "40px",
    width: "100%",
    maxWidth: "25vw",
    boxShadow: "0 3px 5px 2px rgba(32,40,67,1)",
    backgroundImage:
      "linear-gradient(to bottom, rgba(223,31,38,1)0%, rgba(223,31,38,1)50%, rgba(223,31,38,1)100%)",
  },
  footerGreen: {
    position: "absolute",
    left: "50%",
    margin: "auto",
    paddingBottom: "40px",
    width: "100%",
    maxWidth: "25vw",
    boxShadow: "0 3px 5px 2px rgba(32,40,67,1)",
    backgroundImage:
      "linear-gradient(to bottom, rgba(195, 208, 46,1)0%, rgba(195, 208, 46,1)50%, rgba(195, 208, 46,1)100%)",
  },
  footerPurple: {
    position: "absolute",
    left: "75%",
    margin: "auto",
    paddingBottom: "40px",
    width: "100%",
    maxWidth: "25vw",
    boxShadow: "0 3px 5px 2px rgba(32,40,67,1)",
    backgroundImage:
      "linear-gradient(to bottom, rgba(144, 64, 213,1)0%, rgba(144, 64, 213,1)50%, rgba(144, 64, 213,1)100%)",
  },
}));