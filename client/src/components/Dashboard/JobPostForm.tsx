import React, { useState } from "react";
import styles from "../../styles/Dashboard/dashboard.module.css"
import TagInputBox from "./TagInputBox";

import { RefObject } from "react";
import { environments } from "../../constants/environments";
import axios from "axios";
import { toast } from "react-toastify";

interface FormField {
  label: string,
  placeholder: string,
  inputType: string,
  options?: string[],
  ref?: RefObject<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
}

const renderInputField = (field: FormField, setAllTags:any, ref:any) => {
  switch (field.inputType) {
    case "textarea":
      return <textarea ref={ref} rows={3} placeholder={field.placeholder} />;
    case "select":
      return (
        <select ref={ref}>
          {field?.options?.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      );
    case "date":
      return <input ref={ref} type={field.inputType} placeholder={field.placeholder} />;
    case "email":
      return <TagInputBox type={field.inputType} placeholder={field.placeholder} setAllTags={setAllTags}/>;
    default:
      return <input ref={ref} type={field.inputType} placeholder={field.placeholder} />;
  }
};

const JobPostForm = () => {
  const titleRef = React.useRef<HTMLInputElement>(null);
  const descriptionRef = React.useRef<HTMLTextAreaElement>(null);
  const experienceRef = React.useRef<HTMLSelectElement>(null);
  const endDateRef = React.useRef<HTMLInputElement>(null);
  const [allTags, setAllTags] = useState<string[]>([]); // candidate emails


  const formFields:FormField[] = [
    {
      label: "Job Title",
      placeholder: "Enter Job Title",
      inputType: "text",
      ref: titleRef
    },
    {
      label: "Job Description",
      placeholder: "Enter Job Description",
      inputType: "textarea",
      ref: descriptionRef
    },
    {
      label: "Experience Level",
      placeholder: "Select Experience Level",
      inputType: "select",
      options: ["Entry Level", "Mid Level", "Senior Level"],
      ref: experienceRef
    },
    {
      label: "Add Candidate",
      placeholder: "Enter email and press enter",
      inputType: "email",
    },
    {
      label: "End Date",
      placeholder: "Select A Date",
      inputType: "date",
      ref: endDateRef
    }
  ]
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // send to the server
      const createInterviewPayload = {
        jobTitle: titleRef.current?.value,
        jobDescription: descriptionRef.current?.value,
        experienceLevel: experienceRef.current?.value,
        candidateEmails: allTags,
        endDate: endDateRef.current?.value
      }
      // verify email OTP
      const url = `${environments.serverBaseUrl}/api/dashboard/createInterview`;
      const header = {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      }

      console.log("createInterviewPayload", createInterviewPayload);
      
      const response = await axios.post(url, createInterviewPayload, header);
  
      if(response.status === 201) {
        toast.success(response?.data.message);
        console.log(response?.data.message);
      }

    } catch (error) {      
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data.message);
        
      } else {
        toast.error("An unexpected error occurred");
      }

      console.log("Error :: ", error);
    }

  }

  return (
    <div className={styles.formBox}>
      <form onSubmit={handleSubmit}>
        {
          formFields.map((field:any, index:any)=>{
            return (
              <div key={index} className={styles.fields}>
                <label>{field.label}</label>
                {
                  renderInputField(field, setAllTags, field.ref)
                }
              </div>
            )
          })
        }
        <div className={styles.buttonRight}>
          <button type="submit" className={styles.button}>Send</button>
        </div>
      </form>
    </div>
  );
};

export default JobPostForm;