import { Document, Link, Page, Text, View } from "@react-pdf/renderer";
import { pdfTw } from "./utils";
import type { FC } from "react";
import type { DateRange, Resume } from "@/types/form";

export const dummyResume: Partial<Resume> = {
  template: "minimal",
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
  skills: [
    {
      label: "Languages",
      value: "Python, JavaScript, SQL, TypeScript, Go",
    },
    {
      label: "Frontend",
      value: "React.js, Next.js, HTML5, CSS3, TailwindCSS, Zustand, Websockets",
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

// Helper to format date ranges
function formatDateRange(period?: DateRange): string {
  if (!period?.from) return "Present";
  const from = new Date(period.from);
  const to = period.to ? new Date(period.to) : null;

  const fromStr = from.toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
  const toStr = to
    ? to.toLocaleDateString("en-US", { month: "short", year: "numeric" })
    : "Present";

  return `${fromStr} - ${toStr}`;
}

// Common section component
const Section: FC<{ title: string; children: React.ReactNode }> = ({
  title,
  children,
}) => (
  <View style={pdfTw("mb-3")}>
    <Text
      style={pdfTw(
        "text-xs font-bold tracking-wider text-gray-500 mb-2 uppercase border-b border-gray-200 pb-1",
      )}
    >
      {title}
    </Text>
    {children}
  </View>
);

// Experience item component
const ExperienceItem: FC<{
  title: string;
  subtitle: string;
  period?: DateRange;
  location?: string;
  details?: string;
}> = ({ title, subtitle, period, location, details }) => (
  <View style={pdfTw("mb-3")}>
    <View style={pdfTw("flex flex-row justify-between")}>
      <Text style={pdfTw("font-bold")}>{title}</Text>
      {period && (
        <Text style={pdfTw("text-gray-600 text-xs")}>
          {formatDateRange(period)}
        </Text>
      )}
    </View>
    <View style={pdfTw("flex flex-row justify-between")}>
      <Text style={pdfTw("text-sm text-gray-700")}>{subtitle}</Text>
      {location && (
        <Text style={pdfTw("text-xs text-gray-500")}>{location}</Text>
      )}
    </View>
    {details && (
      <Text style={pdfTw("text-xs mt-1 text-gray-800 leading-relaxed")}>
        {details}
      </Text>
    )}
  </View>
);

// --- Professional Template ---
export const ProfessionalResumeTemplate: FC<{ data: Partial<Resume> }> = ({
  data,
}) => (
  <Document>
    <Page
      size="A4"
      style={pdfTw("p-10 font-default text-sm text-gray-800 bg-white")}
    >
      {/* Header */}
      <View style={pdfTw("mb-6")}>
        <Text style={pdfTw("text-3xl font-bold text-primary mb-1")}>
          {data?.fullName || ""}
        </Text>
        <Text style={pdfTw("text-sm text-gray-600 mb-2")}>
          {data?.address || ""}
        </Text>
        <View style={pdfTw("flex flex-row flex-wrap gap-x-4")}>
          {data?.phoneNumber && (
            <Text style={pdfTw("text-xs")}>{data.phoneNumber}</Text>
          )}
          {data?.email && (
            <Link
              src={`mailto:${data.email}`}
              style={pdfTw("text-xs text-blue-600")}
            >
              {data.email}
            </Link>
          )}
          {data?.links?.map((link, idx) => (
            <Link
              key={idx}
              src={link.url}
              style={pdfTw("text-xs text-blue-600")}
            >
              {link.label}
            </Link>
          ))}
        </View>
      </View>

      {/* Work Experience */}
      {data?.workHistories && data?.workHistories.length > 0 && (
        <Section title="WORK EXPERIENCE">
          {data.workHistories.map((job, idx) => (
            <ExperienceItem
              key={idx}
              title={job.title}
              subtitle={job.company}
              period={job.period}
              location={job.location}
              details={job.summary}
            />
          ))}
        </Section>
      )}

      {/* Education */}
      {data?.educationHistories && data?.educationHistories.length > 0 && (
        <Section title="EDUCATION">
          {data.educationHistories.map((edu, idx) => (
            <ExperienceItem
              key={idx}
              title={edu.qualification}
              subtitle={edu.institution}
              period={edu.period}
              location={edu.location}
              details={edu.details}
            />
          ))}
        </Section>
      )}

      {/* Skills */}
      {data?.skills && data?.skills.length > 0 && (
        <Section title="SKILLS">
          {data.skills.map((skill, idx) => (
            <Text key={idx} style={pdfTw("text-sm pb-1")}>
              <Text style={pdfTw("font-bold")}>{skill.label}</Text>:{" "}
              {skill.value}
            </Text>
          ))}
        </Section>
      )}

      {/* Extra Sections */}
      {data?.extraSections?.map((section, idx) => (
        <Section key={idx} title={section.sectionName.toUpperCase()}>
          {section.items.map((item, jdx) => (
            <ExperienceItem
              key={jdx}
              title={item.title}
              subtitle={item.organization}
              period={item.period}
              location={item.location}
              details={item.details}
            />
          ))}
        </Section>
      ))}
    </Page>
  </Document>
);

// --- Modern Template ---
export const ModernResumeTemplate: FC<{ data: Partial<Resume> }> = ({
  data,
}) => (
  <Document>
    <Page
      size="A4"
      style={pdfTw("p-8 font-default text-sm text-gray-800 bg-gray-50")}
    >
      {/* Two-column layout */}
      <View style={pdfTw("flex flex-row")}>
        {/* Left sidebar */}
        <View style={pdfTw("w-1/3 pr-4")}>
          {/* Profile */}
          <View style={pdfTw("mb-6")}>
            <Text style={pdfTw("text-2xl font-bold text-primary mb-1")}>
              {data?.fullName || ""}
            </Text>
            <Text style={pdfTw("text-xs text-gray-600")}>
              {data?.address || ""}
            </Text>
          </View>

          {/* Contact */}
          {data?.phoneNumber ||
          data?.email ||
          (data?.links?.length ?? 0) > 0 ? (
            <View style={pdfTw("mb-6")}>
              <Text style={pdfTw("text-sm font-bold mb-2 text-primary")}>
                CONTACT
              </Text>
              {data?.phoneNumber && (
                <Text style={pdfTw("text-xs mb-1")}>{data.phoneNumber}</Text>
              )}
              {data?.email && (
                <Link
                  src={`mailto:${data.email}`}
                  style={pdfTw("text-xs text-blue-600 mb-1")}
                >
                  {data.email}
                </Link>
              )}
              {data?.links?.map((link, idx) => (
                <Link
                  key={idx}
                  src={link.url}
                  style={pdfTw("text-xs text-blue-600 block mb-1")}
                >
                  {link.label}
                </Link>
              ))}
            </View>
          ) : null}

          {/* Skills */}
          {data?.skills && data?.skills.length > 0 && (
            <Section title="SKILLS">
              {data.skills.map((skill, idx) => (
                <View key={idx} style={pdfTw("text-sm flex flex-col pb-2")}>
                  <Text style={pdfTw("font-bold")}>{skill.label}</Text>:
                  <Text>{skill.value}</Text>
                </View>
              ))}
            </Section>
          )}
        </View>

        {/* Right content */}
        <View style={pdfTw("w-2/3 pl-4 border-l border-gray-200")}>
          {/* Work Experience */}
          {data?.workHistories && data?.workHistories?.length > 0 && (
            <Section title="EXPERIENCE">
              {data.workHistories.map((job, idx) => (
                <ExperienceItem
                  key={idx}
                  title={job.title}
                  subtitle={job.company}
                  period={job.period}
                  location={job.location}
                  details={job.summary}
                />
              ))}
            </Section>
          )}

          {/* Education */}
          {data?.educationHistories && data?.educationHistories?.length > 0 && (
            <Section title="EDUCATION">
              {data.educationHistories.map((edu, idx) => (
                <ExperienceItem
                  key={idx}
                  title={edu.qualification}
                  subtitle={edu.institution}
                  period={edu.period}
                  location={edu.location}
                  details={edu.details}
                />
              ))}
            </Section>
          )}

          {/* Extra Sections */}
          {data?.extraSections?.map((section, idx) => (
            <Section key={idx} title={section.sectionName.toUpperCase()}>
              {section.items.map((item, jdx) => (
                <ExperienceItem
                  key={jdx}
                  title={item.title}
                  subtitle={item.organization}
                  period={item.period}
                  location={item.location}
                  details={item.details}
                />
              ))}
            </Section>
          ))}
        </View>
      </View>
    </Page>
  </Document>
);

export const MinimalResumeTemplate: FC<{ data: Partial<Resume> }> = ({
  data,
}) => (
  <Document>
    <Page
      size="A4"
      style={pdfTw("p-12 font-default text-sm text-gray-800 bg-white")}
    >
      {/* Header */}
      <View style={pdfTw("text-center mb-10")}>
        <Text style={pdfTw("text-3xl  font-bold tracking-wider leading-[1.5]")}>
          {data?.fullName || ""}
        </Text>
        <View style={pdfTw("h-px w-20 bg-gray-300 mx-auto my-2")} />
        <Text style={pdfTw("text-xs text-gray-600 mb-3 tracking-wide")}>
          {data?.address || ""}
        </Text>
        <View
          style={pdfTw(
            "flex flex-row justify-center flex-wrap gap-x-4 gap-y-1",
          )}
        >
          {data?.phoneNumber && (
            <Text style={pdfTw("text-xs tracking-wide")}>
              {data.phoneNumber}
            </Text>
          )}
          {data?.email && (
            <Link
              src={`mailto:${data.email}`}
              style={pdfTw("text-xs text-gray-600 tracking-wide")}
            >
              {data.email}
            </Link>
          )}
          {data?.links?.map((link, idx) => (
            <Link
              key={idx}
              src={link.url}
              style={pdfTw("text-xs text-gray-600 tracking-wide")}
            >
              {link.label}
            </Link>
          ))}
        </View>
      </View>

      {/* Work Experience */}
      {data?.workHistories && data?.workHistories?.length > 0 && (
        <Section title="EXPERIENCE">
          {data.workHistories.map((job, idx) => (
            <View key={idx} style={pdfTw("mb-3")}>
              <View
                style={pdfTw("flex flex-row justify-between items-baseline")}
              >
                <Text style={pdfTw("text-sm font-semibold")}>{job.title}</Text>
                <Text style={pdfTw("text-xs text-gray-500")}>
                  {formatDateRange(job.period)}
                </Text>
              </View>
              <View
                style={pdfTw("flex flex-row justify-between items-baseline")}
              >
                <Text style={pdfTw("text-xs font-medium text-gray-600")}>
                  {job.company} • {job.location}
                </Text>
              </View>
              {job.summary && (
                <Text style={pdfTw("text-xs text-gray-800 mt-2 leading-5")}>
                  {job.summary}
                </Text>
              )}
            </View>
          ))}
        </Section>
      )}

      {/* Education */}
      {data?.educationHistories && data?.educationHistories?.length > 0 && (
        <Section title="EDUCATION">
          {data.educationHistories.map((edu, idx) => (
            <View key={idx} style={pdfTw("mb-3")}>
              <View
                style={pdfTw("flex flex-row justify-between items-baseline")}
              >
                <Text style={pdfTw("text-sm font-semibold")}>
                  {edu.qualification}
                </Text>
                <Text style={pdfTw("text-xs text-gray-500")}>
                  {formatDateRange(edu.period)}
                </Text>
              </View>
              <View
                style={pdfTw("flex flex-row justify-between items-baseline")}
              >
                <Text style={pdfTw("text-xs font-medium text-gray-600")}>
                  {edu.institution} • {edu.location}
                </Text>
              </View>
              {edu.details && (
                <Text style={pdfTw("text-xs text-gray-800 mt-2 leading-5")}>
                  {edu.details}
                </Text>
              )}
            </View>
          ))}
        </Section>
      )}

      {data?.skills && data?.skills?.length > 0 && (
        <Section title="SKILLS">
          {data.skills.map((skill, idx) => (
            <Text key={idx} style={pdfTw("text-sm pb-1")}>
              <Text style={pdfTw("font-bold")}>{skill.label}</Text>:{" "}
              {skill.value}
            </Text>
          ))}
        </Section>
      )}

      {/* Extra Sections */}
      {data?.extraSections?.map((section, idx) => (
        <Section key={idx} title={section.sectionName.toUpperCase()}>
          {section.items.map((item, jdx) => (
            <View key={jdx} style={pdfTw("mb-3")}>
              <View
                style={pdfTw("flex flex-row justify-between items-baseline")}
              >
                <Text style={pdfTw("text-sm font-semibold")}>{item.title}</Text>
                <Text style={pdfTw("text-xs text-gray-500")}>
                  {formatDateRange(item.period)}
                </Text>
              </View>
              <View
                style={pdfTw("flex flex-row justify-between items-baseline")}
              >
                <Text style={pdfTw("text-xs font-medium text-gray-600")}>
                  {item.organization} • {item.location}
                </Text>
              </View>
              {item.details && (
                <Text style={pdfTw("text-xs text-gray-800 mt-2 leading-5")}>
                  {item.details}
                </Text>
              )}
            </View>
          ))}
        </Section>
      ))}
    </Page>
  </Document>
);

// Template selector
export function getResumeTemplateComponent(data: Partial<Resume>) {
  switch (data.template) {
    case "modern":
      return <ModernResumeTemplate data={data} />;
    case "minimal":
      return <MinimalResumeTemplate data={data} />;
    default:
      return <ProfessionalResumeTemplate data={data} />;
  }
}
