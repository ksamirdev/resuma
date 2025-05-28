import { Link } from "@tanstack/react-router";
import { LucideScrollText } from "lucide-react";
import { Button } from "./ui/button";
import { Icons } from "./icons";

const MainHeader = () => {
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

          <Button asChild variant="ghost" size="icon" className="h-8 w-8 px-0">
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
    </header>
  );
};

export default MainHeader;
