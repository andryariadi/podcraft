import { SignUp } from "@clerk/nextjs";

const SignUpPage = () => {
  return (
    <div className="bg-rose-500 flex-center glassmorphism-auth h-screen w-full">
      <SignUp />
    </div>
  );
};

export default SignUpPage;
