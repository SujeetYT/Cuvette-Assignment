import { IconPaths } from "../../constants/iconPaths";
import styles from "../../styles/Navbar/dropdown.module.css";

const Dropdown = () => {
  const name = "Sujeet Kumar";

  const icon: any = name.split(" ")[0].charAt(0).toUpperCase();

  return (
    <div className={styles.options}>
      <span className={styles.icon}>{icon}</span>
      <p>{name}</p>
      <img src={IconPaths.triangleDownFace} width="15" alt="" />
    </div>
  );
};

export default Dropdown;