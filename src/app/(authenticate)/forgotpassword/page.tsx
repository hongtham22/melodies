"use client";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import Link from "next/link";
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
import { useRouter } from "next/navigation";

function Page() {
  const router = useRouter();
  const handleEmailSubmit = () => {
    router.push("/otp?action=forgotpassword");
  };
  const form = useForm<RegisterBodyType>({
    resolver: zodResolver(RegisterBody),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(values: RegisterBodyType) {
    console.log(values);
  }

  return (
    <div className="flex flex-col justify-center gap-4 p-4">
      <Link href="/login" className="flex items-center">
        <ChevronLeftIcon className="w-5 h-5" />
        <p>Back to login</p>
      </Link>

      <h2 className="text-h1 text-primaryColorPink">Forgot your password?</h2>
      <p className="text-textMedium">
        Don’t worry, happens to all of us. Enter your email below to recover
        your password
      </p>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 w-full"
        >
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
          <Button
            type="submit"
            className="bg-primaryColorPink w-full p-4  hover:bg-darkPinkHover"
            onClick={handleEmailSubmit}
          >
            Submit
          </Button>

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
            Login With Google
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default Page;
