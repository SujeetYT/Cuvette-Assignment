import { Outlet } from "react-router-dom";
import SideBar from "../components/Dashboard/SideBar";
import styles from "../styles/Dashboard/dashboard.module.css";

const Dashboard = () => {
  return (
    <div className={styles.dashboard}>
      <SideBar />
      <Outlet />
    </div>
  );
};

export default Dashboard;