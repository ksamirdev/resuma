import { Document, Link, Page, Text, View } from "@react-pdf/renderer";
import { pdfTw } from "./utils";
import type { FC } from "react";
import type { DateRange, Resume } from "@/types/form";

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
  <View style={pdfTw("mb-4")}>
    <View style={pdfTw("flex flex-row items-center mb-2")}>
      <Text style={pdfTw("text-lg font-bold text-primary mr-2")}>{title}</Text>
      <View style={pdfTw("flex-1 h-px bg-gray-300")} />
    </View>
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
      style={pdfTw("p-10 font-sans text-sm text-gray-800 bg-white")}
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
      style={pdfTw("p-8 font-sans text-sm text-gray-800 bg-gray-50")}
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

// --- Minimal Template ---
export const MinimalResumeTemplate: FC<{ data: Partial<Resume> }> = ({
  data,
}) => (
  <Document>
    <Page
      size="A4"
      style={pdfTw("p-12 font-sans text-sm text-gray-800 bg-white")}
    >
      {/* Header */}
      <View style={pdfTw("text-center mb-8")}>
        <Text style={pdfTw("text-3xl font-light tracking-wider mb-1")}>
          {data?.fullName || ""}
        </Text>
        <View style={pdfTw("h-px w-16 bg-gray-400 mx-auto my-2")} />
        <Text style={pdfTw("text-xs text-gray-600 mb-2")}>
          {data?.address || ""}
        </Text>
        <View style={pdfTw("flex flex-row justify-center flex-wrap gap-x-4")}>
          {data?.phoneNumber && (
            <Text style={pdfTw("text-xs")}>{data.phoneNumber}</Text>
          )}
          {data?.email && (
            <Link
              src={`mailto:${data.email}`}
              style={pdfTw("text-xs text-gray-600")}
            >
              {data.email}
            </Link>
          )}
          {data?.links?.map((link, idx) => (
            <Link
              key={idx}
              src={link.url}
              style={pdfTw("text-xs text-gray-600")}
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
            <View key={idx} style={pdfTw("mb-4 text-center")}>
              <Text style={pdfTw("text-sm font-bold")}>{job.title}</Text>
              <Text style={pdfTw("text-xs text-gray-600 mb-1")}>
                {job.company} • {formatDateRange(job.period)} • {job.location}
              </Text>
              <Text style={pdfTw("text-xs text-gray-800")}>{job.summary}</Text>
            </View>
          ))}
        </Section>
      )}

      {/* Education */}
      {data?.educationHistories && data?.educationHistories?.length > 0 && (
        <Section title="EDUCATION">
          {data.educationHistories.map((edu, idx) => (
            <View key={idx} style={pdfTw("mb-4 text-center")}>
              <Text style={pdfTw("text-sm font-bold")}>
                {edu.qualification}
              </Text>
              <Text style={pdfTw("text-xs text-gray-600 mb-1")}>
                {edu.institution} • {formatDateRange(edu.period)} •{" "}
                {edu.location}
              </Text>
              <Text style={pdfTw("text-xs text-gray-800")}>{edu.details}</Text>
            </View>
          ))}
        </Section>
      )}

      {/* Extra Sections */}
      {data?.extraSections?.map((section, idx) => (
        <Section key={idx} title={section.sectionName.toUpperCase()}>
          {section.items.map((item, jdx) => (
            <View key={jdx} style={pdfTw("mb-4 text-center")}>
              <Text style={pdfTw("text-sm font-bold")}>{item.title}</Text>
              <Text style={pdfTw("text-xs text-gray-600 mb-1")}>
                {item.organization} • {formatDateRange(item.period)} •{" "}
                {item.location}
              </Text>
              <Text style={pdfTw("text-xs text-gray-800")}>{item.details}</Text>
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
