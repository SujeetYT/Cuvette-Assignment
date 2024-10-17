import { Request, Response } from "express";

import Interview from '../models/interview.model';
import { JwtPayload } from "jsonwebtoken";
import emailAutomation from "../services/emailAutomation";

interface AuthenticatedRequest extends Request {
  user?: string | JwtPayload;
}

const interviewController = {
  create: async (req: AuthenticatedRequest, res: Response):Promise<any> => {
    if (!req.body) {
      res.status(400).send({
        message: 'Form can not be empty!',
      });
      return;
    }

    try {
      const user = req?.user;
      let userId = "";
      if (typeof user !== 'string' && user?.id) {
        userId = user.id;
      }

      const interview = {
        jobTitle: req.body.jobTitle,
        jobDescription: req.body.jobDescription,
        experienceLevel: req.body.experienceLevel,
        candidateEmails: req.body.candidateEmails,
        endDate: req.body.endDate,
        createdBy: userId,
      }
      
      // console.log("Debug Point :: ");
      const newInterview = new Interview(interview);
      const savedInterview = await newInterview.save();
      // console.log("Interview Created :: ", savedInterview);

      // sending email to the candidates who are shortlisted for the interview
      const automatedEmailOptions = {
        to: interview.candidateEmails,
        subject: "Shortlisted for Interview",
        jobTitle: interview.jobTitle,
        jobDescription: interview.jobDescription,
        experienceLevel: interview.experienceLevel,
        endDate: interview.endDate,
      }
      await emailAutomation(automatedEmailOptions)


      res.status(201).json({
        message: "Interview Created Successfully", 
        jobId: savedInterview._id
      });
    } catch (error: any) {
      res.status(500).send({
        message: error?.message || 'Some error occurred while creating the Interview.',
      });
    }
  },
  get: async (req: AuthenticatedRequest, res: Response):Promise<any> => {
    try {
      const user = req?.user;
      let userId = "";
      if (typeof user !== 'string' && user?.id) {
        userId = user.id;
      }
      
      // find all interviews which is created by this id
      const interviews = await Interview.find({createdBy: userId});
      res.status(200).send(interviews);
    } catch (error: any) {
      res.status(500).send({
        message: error?.message || 'Some error occurred while retrieving interviews.',
      });
    }
  }
}


export default interviewController;