import { Link, useNavigate } from "react-router-dom";
import { IconPaths } from "../../constants/iconPaths";
import styles from "../../styles/Dashboard/sidebar.module.css";

const SideBar = () => {
  const navigate = useNavigate();
  const options:any = [
    {
      name: "Dashboard",
      icon: IconPaths.home,
      link: "/dashboard",
    },
  ]

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("email");
    navigate("/");
  }

  return (
    <div className={styles.sidebar}>
      {options.map((option:any) => (
        <div key={option.name} className={styles.options}>
          <Link to={option.link}>
            <img src={option.icon} alt={option.name} width="30" />
          </Link>
        </div>
      ))}
      <button className={styles.logout} onClick={logout}>
        <img src={IconPaths.logout} width={25}  />
      </button>
    </div>
  );
};

export default SideBar;