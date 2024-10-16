import { Link } from "react-router-dom";
import styles from "../../styles/Dashboard/dashboard.module.css"
import React, { useEffect } from "react";
import { environments } from "../../constants/environments";
import axios from "axios";
import { toast } from "react-toastify";

const renderJobPosts = (interviews: any[])=>{
  return (
    <>
      {interviews.map((jobPost:any, index:number)=>{
        const date = new Date(jobPost.endDate);
        const endDate = date.toISOString().split('T')[0]
        return (
          <div key={index} className={styles.jobPostCard}>
            <div className={styles.jobPostCardTitle}>
              <p>{jobPost.jobTitle}</p>
            </div>
            <div className={styles.jobPostCardDescription}>
              <p>{jobPost?.jobDescription.substring(0, 60)+"..."}</p>
            </div>
            <div className={styles.jobPostCardFooter}>
              <p>{jobPost.experienceLevel}</p>
              <p>{endDate}</p>
            </div>
          </div>
        )
      })}
    </>
  )
}

const HomeDashboard = () => {
  const [interviews, setInterviews] = React.useState<any>([]);

  async function getAllInterviews(){
    try {
      const url = `${environments.serverBaseUrl}/api/dashboard/getInterviews`;
      const header = {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
      const response = await axios.get(url, {headers: header});
      if(response.status === 200) {
        setInterviews(response.data);
      }
      // console.log(response.data);
    } catch (error) {
      toast.error("Unexpected error occurred");
      console.log(error);
    }
  }

  useEffect(() => {
    getAllInterviews();
  }, []);
  return (
    <div className={styles.container}>
      <div>
        <Link to="createJobPost">
          <button className={styles.button} type="submit">Create Interview</button>
        </Link>
      </div>
      <p>Interview Posts: </p>
      <div className={styles.myJobPosts}>
        {interviews.length === 0 ? 
          <div>
            <h3>No Interview Posts Yet</h3>
            <p>Create New One</p>
          </div> 
          : renderJobPosts(interviews)
        }
      </div>
    </div>
  );
};

export default HomeDashboard;