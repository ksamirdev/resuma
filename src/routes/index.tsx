import { ResumeForm, ResumePreview } from "@/components/resume";
import { createFileRoute } from "@tanstack/react-router";

import { FormProvider, useForm } from "react-hook-form";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const methods = useForm({
    defaultValues: {
      name: "Jordan Smith",
      email: "jordan.smith@email.com",
      phone: "(555) 123-4567",
      social: {
        LinkedIn: "https://linkedin.com/in/jordansmith",
        Portfolio: "https://jordansmith.dev",
      },
      location: "New Delhi, India",
    },
    reValidateMode: "onChange",
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
