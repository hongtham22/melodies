"use client";
import { Button } from "@/components/ui/button";
import { ArrowUpIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";

function ScrollButton() {
  const [isVisible, setIsVisible] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 150) {
        setIsVisible(true);
      } else {
        setIsVisible(true);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <div>
      {isVisible && (
        <Button
          onClick={scrollToTop}
          className="fixed bottom-16 right-8 h-12 w-12 rounded-full bg-primaryColorBlueHover shadow-md shadow-primaryColorPink z-50"
        >
          <ArrowUpIcon className="h-8 w-8" />
        </Button>
      )}
    </div>
  );
}

export default ScrollButton;
