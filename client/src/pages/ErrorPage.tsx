import Button from "@/components/ui/Button";
import { useNavigate } from "react-router-dom";

export default function ErrorPage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen w-full flex items-center flex-col justify-center">
      <div className="relative max-w-[60rem] flex items-center justify-center w-full aspect-square ">
        <div className=" flex items-center justify-center flex-col ">
          <div className="relative z-10 text-center flex flex-col items-center justify-center">
            <p className="text-[10rem] text-stroke leading-[100%]">404</p>
            <h1 className="text-white text-4xl mb-2 mt-8">Page Not Found</h1>
            <p className="text-secondary mt-3 max-w-[25rem] text-md text-center mb-6">
              Sorry, we couldn’t find the page you’re looking form
            </p>
            <Button
              onClick={() => navigate("/")}
              variant={"hollow"}
              className="py-3 text-lg px-12 flex gap-3"
            >
              Go Back
            </Button>
          </div>
          <div className="absolute inset-0 border  ">
            <div className="border border-border absolute inset-0 rounded-full opacity-60"></div>
            <div className="border border-border absolute inset-24 rounded-full"></div>
            <div className="border border-border absolute inset-56 rounded-full">
              <div className="bg-base w-full h-full rounded-full blur-[7.5rem]"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
