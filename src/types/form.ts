export type ResumeTemplate = "default" | "modern" | "minimal";

export type Resume = {
  template: ResumeTemplate;
  fullName: string;
  email: string;
  phoneNumber: string;
  address: string;
  links: ResumeLink[];
  workHistories: WorkExperience[];
  educationHistories: EducationEntry[];
  extraSections: ExtraSection[];
};

export type ResumeLink = {
  label: string;
  url: string;
};

export type WorkExperience = {
  title: string;
  company: string;
  period: DateRange;
  location: string;
  summary: string;
};

export type EducationEntry = {
  institution: string;
  qualification: string;
  period: DateRange;
  location: string;
  details: string;
};
export type ExtraSection = {
  sectionName: string;
  items: ExtraSectionItem[];
};

export type ExtraSectionItem = {
  title: string;
  organization: string;
  period: DateRange;
  location: string;
  details: string;
};

export type DateRange = {
  from: Date;
  to: Date;
};
