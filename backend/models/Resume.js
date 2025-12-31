import mongoose from "mongoose";

const ResumeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    title: { type: String, required: true },
    thumbnail: { type: String, default: null },
    template: { type: String, colorPalette: [String] },
    profileInfo: {
      profliePreivewUrl: String,
      fullName: String,
      designation: String,
      summary: String,
    },
    contactInfo: {
      email: String,
      phone: Number,
      address: String,
      linkedin: String,
      github: String,
      website: String,
    },
    workExperience: [
      {
        company: String,
        role: String,
        startDate: Date,
        endDate: Date,
        designation: String,
      },
    ],
    education: [
      {
        degree: String,
        institution: String,
        startDate: Date,
        endDate: Date,
      },
    ],
    skills: [
      {
        name: String,
        progerss: Number,
      },
    ],
    projects: [
      {
        title: String,
        description: String,
        github: String,
        liveDemo: String,
      },
    ],
    certifications: [
      {
        title: String,
        issuer: String,
        year: String,
      },
    ],
    languages: [
      {
        name: String,
        progerss: Number,
      },
    ],
    interests: [String],
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);
export default mongoose.model("Resume", ResumeSchema);
