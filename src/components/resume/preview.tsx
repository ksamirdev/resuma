import { Document, Page } from "react-pdf";
import { useEffect, useState } from "react";
import { createResumePdfBlob } from "@/lib/pdf-blob";
import { Button } from "../ui/button";
import { useDebounce, useMeasure } from "@uidotdev/usehooks";
import { useFormContext, useWatch } from "react-hook-form";
import type {
  EducationEntry,
  ExtraSection,
  Resume,
  ResumeLink,
  WorkExperience,
} from "@/types/form";
import { LucideDownload, LucideEraser, LucideLoader2 } from "lucide-react";

const PDF_VIEWER_PADDING = 10;

export const ResumePreview = () => {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const { control, setValue } = useFormContext<Resume>();
  const [resizeRef, container] = useMeasure();

  // Watch all form fields
  const watchedFormValues = useWatch({ control });
  console.log(watchedFormValues);

  // Debounce form changes to prevent spamming PDF generation
  const debouncedFormValues = useDebounce(watchedFormValues, 1000);

  useEffect(() => {
    const generatePdf = async () => {
      const blob = await createResumePdfBlob({
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
      });
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

  return (
    <div className="space-y-5 flex flex-col h-full w-full" ref={resizeRef}>
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
        <Page
          pageNumber={1}
          width={
            (container.width || 0) > 600
              ? 600 - PDF_VIEWER_PADDING
              : (container.width || 0) - PDF_VIEWER_PADDING
          }
          renderTextLayer={false}
          renderAnnotationLayer={false}
        />
      </Document>

      <div className="flex flex-row justify-around">
        <Button
          className="self-end"
          variant={"destructive"}
          onClick={() => {
            setValue("address", "");
            setValue("educationHistories", []);
            setValue("fullName", "");
            setValue("email", "");
            setValue("workHistories", []);
            setValue("links", []);
            setValue("phoneNumber", "");
            setValue("extraSections", []);
          }}
        >
          <LucideEraser />
          Reset
        </Button>
        <Button
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
