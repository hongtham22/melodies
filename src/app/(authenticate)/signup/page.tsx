"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  RegisterBody,
  RegisterBodyType,
} from "../../../../schemaValidations/auth.schema";

import { FcGoogle } from "react-icons/fc";
import { EnvelopeClosedIcon } from "@radix-ui/react-icons";
import { PersonIcon } from "@radix-ui/react-icons";
import { LockClosedIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useRouter } from 'next/navigation';

function Page() {
  const router = useRouter();

  const form = useForm<RegisterBodyType>({
    resolver: zodResolver(RegisterBody),
    defaultValues: {
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  function onSubmit(values: RegisterBodyType) {
    console.log(values);
    router.push('/authenticate/otp?action=signup');

  }
  return (
    <div className="flex gap-5 justify-center items-center flex-col">
      <p className="text-h2 text-primaryColorPink border-b-2 border-primaryColorPink">
        Sign Up
      </p>
      <p className="text-textMedium">
        Let’s get you all st up so you can access your personal account
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex gap-2">
            {/* Username */}
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <PersonIcon className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white w-5 h-5" />
                      <Input
                        placeholder="Enter your username"
                        {...field}
                        className="pl-8"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email */}

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <EnvelopeClosedIcon className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white w-5 h-5" />
                      <Input
                        placeholder="Enter your email"
                        type="email"
                        {...field}
                        className="pl-9"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex gap-2">
            {/* Password */}

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <LockClosedIcon className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white w-5 h-5" />
                      <Input
                        placeholder="Enter your password"
                        type="password"
                        {...field}
                        className="pl-8"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Repassword */}

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <LockClosedIcon className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white w-5 h-5" />
                      <Input
                        placeholder="Re-enter your password"
                        type="password"
                        {...field}
                        className="pl-9"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="terms"
              className="mr-2 bg-transparent h-4 w-4 border-2 border-black"
            />
            <label htmlFor="terms" className="text-textMedium">
              I agree to all the Terms and Privacy Policies
            </label>
          </div>

          <Button
            type="submit"
            className="bg-primaryColorPink w-full p-4  hover:bg-darkPinkHover"
          >
            Sign Up
          </Button>

          <div className="flex items-center justify-center">
            <p className="text-textMedium">
              Already have an account?
              <span>
                <Link
                  href="/authenticate/login"
                  className="text-primaryColorPink underline"
                >
                  {" "}
                  Login
                </Link>
              </span>
            </p>
          </div>
          <div className="flex items-center my-4">
            <div className="flex-grow border-t"></div>
            <span className="mx-3">Or</span>
            <div className="flex-grow border-t"></div>
          </div>

          <Button
            type="submit"
            className="bg-transparent  border-white border-2 w-full p-4 flex items-center justify-center gap-2 "
          >
            <FcGoogle className="w-6 h-6" />
            Sign Up With Google
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default Page;
