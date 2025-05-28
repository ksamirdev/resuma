import { ResumeForm, ResumePreview } from "@/components/resume";
import { cn } from "@/lib/utils";
import type { Resume, ResumeTemplate } from "@/types/form";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { Document, Page } from "react-pdf";

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

          <div className="overflow-y-auto max-h-[85vh] pb-32">
            <div className="mb-6 grid grid-cols-3 gap-5">
              {[
                {
                  label: "Professional",
                  url: "resume-default.pdf",
                  template: "default",
                },
                {
                  label: "Minimal",
                  url: "resume-minimal.pdf",
                  template: "minimal",
                },
                {
                  label: "Modern",
                  url: "resume-modern.pdf",
                  template: "modern",
                },
              ].map((template, idx) => (
                <RenderSampleTemplate
                  label={template.label}
                  template={template.template as ResumeTemplate}
                  file={`${import.meta.env.BASE_URL}/samplepdfs/${
                    template.url
                  }`}
                  key={idx}
                />
              ))}
            </div>

            {/* resume selector */}
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

const RenderSampleTemplate = ({
  file,
  label,
  template,
}: {
  file: string;
  label: string;
  template: ResumeTemplate;
}) => {
  const [numPages, setNumPages] = useState<number>(1);
  const form = useFormContext<Resume>();

  return (
    <div
      className={cn(
        "rounded border shadow overflow-y-auto p-3 pt-0 relative flex flex-col hover:bg-card group",
        template === form.getValues().template && "bg-card"
      )}
      style={{ height: 380 }}
    >
      <div
        className="absolute inset-0 z-[100] cursor-pointer"
        onClick={() => form.setValue("template", template)}
      ></div>

      <span
        className={cn(
          "text-lg font-bold sticky top-0 z-50  w-full group-hover:bg-card py-3",
          template === form.getValues().template && "bg-card"
        )}
      >
        {label}
      </span>

      <Document
        file={file}
        loading={
          <div className="text-center text-muted-foreground">Loading...</div>
        }
        error={
          <div className="text-center text-red-500">Failed to load PDF</div>
        }
        onLoadSuccess={({ numPages }) => setNumPages(numPages)}
        className="w-min"
      >
        {Array.from({ length: numPages }, (_, i) => (
          <Page
            key={i}
            pageNumber={i + 1}
            height={350}
            className="overflow-hidden h-[350px] "
          />
        ))}
      </Document>
    </div>
  );
};
