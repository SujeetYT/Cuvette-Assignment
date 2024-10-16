import { Link } from "react-router-dom";
import { IconPaths } from "../../constants/iconPaths";
import styles from "../../styles/Dashboard/sidebar.module.css";

const SideBar = () => {
  const options:any = [
    {
      name: "Dashboard",
      icon: IconPaths.home,
      link: "/dashboard",
    },
  ]

  return (
    <div className={styles.sidebar}>
      {options.map((option:any) => (
        <div key={option.name} className={styles.options}>
          <Link to={option.link}>
            <img src={option.icon} alt={option.name} width="30" />
          </Link>
        </div>
      ))}
    </div>
  );
};

export default SideBar;