import Button from "@/components/ui/Button";
import { Icon } from "@iconify/react/dist/iconify.js";
import heroUI from "/images/landing/hero-ui.png";
import heroGlow from "/images/landing/hero-glow.png";
import heroCircle from "/images/landing/hero-circle.png";
import heroGrid from "/images/landing/hero-grid.png";
import heroParticles from "/images/landing/hero-particles.png";
import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();
  return (
    <div className="overflow-x-hidden">
      <section className="max-w-[1400px] mx-auto  text-center px-8 mt-42">
        <div className="py-16 flex flex-col items-center justify-center ">
          <div className="flex border border-accent-highlight/50 rounded-full gap-4 px-2.5 pr-4 py-2 items-center justify-center">
            <p className="bg-accent-highlight text-lg text-white px-4 rounded-full">
              New
            </p>
            <p className="text-primary text-lg">Version 0.1 is out for FREE!</p>
            <Icon icon={"maki:arrow"} className="text-secondary " />
          </div>
          <h1 className="mt-6 bg-gradient-to-b from-0% to-60% from-[#7c7c7c] to-primary text-transparent bg-clip-text text-[5rem] max-w-[60rem] leading-[115%]">
            The API Development Collaboration Platform.
          </h1>
          <p className="text-primary/75 text-xl mt-6 text-md font-normal">
            The low cost, open source and performant postman alternative
          </p>
          <div className="mt-10 relative">
            <Button
              className="hover:opacity-75 transition duration-100 text-md font-normal relative z-[10] cursor-pointer px-12 rounded-lg"
              variant={"hollow-accent"}
              onClick={() => navigate("/login")}
            >
              Get Started
            </Button>
            <Button
              className="absolute inset-0 blur-[5px] text-md font-normal"
              variant={"hollow-accent"}
            >
              Get Started
            </Button>
          </div>
        </div>
        <div className="relative mt-10 px-12">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-t from-dark to-transparent"></div>
            <img src={heroUI} alt="ui" />
            <img
              src={heroCircle}
              alt="glow-ui"
              className="absolute -top-[60%] z-[-1] translate-x-[-50%] left-[50%] "
            />
            <img
              src={heroParticles}
              alt="glow-ui"
              className="absolute -top-[25%] scale-[75%] z-[1] translate-x-[-50%] left-[50%]"
            />
            <img
              src={heroGrid}
              alt="glow-ui"
              className="absolute -top-[75%] z-[-2] translate-x-[-50%] left-[50%]"
            />
          </div>
          <img
            src={heroGlow}
            alt="glow-ui"
            className="absolute -top-[50%] z-[-1] translate-x-[-50%] left-[50%] translate-y-10 scale-[125%]"
          />
        </div>
      </section>{" "}
    </div>
  );
}
