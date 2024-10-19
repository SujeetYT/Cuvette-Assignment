import React, { useEffect } from "react";
import { IconPaths } from "../../constants/iconPaths";
import styles from "../../styles/Signup/signupForm.module.css"
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { environments } from "../../constants/environments";
import { useDispatch } from "react-redux";
import { logIn } from "../../redux/slices/loggedInSlice";

const  OtpVerifyForm = () => {
  const emailOTPRef = React.useRef<HTMLInputElement>(null);
  const mobileOTPRef = React.useRef<HTMLInputElement>(null);
  
  // for green tick
  const [emailVerified, setEmailVerified] = React.useState(false);
  const [mobileVerified, setMobileVerified] = React.useState(false);
  const [showMobileOTP, setShowMobileOTP] = React.useState(true);
  const [title, setTitle] = React.useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();


  const handleEmailOTPSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const emailOTP = emailOTPRef.current?.value;

      const data = {
        "userId": localStorage.getItem("userId"),
        "otp": emailOTP
      }
      // verify email OTP
      const url = `${environments.serverBaseUrl}/api/verifyEmailOTP`;
      const response = await axios.post(url, data);

      if(response.status === 200) {
        toast.success(response?.data.message);
        localStorage.setItem("token", response?.data.token);
        setEmailVerified(true);

        localStorage.removeItem("email");
      }
  
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data.message);
      }else{
        toast.error("An unexpected error occurred");
      }
      
      console.log(error);
      
    }
  }

  const handleMobileOTPSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const mobileOTP = mobileOTPRef.current?.value;
      console.log(mobileOTP);
      const data = {
        "userId": localStorage.getItem("userId"),
        "otp": mobileOTP
      }
      // verify email OTP
      const url = `${environments.serverBaseUrl}/api/verifyPhoneOTP`;
      const response = await axios.post(url, data);

      if(response.status === 200) {
        toast.success(response?.data.message);
        setMobileVerified(true);
      }
      
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data.message);
      }else{
        toast.error("An unexpected error occurred");
      }
      
      console.log(error);
    }
  }

  useEffect(() => {
    if (location.pathname === "/login") {
      setShowMobileOTP(false);
      setMobileVerified(true);
      setTitle("Login");
    } else {
      setTitle("Sign Up");
    }

    return () => {
      setEmailVerified(false);
      setMobileVerified(false);
    }
  }, []);

  // console.log({mobileVerified, showMobileOTP });


  useEffect(() => {
    if (emailVerified && mobileVerified) {
      navigate("/dashboard");
      dispatch(logIn());
    }
  }, [emailVerified, mobileVerified]);

  return (
    <div className={styles.form}>
      <h2>{title}</h2>
      <p className={styles.note}>Lorem Ipsum is simply dummy text</p>
      <div className={styles.formBox}>
        <form method="post">
          <div className={styles.inputField}>
            <img src={IconPaths.mail} alt="icon" />
            <input ref={emailOTPRef} type="number" placeholder="Email OTP" />
            {emailVerified && <img src={IconPaths.greenTick} alt="icon" />}
          </div>
          {emailVerified ? null : <button className={styles.button} type="button" onClick={handleEmailOTPSubmit}>Verify</button>}

          {showMobileOTP && <div className={styles.inputField}>
            <img src={IconPaths.mail} alt="icon" />
            <input ref={mobileOTPRef} type="number" placeholder="Mobile OTP" />
            {mobileVerified && <img src={IconPaths.greenTick} alt="icon" />}
          </div>}
          {showMobileOTP && !mobileVerified && <button className={styles.button} type="button" onClick={handleMobileOTPSubmit}>Verify</button>}
        </form>
      </div>
    </div>
  );
};

export default OtpVerifyForm;
