'use client';
import LogInForm from "@/components/ui/logInForm";
import SignUpForm from "@/components/ui/signUpForm";
import React, { useState } from "react";

function SignUp() {
  const [isSignUp, setIsSignUp] = useState(true);

  return (
    <div className="bg-primaryColorBg text-white w-[1062px] m-6 p-3 flex gap-[115px] justify-center items-center">
      <div className="w-[50%]">
        <h1 className="text-h1 mb-3">Join Our Platform</h1>
        <p className="text-textBig tracking-wider word">
          You can be one of the{" "}
          <span className="text-primaryColorPink">members</span> of our platform
          by just adding some necessarily information. if you already have an
          account on our website, you can just hit the{" "}
          <span className="text-primaryColorBlue">Login button</span>.
        </p>
      </div>
      <div className="flex flex-col gap-3 px-6 py-4 w-[50%] bg-darkerPink rounded-xl">
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => setIsSignUp(true)}
            className={`text-h3 ${isSignUp ? "text-primaryColorPink border-b-2 border-primaryColorPink" : "text-lightPink"}`}
          >
            Sign Up
          </button>
          <button
            onClick={() => setIsSignUp(false)}
            className={`text-h3 ${!isSignUp ? "text-primaryColorPink border-b-2 border-primaryColorPink" : "text-lightPink"}`}
          >
            Login
          </button>
        </div>
        {isSignUp ? <SignUpForm /> : <LogInForm />}
      </div>
    </div>
  );
}

export default SignUp;