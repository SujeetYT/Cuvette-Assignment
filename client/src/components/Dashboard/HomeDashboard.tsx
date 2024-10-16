import { Link } from "react-router-dom";
import styles from "../../styles/Dashboard/dashboard.module.css"

const renderJobPosts = (myJobPosts: any[])=>{
  return (
    <>
      {myJobPosts.map((jobPost:any, index:number)=>{
        return (
          <div key={index} className={styles.jobPostCard}>
            <div className={styles.jobPostCardTitle}>
              <p>{jobPost.title}</p>
            </div>
            <div className={styles.jobPostCardDescription}>
              <p>{jobPost?.description.substring(0, 60)+"..."}</p>
            </div>
            <div className={styles.jobPostCardFooter}>
              <p>{jobPost.experienceLevel}</p>
              <p>{jobPost.endDate}</p>
            </div>
          </div>
        )
      })}
    </>
  )
}

const HomeDashboard = () => {
  const myJobPosts:any[] = [
    {
      title: "Software Engineer",
      description: "Software Engineer Description lorem ipsum doller sit ammet",
      experienceLevel: "Mid Level",
      endDate: "2022-12-12"
    },
  ]
  return (
    <div className={styles.container}>
      <div>
        <Link to="createJobPost">
          <button className={styles.button} type="submit">Create Interview</button>
        </Link>
      </div>
      <p>Interview Posts: </p>
      <div className={styles.myJobPosts}>
        {myJobPosts.length === 0 ? 
          <div>
            <h3>No Interview Posts Yet</h3>
            <p>Create New One</p>
          </div> 
          : renderJobPosts(myJobPosts)
        }
      </div>
    </div>
  );
};

export default HomeDashboard;