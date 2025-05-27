import { Link } from "@tanstack/react-router";
import { LucideScrollText } from "lucide-react";

export const Header = () => {
  return (
    <header className="border-grid sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container-wrapper">
        <div className="container flex h-14 items-center gap-2 md:gap-4">
          <div className="mr-4 hidden md:flex">
            <Link to="/" className="mr-4 flex items-center gap-2 lg:mr-6">
              <LucideScrollText />
              <span className="hidden font-bold lg:inline-block">Resuma</span>
            </Link>
          </div>
          {/* <MobileNav /> */}
          {/* <div className="ml-auto flex items-center gap-2 md:flex-1 md:justify-end">
            <nav className="flex items-center text-xl gap-0.5">
              <Button
                asChild
                variant="ghost"
                size="icon"
                className="h-8 w-8 px-0"
              >
                <Link href="#" target="_blank" rel="noreferrer">
                  <span className="sr-only">GitHub</span>
                </Link>
              </Button>
            </nav>
          </div> */}
        </div>
      </div>
    </header>
  );
};
