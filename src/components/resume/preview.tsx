import { Document, Page } from "react-pdf";
import { useEffect, useState } from "react";
import { createResumePdfBlob } from "@/lib/pdf-blob";
import { Button } from "../ui/button";
import { useDebounce } from "@uidotdev/usehooks";
import { useFormContext, useWatch } from "react-hook-form";
import type { ResumeT } from "@/types/form";
import { LucideDownload, LucideEraser } from "lucide-react";

export const ResumePreview = () => {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const { control } = useFormContext<ResumeT>();

  // Watch all form fields
  const watchedFormValues = useWatch({ control });

  // Debounce form changes to prevent spamming PDF generation
  const debouncedFormValues = useDebounce(watchedFormValues, 1000);

  useEffect(() => {
    const generatePdf = async () => {
      const blob = await createResumePdfBlob(debouncedFormValues);
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
    <div className="space-y-5 flex flex-col h-full w-full">
      <Document
        file={pdfUrl}
        loading={<div className="min-h-[707px] min-w-[500px] bg-white" />}
        error={<div className="min-h-[707px] min-w-[500px] bg-white" />}
        noData={<div className="min-h-[707px] min-w-[500px] bg-white" />}
        onLoadError={(error) => {
          console.error("[ERROR]: Error loading PDF:", error);
        }}
        className="shadow-lg z-50"
      >
        <Page
          pageNumber={1}
          width={500}
          renderTextLayer={false}
          renderAnnotationLayer={false}
        />
      </Document>

      <div className="flex flex-row justify-around">
        <Button className="self-end" variant={"destructive"}>
          <LucideEraser />
          Reset
        </Button>
        <Button className="self-end">
          <LucideDownload /> Export as PDF
        </Button>
      </div>
    </div>
  );
};
