import { Link } from "react-router-dom";
import styles from "../styles/App/app.module.css";

function App() {
  return (
    <div className={styles.container}>
      <h2>Job Posting Board with Email Automation</h2>
      <Link to="/signup">
        <button className={styles.button}>Sign Up</button>
      </Link>
      <Link to="/login">
        <button className={styles.button}>Login</button>
      </Link>
      <Link to="/dashboard">
        <button className={styles.button}>Dashboard</button>
      </Link>

    </div>
  )
}

export default App
