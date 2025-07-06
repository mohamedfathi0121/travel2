import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// const nameRegex = /^[A-Za-zÀ-ÿ ,.'-]+$/u;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-={}[\]:;"'<>,.?/~`|\\]).{6,}$/;

const schema = z.object({

  email: z.string().regex(emailRegex, { message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" })
    .regex(passwordRegex, {
      message:
        "Password must include uppercase, lowercase, number, and special character",
    }),
  remember: z.boolean().optional(),
});

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = data => {
    console.log(data);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="bg-header-background flex items-center justify-between p-4 shadow-sm">
        <h1 className="text-text-primary font-bold text-lg">AdventureCo</h1>
        <nav className="flex items-center gap-6 text-text-primary">
          <a href="#" className="hover:text-btn-primary">
            Explore
          </a>
          <a href="#" className="hover:text-btn-primary">
            Create
          </a>
          <a href="#" className="hover:text-btn-primary">
            About
          </a>
          <button className="bg-input px-4 py-2 rounded-full font-semibold">
            Sign up
          </button>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center bg-background px-4">
        <h2 className="text-text-primary text-2xl font-semibold mb-8">
          Welcome
        </h2>

        <form className="w-full max-w-sm" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-text-primary mb-1" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Email"
              {...register("email")}
              className="w-full px-4 py-3 rounded border border-input bg-background text-text-primary focus:outline-none focus:ring-2 focus:ring-btn-primary"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-text-primary mb-1" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Password"
              {...register("password")}
              className="w-full px-4 py-3 rounded border border-input bg-background text-text-primary focus:outline-none focus:ring-2 focus:ring-btn-primary"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="flex items-center mb-6">
            <input
              type="checkbox"
              id="remember"
              {...register("remember")}
              className="mr-2"
            />
            <label htmlFor="remember" className="text-text-secondary text-sm">
              Remember me
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-full bg-button-primary hover:bg-button-primary-hover text-white font-semibold hover:bg-btn-primary-hover transition"
          >
            Log in
          </button>

          <div className="mt-4 text-center">
            <a
              href="#"
              className="text-text-secondary text-sm hover:text-btn-primary"
            >
              Forgot password?
            </a>
          </div>

          <div className="mt-2 text-center">
            <span className="text-text-secondary text-sm">
              Don't have an account?{" "}
            </span>
            <a
              href="#"
              className="text-btn-primary hover:text-btn-primary-hover font-medium"
            >
              Sign up
            </a>
          </div>
        </form>
      </main>
    </div>
  );
}
