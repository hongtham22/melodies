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
  ForgotPassword,
  ForgotPasswordType,
} from "../../../../schemaValidations/auth.schema";
import { EnvelopeClosedIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { fetchApiData } from "@/app/api/appService";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";

function Page() {
  const router = useRouter()
  const { toast } = useToast()
  const form = useForm<ForgotPasswordType>({
    resolver: zodResolver(ForgotPassword),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: ForgotPasswordType) {
    const response = await fetchApiData('/api/auth/request-reset-password', 'POST', JSON.stringify(values))
    if (response.success) {
      toast({
        variant: "success",
        title: "Reset Password successfully",
        description: "Please go to gmail to change your password",
      });
      router.push('/login')
    }
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
                      maxLength={150}
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
            Submit
          </Button>

        </form>
      </Form>
    </div>
  );
}

export default Page;
