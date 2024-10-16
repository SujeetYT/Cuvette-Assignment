import { Request, Response } from "express";
import { get } from "http";

const Interview = require('../models/interview.model');

const interviewController = {
  create: async (req: Request, res: Response) => {
    if (!req.body) {
      res.status(400).send({
        message: 'Form can not be empty!',
      });
      return;
    }

    try {
      // console.log("Request Body :: ", req.body);
      const interview = {
        jobTitle: req.body.jobTitle,
        jobDescription: req.body.jobDescription,
        experienceLevel: req.body.experienceLevel,
        candidateEmails: req.body.candidateEmails,
        endDate: req.body.endDate,
        // createdBy: req.body.createdBy,
      }
      
      // console.log("Debug Point :: ");
      const newInterview = new Interview(interview);
      const savedInterview = await newInterview.save();
      // console.log("Interview Created :: ", savedInterview);
      
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

  get: async (req: Request, res: Response) => {
    try {
      // userId = req.cookies.userId;
      const interviews = await Interview.find();
      res.status(200).send(interviews);
    } catch (error: any) {
      res.status(500).send({
        message: error?.message || 'Some error occurred while retrieving interviews.',
      });
    }
  }
}


module.exports = interviewController;