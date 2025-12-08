import { ArrowUp } from "lucide-react";

export function Footer() {
  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <div className="mb-6">
      <div className="flex max-md:flex-col justify-between items-center max-md:gap-2 py-10 border-gray-800 border-t">
        <div className="flex flex-col gap-1 text-center md:text-left">
          <p className="text-muted-foreground text-base">
            &copy; {new Date().getFullYear()} Tanzir Hossain. All rights reserved.
          </p>
          
        </div>
        <button
          className="flex items-center gap-2 w-fit text-muted-foreground text-base cursor-pointer hover:text-primary transition-colors duration-200"
          onClick={scrollToTop}
        >
          Elevate to the top
          <ArrowUp size={20} />
        </button>
      </div>
    </div>
  );
}
