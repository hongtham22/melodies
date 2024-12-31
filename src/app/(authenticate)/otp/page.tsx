"use client";
import { useState, useEffect, useRef, Suspense } from "react";
import { fetchApiData } from "@/app/api/appService";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast"
import { ToastAction } from "@/components/ui/toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useRouter } from "next/router"; // Correct import

// Import schema validation
import { RegisterBody, RegisterBodyType } from "../../../../schemaValidations/auth.schema";

function Page() {
  const router = useRouter(); // Correctly initialized Next.js router
  const { toast } = useToast();
  const action = router.query.action;
  const form = useForm<RegisterBodyType>({
    resolver: zodResolver(RegisterBody),
    defaultValues: {
      otp: "",
    },
  });

  const [timeLeft, setTimeLeft] = useState(120);
  const firstInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (firstInputRef.current) {
      firstInputRef.current.focus();
    }
  }, []);

  function formatTime(seconds: number) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  }

  async function onSubmit(values: RegisterBodyType) {
    const combinedValues = {
      ...values,
      username: localStorage.getItem("username"),
      email: localStorage.getItem("email"),
      password: localStorage.getItem("password"),
    };

    const result = await fetchApiData(
      "/api/user/register",
      "POST",
      JSON.stringify(combinedValues)
    );

    if (result.success) {
      console.log("Registration result:", result.data);
      localStorage.removeItem("username");
      localStorage.removeItem("email");
      localStorage.removeItem("password");

      if (action === "signup") {
        router.push("/login");
      } else if (action === "forgotpassword") {
        router.push("/setpassword");
      }
      toast({
        variant: "success",
        title: "Congratulations!",
        description: "Registration successful!",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: result.error,
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    }
  }

  function handleResend() {
    form.reset({ otp: "" });
    router.push(`/otp?action=${action}`);
  }

  return (
    <Suspense fallback={<div>Đang tải...</div>}>
      <div className="flex flex-col justify-center gap-4 p-4">
        <Link href="/login" className="flex items-center">
          <ChevronLeftIcon className="w-5 h-5" />
          <p>Back to login</p>
        </Link>
        <h2 className="text-h1 text-primaryColorPink">Verify OTP</h2>
        <p className="text-textMedium">
          An authentication code has been sent to your email.
        </p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 w-full"
          >
            <FormField
              control={form.control}
              name="otp"
              render={({ field }) => (
                <FormItem className="flex flex-col items-center gap-3">
                  <FormControl>
                    <InputOTP maxLength={5} {...field}>
                      <InputOTPGroup className="h-6">
                        <InputOTPSlot
                          index={0}
                          ref={firstInputRef}
                          tabIndex={0}
                        />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormDescription className="w-full">
                    Please enter the OTP sent to your email. The OTP is valid for{" "}
                    {formatTime(timeLeft)} minutes.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="bg-primaryColorPink w-full p-4 hover:bg-darkPinkHover"
            >
              Submit
            </Button>
          </form>
        </Form>
        <p className="text-textMedium">
          Haven&apos;t got the email yet?
          <span>
            <button
              onClick={handleResend}
              className="text-primaryColorPink underline ml-1"
            >
              Resend
            </button>
          </span>
        </p>
      </div>
    </Suspense>
  );
}

export default Page;
