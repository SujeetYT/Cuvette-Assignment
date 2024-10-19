import styles from "../../styles/Signup/signupForm.module.css"
import { IconPaths } from "../../constants/iconPaths";
import React from "react";
import axios from "axios";
import { environments } from "../../constants/environments";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setLoginState } from "../../redux/slices/loginStateSlice";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const companyEmailRef = React.useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formFields: any = [
    {
      icon: IconPaths.mail,
      type: "email",
      placeholder: "Company Email",
      ref: companyEmailRef,
    }
  ]

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const data = {
        companyEmail: companyEmailRef.current?.value
      }

      if (!data.companyEmail){
        toast.error("Please fill all the fields");
        return;
      }

      const url = `${environments.serverBaseUrl}/api/login`;
      const response = await axios.post(url, data);
      // console.log("Response :: ", response);
      if (response.status === 200) {
        toast(response?.data.message);
        dispatch(setLoginState("verify"))
        localStorage.setItem("userId", response?.data.data.id);
        localStorage.setItem("name", response?.data.data.name);

        const OtpRequestPayload = {
          "_id": response?.data.data.id,
          "email": response?.data.data.companyEmail
        }

        const sendOtpUrl = `${environments.serverBaseUrl}/api/sendEmailOTP`;
        const res = await axios.post(sendOtpUrl, OtpRequestPayload);
        if (res.status === 200){
          toast.success("OTP sent to your email");
        }else{
          toast.error("Error occured while sending OTP");
        }
      } else {
        dispatch(setLoginState("login"))
        toast.error(response?.data.message);
      }

    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404){
        dispatch(setLoginState("signup"));
        toast.error(error.response?.data.message);
        navigate("/signup");
      }

      console.log("Error :: ", error);
    }

  }


  return (
    <div className={styles.form}>
      <h2>Login</h2>
      <p className={styles.note}>Lorem Ipsum is simply dummy text</p>
      <div className={styles.formBox}>
        <form onSubmit={handleSubmit} method="post">
          {
            formFields.map((field: any, index: number) => (
              <div key={index} className={styles.inputField}>
                <img src={field.icon} alt="icon" />
                <input
                  type={field.type}
                  placeholder={field.placeholder}
                  ref={field.ref}
                />
              </div>
            ))
          }
          <p className={styles.note}>By clicking on proceed you wil accept our</p>
          <p className={styles.termsAndConditions}>
            <span>Terms</span> & <span>Conditions</span>
          </p>
          <button className={styles.button} type="submit">Proceed</button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;