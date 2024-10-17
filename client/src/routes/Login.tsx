import { useSelector } from "react-redux";
import OtpVerifyForm from "../components/Signup/OtpVerifyForm";
import LoginForm from "../components/Login/LoginForm";
import styles from "../styles/Signup/signup.module.css"
import { RootState } from "../redux/store";
import React, { useEffect } from "react";


const Login = () => {
  const [loginState, setLoginState] = React.useState<string>("login");
  const loginStateFromRedux = useSelector((state: RootState) => state.loginState?.state); 
  // console.log("loginStateFromRedux :: ", loginStateFromRedux);
  
  useEffect(()=>{
    setLoginState(loginStateFromRedux);
  },[loginStateFromRedux])
  
  return (
    <div className={styles.screen}>
      <div className={styles.text}>
        <p>Lorem Ipsum is simply dummy text of the printing and  typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley</p>
      </div>
      <div className={styles.form}>
      { loginState === "login" ? <LoginForm /> : <OtpVerifyForm />}
      </div>
    </div>
  );
};

export default Login;