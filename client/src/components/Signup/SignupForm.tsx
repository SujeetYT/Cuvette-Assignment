import styles from "../../styles/Signup/signupForm.module.css"
import { IconPaths } from "../../constants/iconPaths";
import React from "react";
import axios from "axios";
import { environments } from "../../constants/environments";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setSignupState } from "../../redux/slices/signupStateSlice";

const LoginForm = () => {
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
      type: "number",
      placeholder: "Phone no.",
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
        dispatch(setSignupState("verify"))
        localStorage.setItem("userId", response?.data.data.id);
        localStorage.setItem("email", response?.data.data.companyEmail);
        localStorage.setItem("name", response?.data.data.name);

        const OtpRequestPayload = {
          "_id": response?.data.data.id,
          "email": response?.data.data.companyEmail
        }

        const sendOtpUrl = `${environments.serverBaseUrl}/api/sendEmailOTP`;
        const res = await axios.post(sendOtpUrl, OtpRequestPayload);
        // const res = {status: 20}
        if (res.status === 200){
          toast.success("OTP sent to your email");
        }else{
          toast.error("Error occured while sending OTP");
        }
        // console.log("User Created Successfully :: ", response.data);
      } else {
        dispatch(setSignupState("signup"))
        toast.error(response?.data.message);
      }

    } catch (error) {
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