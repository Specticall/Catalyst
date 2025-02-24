import { cn } from "@/utils/lib";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavbarAuthButton from "./NavbarAuthButton";

export default function Navbar() {
  const [show, setShow] = useState(true);
  const navigate = useNavigate();
  const prevScroll = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > prevScroll.current) {
        setShow(false);
      } else {
        setShow(true);
      }
      prevScroll.current = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={cn(
        "fixed left-0 right-0 top-0 bg-dark/50 backdrop-blur-2xl z-50 transition-all duration-300 -translate-y-[100%]",
        show && "-translate-y-0"
      )}
    >
      <nav
        className={
          "flex items-center justify-between px-12  max-w-[1200px] mx-auto py-4"
        }
      >
        <div
          className="flex items-center cursor-pointer gap-1.5 hover:opacity-75 transition duration-100"
          onClick={() => navigate("/")}
        >
          <div className="p-1 flex items-center justify-center">
            <Icon icon={"iconoir:spark"} className="text-3xl text-white" />
          </div>
          <p className="text-xl text-white">Catalyst</p>
        </div>
        <div className="flex gap-6 items-center">
          <a href="https://github.com/Specticall/Catalyst" target="_blank">
            <Icon
              icon={"mdi:github"}
              className="text-4xl text-white hover:opacity-60 transition duration-100 cursor-pointer"
            />
          </a>
          <NavbarAuthButton />
        </div>
      </nav>
    </div>
  );
}
