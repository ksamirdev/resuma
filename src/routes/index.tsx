import { ResumeForm, ResumePreview } from "@/components/resume";
import { createFileRoute } from "@tanstack/react-router";
import { FormProvider, useForm } from "react-hook-form";

export const Route = createFileRoute("/")({
  component: Index,
});

const initialValues = {
  template: "modern",
  fullName: "Jordan Smith",
  email: "jordan.smith@email.com",
  phoneNumber: "(555) 123-4567",
  address: "123 Main St, New Delhi, India",
  links: [
    { label: "LinkedIn", url: "https://linkedin.com/in/jordansmith" },
    { label: "GitHub", url: "https://github.com/jordansmith" },
    { label: "Portfolio", url: "https://jordansmith.dev" },
    { label: "Twitter", url: "https://twitter.com/jordansmith" },
  ],
  workHistories: [
    {
      title: "Frontend Developer",
      company: "Tech Solutions",
      period: { from: new Date("2021-01-01"), to: new Date("2023-06-01") },
      location: "Remote",
      summary:
        "Developed and maintained web applications using React and TypeScript.",
    },
    {
      title: "UI Engineer",
      company: "Creative Minds",
      period: { from: new Date("2019-05-01"), to: new Date("2020-12-31") },
      location: "Bangalore, India",
      summary: "Designed and implemented user interfaces for SaaS products.",
    },
    {
      title: "Software Engineer Intern",
      company: "NextGen Apps",
      period: { from: new Date("2018-06-01"), to: new Date("2018-08-31") },
      location: "Delhi, India",
      summary:
        "Assisted in developing mobile applications and performed QA testing.",
    },
  ],
  educationHistories: [
    {
      institution: "Indian Institute of Technology",
      qualification: "B.Tech in Computer Science",
      period: { from: new Date("2015-08-01"), to: new Date("2019-05-01") },
      location: "Delhi, India",
      details: "Graduated with First Class Honors.",
    },
    {
      institution: "Delhi Public School",
      qualification: "High School Diploma",
      period: { from: new Date("2013-06-01"), to: new Date("2015-05-01") },
      location: "Delhi, India",
      details: "Science stream with Computer Science.",
    },
  ],
  extraSections: [
    {
      sectionName: "Certifications",
      items: [
        {
          title: "AWS Certified Developer",
          organization: "Amazon Web Services",
          period: {
            from: new Date("2022-03-01"),
            to: new Date("2022-03-01"),
          },
          location: "Online",
          details: "Credential ID: ABCD-1234",
        },
        {
          title: "Google Associate Cloud Engineer",
          organization: "Google",
          period: {
            from: new Date("2021-07-01"),
            to: new Date("2021-07-01"),
          },
          location: "Online",
          details: "Credential ID: GCP-5678",
        },
      ],
    },
    {
      sectionName: "Volunteer Experience",
      items: [
        {
          title: "Mentor",
          organization: "Code for Good",
          period: {
            from: new Date("2020-01-01"),
            to: new Date("2021-01-01"),
          },
          location: "Delhi, India",
          details: "Mentored students in web development.",
        },
        {
          title: "Event Organizer",
          organization: "TechFest",
          period: {
            from: new Date("2017-09-01"),
            to: new Date("2017-12-01"),
          },
          location: "IIT Delhi",
          details: "Organized annual technology festival.",
        },
      ],
    },
    {
      sectionName: "Awards",
      items: [
        {
          title: "Best Project Award",
          organization: "IIT Delhi",
          period: {
            from: new Date("2019-04-01"),
            to: new Date("2019-04-01"),
          },
          location: "Delhi, India",
          details: "Awarded for final year project on AI.",
        },
      ],
    },
  ],
};

function Index() {
  const methods = useForm({
    defaultValues: initialValues,
  });

  return (
    <FormProvider {...methods}>
      <div className="grid grid-cols-5 gap-10 ">
        <div className="flex flex-col gap-4 col-span-3 ">
          <div className="space-y-2 bg-background">
            <h1 className="scroll-m-20 text-3xl font-bold tracking-tight">
              Free Resume Builder
            </h1>
            <p className="text-base text-muted-foreground">
              Build your resume fast, free, and the right way. Clean, simple,
              and made to impress recruiters.
            </p>
          </div>

          <div className="overflow-y-auto max-h-[80vh] pb-32">
            <ResumeForm />
          </div>
        </div>

        <div className="col-span-2">
          <ResumePreview />
        </div>
      </div>
    </FormProvider>
  );
}
