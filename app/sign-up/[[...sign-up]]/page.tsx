import { SignUp } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
    <SignUp
      path="/sign-up"
      routing="path"
      signInUrl="/sign-in"
      afterSignUpUrl="/new-user"
      
    />
    </div>
  );
}
