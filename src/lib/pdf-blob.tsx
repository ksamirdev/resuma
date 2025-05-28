import type { Resume } from "@/types/form";
import { pdf, Font } from "@react-pdf/renderer";
import { getResumeTemplateComponent } from "./resume-templates";

Font.register({
  family: "EBGaramond",
  fonts: [
    {
      src: `${import.meta.env.BASE_URL}/fonts/garamond/EBGaramond-Regular.ttf`,
      fontStyle: "normal",
      fontWeight: "normal",
    },
    {
      src: `${import.meta.env.BASE_URL}/fonts/garamond/EBGaramond-Italic.ttf`,
      fontStyle: "italic",
      fontWeight: "normal",
    },
    {
      src: `${import.meta.env.BASE_URL}/fonts/garamond/EBGaramond-Bold.ttf`,
      fontStyle: "normal",
      fontWeight: "bold",
    },
    {
      src: `${
        import.meta.env.BASE_URL
      }/fonts/garamond/EBGaramond-BoldItalic.ttf`,
      fontStyle: "italic",
      fontWeight: "bold",
    },
    {
      src: `${import.meta.env.BASE_URL}/fonts/garamond/EBGaramond-SemiBold.ttf`,
      fontStyle: "normal",
      fontWeight: "semibold",
    },
    {
      src: `${
        import.meta.env.BASE_URL
      }/fonts/garamond/EBGaramond-SemiBoldItalic.ttf`,
      fontStyle: "italic",
      fontWeight: "semibold",
    },
  ],
});

export const createResumePdfBlob = async (data: Partial<Resume>) => {
  const pdfDocument = getResumeTemplateComponent(data);

  const blob = await pdf(pdfDocument).toBlob();
  return blob;
};
