import transporter from "../utils/mailTransport"

interface Data {
  to: [string];
  subject: string;
  jobTitle: string;
  jobDescription: string;
  experienceLevel: string;
  endDate: string;
}


/**
 * This function is used to send email to the candidates who are shortlisted for the interview
 * @param to - Array of email addresses whom we want to send the email
 * @param subject - Subject of the email
 * @param jobTitle - Job Title for which the candidate is shortlisted
 * @param jobDescription - Job Description for which the candidate is shortlisted
 * @param experienceLevel - Experience Level for which the candidate is shortlisted
 * @param endDate - End Date of the interview
 * @returns - Returns the result of the email sent
*/
async function emailAutomation({to, subject, jobTitle, jobDescription, experienceLevel, endDate}: Data):Promise<any> {
  const mailOptions = {
    from: `Cuvette <${process.env.ETHEREAL_USERNAME}>`,
    to: [...to],
    subject: subject,
    html: `
    <html>
      <body>
        <p>Hi,</p>
        <p>Congratulations, you have been shortlisted for the role of ${jobTitle} for ${experienceLevel}</p>
        <p>Please be prepared youself on ${endDate}</p>
        <p>Job Description: <br/>${jobDescription}</p>
        <br/>
        <p>Please do not reply to this mail this is autogenerated mail.</p>
        <br/>
        <br/>
        <p>Regards,</p>
        <p>Team Cuvette</p>
      </body>
    </html>
    `,
  };

  const result = await transporter.sendMail(mailOptions);
  // console.log(":: debugger point ::", result);
}

export default emailAutomation;