import OtpVerifyForm from "../components/Signup/OtpVerifyForm";
import SignupForm from "../components/Signup/SignupForm";
import styles from "../styles/Signup/signup.module.css"

const Login = () => {
  const state:any = "verify" // "signup" || "verify";
  return (
    <div className={styles.screen}>
      <div className={styles.text}>
        <p>Lorem Ipsum is simply dummy text of the printing and  typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley</p>
      </div>
      <div className={styles.form}>
      { state === "verify" ? <SignupForm /> : <OtpVerifyForm />}
      </div>
    </div>
  );
};

export default Login;