import React, { useEffect } from "react";
import { IconPaths } from "../../constants/iconPaths";
import styles from "../../styles/Signup/signupForm.module.css"
import { useNavigate } from "react-router-dom";

const  OtpVerifyForm = () => {
  const emailOTPRef = React.useRef<HTMLInputElement>(null);
  const mobileOTPRef = React.useRef<HTMLInputElement>(null);
  
  // for green tick
  const [emailVerified, setEmailVerified] = React.useState(false);
  const [mobileVerified, setMobileVerified] = React.useState(false);
  const navigate = useNavigate();


  const handleEmailOTPSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const emailOTP = emailOTPRef.current?.value;
    console.log("data", emailOTP);

    // verify email OTP
    setEmailVerified(true);
  }

  const handleMobileOTPSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mobileOTP = mobileOTPRef.current?.value;
    console.log("data", mobileOTP);

    // verify mobile OTP
    setMobileVerified(true);
  }

  useEffect(() => {
    return () => {
      setEmailVerified(false);
      setMobileVerified(false);
    }
  }, []);


  useEffect(() => {
    if (emailVerified && mobileVerified) {
      navigate("/dashboard");
    }
  },[emailVerified, mobileVerified]);

  return (
    <div className={styles.form}>
      <h2>Sign Up</h2>
      <p className={styles.note}>Lorem Ipsum is simply dummy text</p>
      <div className={styles.formBox}>
        <form method="post">
          <div className={styles.inputField}>
            <img src={IconPaths.mail} alt="icon" />
            <input ref={emailOTPRef} type="number" placeholder="Email OTP" />
            {emailVerified && <img src={IconPaths.greenTick} alt="icon" />}
          </div>
          {emailVerified ? null : <button className={styles.button} type="button" onClick={handleEmailOTPSubmit}>Verify</button>}

          <div className={styles.inputField}>
            <img src={IconPaths.mail} alt="icon" />
            <input ref={mobileOTPRef} type="number" placeholder="Mobile OTP" />
            {mobileVerified && <img src={IconPaths.greenTick} alt="icon" />}
          </div>
          {mobileVerified ? null : <button className={styles.button} type="button" onClick={handleMobileOTPSubmit}>Verify</button>}
        </form>
      </div>
    </div>
  );
};

export default OtpVerifyForm;
