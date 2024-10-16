import styles from  "../../styles/Signup/signupForm.module.css"
import { IconPaths } from "../../constants/iconPaths";
import React from "react";
import axios from "axios";
import { environments } from "../../constants/environments";

const LoginForm = () => {
  const nameRef = React.useRef<HTMLInputElement>(null);
  const phoneRef = React.useRef<HTMLInputElement>(null);
  const companyNameRef = React.useRef<HTMLInputElement>(null);
  const companyEmailRef = React.useRef<HTMLInputElement>(null);
  const companySizeRef = React.useRef<HTMLInputElement>(null);

  const formFields:any = [
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

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    const data = {
      name: nameRef.current?.value || "",
      phone: phoneRef.current?.value || "",
      companyName: companyNameRef.current?.value || "",
      companyEmail: companyEmailRef.current?.value || "",
      companySize: companySizeRef.current?.value || "",
    }

    // console.log("Data: ", data);
    // post data to server
    const url = `${environments.serverBaseUrl}/signup`;
    console.log("URL ::", url);
    
    const response = await axios.post(url, data);
    console.log("Response ::", response);
  
  }


  return (
    <div className={styles.form}>
      <h2>Sign Up</h2>
      <p className={styles.note}>Lorem Ipsum is simply dummy text</p>
      <div className={styles.formBox}>
        <form onSubmit={handleSubmit} method="post">
          {
            formFields.map((field:any, index:number) => (
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