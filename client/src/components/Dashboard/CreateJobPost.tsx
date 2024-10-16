import styles from "../../styles/Dashboard/dashboard.module.css"
import JobPostForm from "./JobPostForm";


const CreateJobPost = () => {
  return (
    <div className={styles.container}>
      <h1 style={{textAlign: "center"}}>Create Job Post</h1>
      <JobPostForm />
    </div>
  );
};

export default CreateJobPost;