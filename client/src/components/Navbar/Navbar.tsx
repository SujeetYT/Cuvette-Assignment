// import styles from "../styles/navbar.module.css";
import { Link } from "react-router-dom";
import { ImagePaths } from "../../constants/imagePaths.ts";
import styles from "../../styles/Navbar/navbar.module.css"
import Dropdown from "./Dropdown.tsx";
import { useSelector } from "react-redux";
import React, { useEffect } from "react";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = React.useState<boolean>(false);

  const loggedInState:boolean = useSelector((state:any) => state.isLoggedIn.loggedIn);
  useEffect(()=>{
    setIsLoggedIn(loggedInState);
  },[loggedInState])
  
  return (
    <div className={styles.navbar}>
      <div className={styles.cuvetteLogo}>
        <Link to="/">
          <img src={ImagePaths.cuvetteLogo} width="100" alt="Logo" />
        </Link>
      </div>
      <div className={styles.options}>
        <h3 className={styles.contact}>Contact</h3>
        {isLoggedIn && <Dropdown />}
      </div>
    </div>
  );
};

export default Navbar;