"use client";

import { AlertCircleIcon, Eye, EyeOff, Loader2 } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Field, FieldGroup, FieldLabel } from "../../components/ui/field";
import { Input } from "../../components/ui/input";
import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { Alert, AlertTitle } from "../../components/ui/alert";
import { authClient } from "../../lib/auth/auth-client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export const Google = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      width="20"
      height="20"
    >
      <path
        fill="#FFC107"
        d="M43.611 20.083H42V20H24v8h11.303C33.655 32.657 29.195 36 24 36c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.955 3.045l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
      />
      <path
        fill="#FF3D00"
        d="M6.306 14.691l6.571 4.819C14.655 16.108 18.961 13 24 13c3.059 0 5.842 1.154 7.955 3.045l5.657-5.657C34.046 6.053 29.268 4 24 4c-7.682 0-14.347 4.337-17.694 10.691z"
      />
      <path
        fill="#4CAF50"
        d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.176 0-9.625-3.327-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"
      />
      <path
        fill="#1976D2"
        d="M43.611 20.083H42V20H24v8h11.303c-1.058 3.087-3.058 5.532-5.684 7.07l.003-.002 6.19 5.238C35.374 39.083 44 33 44 24c0-1.341-.138-2.65-.389-3.917z"
      />
    </svg>
  );
};

const Login = () => {
    const router = useRouter();
  
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    setError("");

    try {
      const res = await authClient.signIn.email(
        {
          email: data.email,
          password: data.password,
        },
        {
          onSuccess: () => {
            router.push("/");
            toast.success("Login Successful")
          },
        },
      );

      if (res?.error) {
        toast.error("Invalid credentials. Please try again.")
        setError(res.error);

        return;
      }
      reset();
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };
  return (
    <section className="flex min-h-[80dvh] items-center justify-center px-4">
      <div className="w-full max-w-md rounded-xl border bg-card p-6 shadow-sm transition-all duration-200 hover:border-primary">
        <div className="mt-2 text-center">
          <h2 className="text-2xl font-bold text-primary">Welcome Back </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            Sign in to manage your portfolio with ease.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-5">
          <FieldGroup>
            {error && (
              <Alert variant="destructive" className="max-w-md">
                <AlertCircleIcon />
                <AlertTitle>{error.message}</AlertTitle>
              </Alert>
            )}
            <Field>
              <FieldLabel htmlFor="email">Email Address</FieldLabel>

              <Input
                id="email"
                type="email"
                placeholder="adil@gmail.com"
                {...register("email", {
                  required: "Email is required",
                })}
              />

              {errors.email && (
                <Alert variant="destructive" className="max-w-md border-0">
                  <AlertCircleIcon />
                  <AlertTitle> {errors.email.message}</AlertTitle>
                </Alert>
              )}
            </Field>

            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>

              <div className="relative">
                <Input
                  id="password"
                  placeholder="Enter your password"
                  type={showPass ? "text" : "password"}
                  {...register("password", {
                    required: "Password is required",
                  })}
                />

                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  onClick={() => setShowPass((e) => !e)}
                >
                  {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {errors.password && (
                <Alert variant="destructive" className="max-w-md border-0">
                  <AlertCircleIcon />
                  <AlertTitle> {errors.password.message}</AlertTitle>
                </Alert>
              )}
            </Field>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? <Loader2 className="animate-spin" /> : "Login"}
            </Button>

            {/* <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <div className="h-px w-full bg-border" />
              <span>OR</span>
              <div className="h-px w-full bg-border" />
            </div> */}

            {/* <Button
              type="button"
              variant="outline"
              className="w-full gap-2 bg-zinc-900 text-white hover:bg-zinc-800 hover:text-white"
            >
              <Google />
              Login with Google
            </Button> */}

            <p className="text-center text-sm text-muted-foreground">
              Don&apos;t have an account?
              <Link href="/register" className="ml-1 text-primary underline">
                Register
              </Link>
            </p>
          </FieldGroup>
        </form>
      </div>
    </section>
  );
};

export default Login;
