// Thông tin cơ bản của profile
export interface ProfileInfo {
  profileImg: string;
  previewUrl: string;
  fullName: string;
  designation: string;
  summary: string;
}

// Thông tin liên hệ
export interface ContactInfo {
  email: string;
  phone: number;
  address: string;
  linkedin: string;
  github: string;
  website: string;
}

// Kinh nghiệm làm việc
export interface WorkExperience {
  company: string;
  role: string;
  startDate: string | null; // ISO string hoặc null
  endDate: string | null;
  description: string;
  _id: string;
}

// Học vấn
export interface Education {
  major: string;
  degree: string;
  institution: string;
  startDate: string;
  endDate: string;
  _id: string;
}

// Kỹ năng
export interface Skill {
  name: string;
  level?: string;
  _id: string;
}

export interface Reference {
  fullName: string;
  company: string;
  email: string;
  phone: string;
  _id?: string;
}

// Ngôn ngữ
export interface Language {
  name: string;
  level: string;
  _id: string;
}

export interface Project {
  name: string;
  description: string;
  github: string;
  liveDemo: string;
  _id: string;
}

// Chứng chỉ (hiện tại mảng rỗng)
export interface certification {
  name: string;
  issuer: string;
  year: string;
  _id: string;
}

// Một bản resume hoàn chỉnh
export interface Resume {
  profileInfo: ProfileInfo;
  contactInfo: ContactInfo;
  _id: string;
  userId: string;
  title: string;
  thumbnail: string | null;
  workExperience: WorkExperience[];
  education: Education[];
  skills: Skill[];
  languages: Language[];
  interests: string[];
  projects: Project[];
  certifications: certification[];
  references?: Reference[];
  created_at: string;
  updated_at: string;
}

export interface ResumeResponse {
  success: boolean;
  message: string;
  data: Resume;
}
export type GetResumesResponse = Resume[];
