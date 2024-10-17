import React, { useEffect } from "react";
import { IconPaths } from "../../constants/iconPaths";
import styles from "../../styles/Navbar/dropdown.module.css";

const Dropdown = () => {
  const [name, setName] = React.useState<string | null>("");
  const [icon, setIcon] = React.useState<string | null>("");
  useEffect(()=>{
    if(localStorage.getItem("name")){
      setName(localStorage.getItem("name"));

      const icon: any = name ? name.split(" ")[0].charAt(0).toUpperCase() : "";
      setIcon(icon);
    }
    
  })

  return (
    <div className={styles.options}>
      <span className={styles.icon}>{icon}</span>
      <p>{name}</p>
      <img src={IconPaths.triangleDownFace} width="15" alt="" />
    </div>
  );
};

export default Dropdown;