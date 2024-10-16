import { useSelector } from "react-redux";
import OtpVerifyForm from "../components/Signup/OtpVerifyForm";
import SignupForm from "../components/Signup/SignupForm";
import styles from "../styles/Signup/signup.module.css"
import { RootState } from "../redux/store";


const Login = () => {
  const signupState = useSelector((state: RootState) => state.signupState?.state); 
  // console.log("Signup State :: ", signupState);
  
  
  return (
    <div className={styles.screen}>
      <div className={styles.text}>
        <p>Lorem Ipsum is simply dummy text of the printing and  typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley</p>
      </div>
      <div className={styles.form}>
      { signupState === "signup" ? <SignupForm /> : <OtpVerifyForm />}
      </div>
    </div>
  );
};

export default Login;