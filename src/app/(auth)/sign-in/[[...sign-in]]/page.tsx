import { SignIn } from "@clerk/nextjs";

const SignInPage = () => {
  return (
    <div className="bg-violet-500 flex-center glassmorphism-auth h-screen w-full">
      <SignIn />
    </div>
  );
};

export default SignInPage;
