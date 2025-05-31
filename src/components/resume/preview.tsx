import { Document, Page } from "react-pdf";
import { useEffect, useState } from "react";
import { createResumePdfBlob } from "@/lib/pdf-blob";
import { Button } from "../ui/button";
import { useDebounce, useLocalStorage, useMeasure } from "@uidotdev/usehooks";
import { useFormContext, useWatch } from "react-hook-form";
import type {
  EducationEntry,
  ExtraSection,
  Resume,
  ResumeLink,
  ResumeSkill,
  WorkExperience,
} from "@/types/form";
import {
  LucideDownload,
  LucideEraser,
  LucideLoader2,
  LucideUser,
} from "lucide-react";
import { dummyResume } from "@/lib/resume-templates";

const PDF_VIEWER_PADDING = 8;
const A4_ASPECT_RATIO = 1 / 1.414; // width / height

export const ResumePreview = () => {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const { control, setValue } = useFormContext<Resume>();
  const [resizeRef, container] = useMeasure();

  // Watch all form fields
  const watchedFormValues = useWatch({ control });

  // Debounce form changes to prevent spamming PDF generation
  const debouncedFormValues = useDebounce(watchedFormValues, 1000);

  const [, setLocalResume] = useLocalStorage<Partial<Resume>>(
    "resume",
    dummyResume
  );

  useEffect(() => {
    const generatePdf = async () => {
      const v = {
        ...debouncedFormValues,
        links: debouncedFormValues.links as ResumeLink[] | undefined,
        educationHistories: debouncedFormValues.educationHistories as
          | EducationEntry[]
          | undefined,
        workHistories: debouncedFormValues.workHistories as
          | WorkExperience[]
          | undefined,
        extraSections: debouncedFormValues.extraSections as
          | ExtraSection[]
          | undefined,
        skills: debouncedFormValues.skills as ResumeSkill[] | undefined,
      };

      setLocalResume(v);

      const blob = await createResumePdfBlob(v);
      const url = URL.createObjectURL(blob);

      if (pdfUrl) {
        URL.revokeObjectURL(pdfUrl);
      }

      setPdfUrl(url);
    };

    generatePdf();

    return () => {
      if (pdfUrl) URL.revokeObjectURL(pdfUrl);
    };
  }, [debouncedFormValues]);

  const [pageWidth, setPageWidth] = useState(0);

  useEffect(() => {
    if (container.width) {
      const adjustedWidth = Math.min(container.width - PDF_VIEWER_PADDING, 800);
      setPageWidth(adjustedWidth);
    }
  }, [container.width]);
  const pageHeight = pageWidth / A4_ASPECT_RATIO;

  return (
    <div className="space-y-5 flex flex-col h-full w-full" ref={resizeRef}>
      <div className="flex flex-row justify-around">
        <Button
          className="self-end"
          variant={"destructive"}
          size="sm"
          onClick={() => {
            setValue("address", "");
            setValue("educationHistories", []);
            setValue("fullName", "");
            setValue("email", "");
            setValue("workHistories", []);
            setValue("links", []);
            setValue("phoneNumber", "");
            setValue("extraSections", []);
            setValue("skills", []);
          }}
        >
          <LucideEraser />
          Reset
        </Button>

        <Button
          className="self-end"
          size="sm"
          onClick={() => {
            for (const [k, v] of Object.entries(dummyResume)) {
              setValue(k as keyof typeof dummyResume, v);
            }
          }}
        >
          <LucideUser />
          Add Dummy
        </Button>

        <Button
          size="sm"
          disabled={!pdfUrl}
          onClick={async (e) => {
            if (!pdfUrl) return;
            e.preventDefault();
            const shouldContinue = window.confirm(
              "If you like this project, please consider starring it on GitHub!\n\nWould you like to continue downloading your resume?"
            );
            if (shouldContinue) {
              // Trigger download
              const link = document.createElement("a");
              link.href = pdfUrl;
              link.download = "resume.pdf";
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);

              window.open("https://github.com/ksamirdev/resuma", "_blank");
            }
          }}
        >
          <LucideDownload /> Export as PDF
        </Button>
      </div>
      <Document
        file={pdfUrl}
        loading={<PDFLoading />}
        error={<div className="min-h-[792px] min-w-[500px] bg-white" />}
        noData={<div className="min-h-[792px] min-w-[500px] bg-white" />}
        onLoadError={(error) => {
          console.error("[ERROR]: Error loading PDF:", error);
        }}
        className="shadow-xl"
      >
        {pageWidth > 0 && (
          <Page
            pageNumber={1}
            width={pageWidth}
            height={pageHeight}
            renderTextLayer={false}
            renderAnnotationLayer={false}
          />
        )}
      </Document>
    </div>
  );
};

const PDFLoading = () => (
  <div className="min-h-[792px] min-w-[600] bg-white flex flex-col items-center justify-center h-full gap-4">
    <div className="flex flex-row items-center gap-5">
      <LucideLoader2 className="animate-spin h-8 w-8 stroke-primary" />

      <div className="flex flex-col">
        <p className="text-muted-foreground font-semibold">Generating PDF</p>
        <p className="text-muted-foreground max-w-md text-xs">
          Please wait while we generate the PDF
        </p>
      </div>
    </div>
  </div>
);
