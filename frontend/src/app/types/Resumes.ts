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
  degree: string;
  institution: string;
  startDate: string;
  endDate: string;
  _id: string;
}

// Kỹ năng
export interface Skill {
  name: string;
  progress: number;
  _id: string;
}

// Ngôn ngữ
export interface Language {
  name: string;
  progress: number;
  _id: string;
}

export interface Project {
  title: string;
  description: string;
  github: string;
  liveDemo: string;
}

// Chứng chỉ (hiện tại mảng rỗng)
export interface Certification {
  title: string;
  issuer: string;
  year: string;
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
  certifications: Certification[];
  created_at: string;
  updated_at: string;
}

export type GetResumesResponse = Resume[];
