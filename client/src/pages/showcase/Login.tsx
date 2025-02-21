import Button from "@/components/ui/Button";
import useAuthMutation from "@/hooks/mutation/useAuthMutation";
import { useGoogleLogin } from "@react-oauth/google";

export default function Login() {
  const { loginMutation } = useAuthMutation();
  const loginWithGoogle = useGoogleLogin({
    onSuccess: (token) => {
      loginMutation.mutate({ token: token.access_token, provider: "google" });
    },
  });
  const handleLogin = () => {
    loginWithGoogle();
  };

  return (
    <div className="min-h-screen w-full flex items-center flex-col justify-center">
      <div className="relative max-w-[60rem] flex items-center justify-center w-full aspect-square ">
        <div className=" flex items-center justify-center flex-col ">
          <div className="relative z-10 text-center flex flex-col items-center justify-center">
            <p className="text-white mb-4">Before starting, please</p>
            <h1 className="text-white text-4xl mb-2">Login to your account.</h1>
            <p className="text-secondary mt-3 max-w-[25rem] text-md text-center mb-6">
              To start using catalyst, please login using our supported third
              party authentication platforms
            </p>
            <Button
              onClick={handleLogin}
              variant={"hollow"}
              className="py-3 text-lg px-12 flex gap-3"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/1200px-Google_%22G%22_logo.svg.png"
                className="w-6 aspect-square "
              />
              Google
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
