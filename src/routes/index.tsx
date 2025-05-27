import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="grid grid-cols-3">
      <div className="space-y-2">
        <h1 className="scroll-m-20 text-3xl font-bold tracking-tight">
          Free Resume Builder
        </h1>

        <p className="text-base text-muted-foreground">
          Build your resume fast, free, and the right way. Clean, simple, and
          made to impress recruiters.
        </p>
      </div>
    </div>
  );
}
