"use client";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState, useEffect, useRef } from "react";

import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useRouter, useSearchParams } from "next/navigation";

const FormSchema = z.object({
  pin: z.string().min(5, {
    message: "Your one-time password must be 5 characters.",
  }),
});

function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const action = searchParams.get("action");
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  });

  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes = 120 seconds

  const firstInputRef = useRef<HTMLInputElement>(null);
  // const firstInputRef = useRef(null); // Tạo ref cho ô đầu tiên

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(timer); // Cleanup timer when component unmounts
  }, []);

  useEffect(() => {
    if (firstInputRef.current) {
      firstInputRef.current.focus(); // Focus ô đầu tiên
    }
  }, []);

  function formatTime(seconds: number) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  }

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-full rounded-md p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
    // router.push("/authenticate/login");
    if (action === "signup") {
      router.push("/authenticate/login"); 
    } else if (action === "forgotpassword") {
      router.push("/authenticate/setpassword"); 
    }
  }

  return (
    <div className="flex flex-col justify-center gap-4 p-4">
      <Link href="/authenticate/login" className="flex items-center">
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
            name="pin"
            render={({ field }) => (
              <FormItem className="flex flex-col items-center gap-3">
                <FormControl>
                  <InputOTP maxLength={5} {...field}>
                    <InputOTPGroup className="h-6">
                      <InputOTPSlot
                        index={0}
                        ref={firstInputRef} // Gán ref cho ô đầu tiên
                        tabIndex={0} // Đảm bảo ô đầu tiên nhận focus
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
          <Link
            href="/authenticate/forgotpassword"
            className="text-primaryColorPink underline"
          >
            Resend email
          </Link>
        </span>
      </p>
    </div>
  );
}

export default Page;
