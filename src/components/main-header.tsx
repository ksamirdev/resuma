import { Link } from "@tanstack/react-router";
import { LucideScrollText, LucideSun } from "lucide-react";
import { Button } from "./ui/button";
import { Icons } from "./icons";

const MainHeader = () => {
  const handleThemeToggle = () => {
    const body = document.body;
    if (body.classList.contains("dark")) {
      body.classList.remove("dark");
    } else {
      body.classList.add("dark");
    }
  };

  return (
    <header className="border-grid sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container-wrapper">
        <div className="container flex justify-between h-14 items-center gap-2 md:gap-4">
          <div className="mr-4 hidden md:flex">
            <Link to="/" className="mr-4 flex items-center gap-2 lg:mr-6">
              <LucideScrollText />
              <span className="hidden font-bold lg:inline-block">Resuma</span>
            </Link>
          </div>
          <div className="flex flex-row items-center gap-3">
            <Button
              onClick={handleThemeToggle}
              variant="secondary"
              size="icon"
              className="h-8 w-8 px-0"
            >
              <LucideSun />
              <span className="sr-only">Toggle theme</span>
            </Button>

            <Button
              asChild
              variant="secondary"
              size="icon"
              className="h-8 w-8 px-0"
            >
              <a
                href="https://github.com/ksamirdev/resuma"
                target="_blank"
                rel="noreferrer"
              >
                <Icons.gitHub className="h-4 w-4" />
                <span className="sr-only">GitHub</span>
              </a>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default MainHeader;
