import styles from "../../styles/Signup/signupForm.module.css"
import { IconPaths } from "../../constants/iconPaths";
import React from "react";
import axios from "axios";
import { environments } from "../../constants/environments";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setSignupState } from "../../redux/slices/signupStateSlice";

const SignupForm = () => {
  const nameRef = React.useRef<HTMLInputElement>(null);
  const phoneRef = React.useRef<HTMLInputElement>(null);
  const companyNameRef = React.useRef<HTMLInputElement>(null);
  const companyEmailRef = React.useRef<HTMLInputElement>(null);
  const companySizeRef = React.useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();

  const formFields: any = [
    {
      icon: IconPaths.person,
      type: "text",
      placeholder: "Name",
      ref: nameRef,
    },
    {
      icon: IconPaths.phone,
      type: "tel",
      placeholder: "+91-XXXXXXXXXX",
      ref: phoneRef,
    },
    {
      icon: IconPaths.person,
      type: "text",
      placeholder: "Company Name",
      ref: companyNameRef,
    },
    {
      icon: IconPaths.mail,
      type: "email",
      placeholder: "Company Email",
      ref: companyEmailRef,
    },
    {
      icon: IconPaths.groups,
      type: "number",
      placeholder: "Company Size",
      ref: companySizeRef,
    }
  ]

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const data = {
        name: nameRef.current?.value || "",
        phoneNumber: phoneRef.current?.value.toString() || "",
        companyName: companyNameRef.current?.value || "",
        companyEmail: companyEmailRef.current?.value || "",
        companySize: Number(companySizeRef.current?.value) || 0,
      }

      const url = `${environments.serverBaseUrl}/api/signup`;
      const response = await axios.post(url, data);
      // console.log("Response :: ", response);
      if (response.status === 201) {
        toast(response?.data.message);
        localStorage.setItem("userId", response?.data.data.id);
        localStorage.setItem("email", response?.data.data.companyEmail);
        localStorage.setItem("name", response?.data.data.name);


        // sending OTP to email
        const EmailOtpRequestPayload = {
          "_id": response?.data.data.id,
          "email": response?.data.data.companyEmail
        }

        const sendEmailOtpUrl = `${environments.serverBaseUrl}/api/sendEmailOTP`;
        const emailOtpResponse = await axios.post(sendEmailOtpUrl, EmailOtpRequestPayload);
        // const res = {status: 20}
        if (emailOtpResponse.status === 200){
          toast.success("OTP sent to your email");
        }else{
          toast.error("Error occured while sending email OTP");
        }


        // sending OTP to phone number
        const MobileOtpRequestPayload = {
          "_id": response?.data.data.id,
          "phoneNumber": data.phoneNumber
        }

        const sendMobileOtpUrl = `${environments.serverBaseUrl}/api/sendPhoneOTP`;
        const mobileOtpResponse = await axios.post(sendMobileOtpUrl, MobileOtpRequestPayload);
        // const res = {status: 20}
        if (mobileOtpResponse.status === 200){
          console.log("Mobile OTP :: ", mobileOtpResponse?.data.otp);
          let mobileOTP = mobileOtpResponse?.data.otp;
          
          toast.success("OTP sent to your mobile");
          alert(`We are using free tier SMS service, so OTP may not be sent to your mobile. Please use the below OTP for verification. \n\nMobile OTP : ${mobileOTP}`);
        }else{
          toast.error("Error occured while sending mobile OTP");
        }


        dispatch(setSignupState("verify"))
      } else {
        dispatch(setSignupState("signup"))
        toast.error(response?.data.message);
      }

    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An unexpected error occurred");
      }

      console.log("Error :: ", error);
    }

  }


  return (
    <div className={styles.form}>
      <h2>Sign Up</h2>
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
          <div id="recaptcha-container"></div>
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

export default SignupForm;