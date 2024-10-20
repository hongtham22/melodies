"use client";
import React, { useEffect } from "react";
import envConfig from "@/config"
import { useAppContext } from '@/app/AppProvider';


import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast"
import { ToastAction } from "@/components/ui/toast"
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
  LoginBody,
  LoginBodyType,
} from "../../../../schemaValidations/auth.schema";

import { FcGoogle } from "react-icons/fc";
import { PersonIcon } from "@radix-ui/react-icons";
import { LockClosedIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useRouter } from "next/navigation";

function Page() {
  const { role, setRole, accessToken, setAccessToken } = useAppContext()
  const router = useRouter();
  const { toast } = useToast()
  const form = useForm<LoginBodyType>({
    resolver: zodResolver(LoginBody),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  useEffect(() => {
    if (accessToken && role) {
      if (role === 'User') {
        router.push("/");
      } else if (role === 'Admin') {
        router.push('/admin');
      }
    }
  }, [accessToken, role]);

  async function onSubmit(values: LoginBodyType) {
    console.log(values);

    try {
      const result = await fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT}/api/auth/login`,
        {
          body: JSON.stringify(values),
          headers: {
            'Content-Type': 'application/json'
          },
          method: 'POST'
        }).then(async (res) => {
          // console.log(res);
          const payload = await res.json()
          const data = {
            status: res.status,
            payload
          }
          if (!res.ok) {
            throw data
          }
          return data
        })
      console.log(result);
      setAccessToken(result.payload.accessToken)
      setRole(result.payload.role)
      // if (role === 'User') {
      //   router.push("/");
      // } else {
      //   router.push('/admin')
      // }

    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: (error as { payload: { errMess: string } }).payload.errMess,
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      })

    }
  }

  return (
    <div className="w-full flex gap-5 justify-center items-center flex-col">
      <p className="text-h2 text-primaryColorPink border-b-2 border-primaryColorPink ">
        Login
      </p>
      <p>Login to access your account</p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 w-full p-4"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username or Email</FormLabel>
                <FormControl>
                  <div className="relative">
                    <PersonIcon className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white w-5 h-5" />
                    <Input
                      placeholder="Enter your username of email"
                      {...field}
                      className="pl-8"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
                      autoComplete="on"
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
          >
            Login
          </Button>

          <div className="flex justify-between">
            <Link href="/forgotpassword" className="text-textMedium underline">
              Forgot password
            </Link>
            <p className="text-textMedium">
              Don&apos;t you have account?
              <span>
                <Link
                  href="/signup"
                  className="text-primaryColorPink underline"
                >
                  {" "}
                  Sign up
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
            className="bg-transparent  border-white border-2 w-full p-4 flex items-center justify-center gap-2 group"
          >
            <FcGoogle className="w-6 h-6" />
            <p className="text-white group-hover:text-black">Login With Google</p>
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default Page;
