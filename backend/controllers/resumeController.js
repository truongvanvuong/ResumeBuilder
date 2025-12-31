import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import Resume from "../models/Resume.js";

const createResume = async (req, res) => {
  try {
    const { title } = req.body;
    // Default template
    const defaultResumeData = {
      profileInfo: {
        profileImg: null,
        previewUrl: "",
        fullName: "",
        designation: "",
        summary: "",
      },
      contactInfo: {
        email: "",
        phone: "",
        address: "",
        linkedin: "",
        github: "",
        website: "",
      },
      workExperience: [
        {
          company: "",
          role: "",
          startDate: "",
          endDate: "",
          description: "",
        },
      ],
      education: [
        {
          degree: "",
          institution: "",
          startDate: "",
          endDate: "",
        },
      ],
      skills: [
        {
          name: "",
          progress: 0,
        },
      ],
      project: [
        {
          title: "",
          description: "",
          github: "",
          liveDemo: "",
        },
      ],
      crerifcations: [{ title: "", issuer: "", year: "" }],
      languages: [
        {
          name: "",
          progress: "",
        },
      ],
      interests: [""],
    };

    const newResume = await Resume.create({
      userId: req.user._id,
      title,
      ...defaultResumeData,
    });
    res.status(201).json(newResume);
  } catch (error) {
    res.status(500).json({
      message: "Failed to create resume",
      error: error.message,
    });
  }
};

const getUserResumes = async (req, res) => {
  try {
    const resumes = await Resume.find({ userId: req.user._id }).sort({
      updateAt: -1,
    });
    res.json(resumes);
  } catch (error) {
    res.status(500).json({
      message: "Failed to create resume",
      error: error.message,
    });
  }
};

const getResumeById = async (req, res) => {
  try {
    const resume = await Resume.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });
    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }
    res.json(resume);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch resume",
      error: error.message,
    });
  }
};
const updateResume = async (req, res) => {
  try {
    const resume = await Resume.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });
    if (!resume) {
      return res
        .status(404)
        .json({ message: "Resume not found or unauthorized" });
    }
    Object.assign(resume, req.body);
    const saveResume = await resume.save();
    res.json(saveResume);
  } catch (error) {
    res.status(500).json({
      message: "Failed to update resume",
      error: error.message,
    });
  }
};
const deleteResume = async (req, res) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  try {
    const resume = await Resume.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });
    if (!resume) {
      return res
        .status(404)
        .json({ message: "Resume not found or unauthorized" });
    }
    //Delete thumbnailLink and profilePreviewUrl images from upload folder
    const uploadsFolder = path.join(__dirname, "..", "uploads");
    const baseUrl = `${req.protocol}://${req.get("host")}`;

    if (resume.thumbnailLink) {
      const oldThumbnail = path.join(
        uploadsFolder,
        path.basename(resume.thumbnailLink)
      );
      if (fs.existsSync(oldThumbnail)) fs.unlinkSync(oldThumbnail);
    }
    if (resume.profileInfo?.profilePreviewUrl) {
      const oldProfile = path.join(
        uploadsFolder,
        path.basename(resume.profileInfo.profilePreviewUrl)
      );
      if (fs.existsSync(oldProfile)) fs.unlinkSync(oldProfile);
    }
    const deleted = await Resume.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id,
    });
    if (!deleted)
      return res
        .status(404)
        .json({ message: "Resume not found or unauthorized" });
    res.json({ message: "Resume deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete resume",
      error: error.message,
    });
  }
};
export {
  createResume,
  getUserResumes,
  getResumeById,
  updateResume,
  deleteResume,
};
