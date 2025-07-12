import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../../schemas/registrationSchemas";
import Input from "../../components/auth/Input";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = data => {
    console.log("Login Data:", data);
    alert("Login successful! Check the console for data.");
  };

  return (
    <div className="bg-white min-h-screen flex flex-col font-sans">
      <main className="flex-grow flex items-center justify-center">
        <div className="w-full max-w-md px-4 sm:px-6 lg:px-8 py-12">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-800 text-center">
              Welcome
            </h1>
            <div className="space-y-4">
              <Input
                name="email"
                label="Email"
                type="email"
                register={register}
                error={errors.email}
                placeholder="Email"
              />
              <Input
                name="password"
                label="Password"
                type="password"
                register={register}
                error={errors.password}
                placeholder="Password"
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Remember me
                </label>
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Log in
            </button>
            <div className="text-center">
              <a
                href="#"
                className="text-sm font-medium text-blue-600 hover:underline"
              >
                Forgot password?
              </a>
            </div>
            <p className="text-center text-sm text-gray-600">
              Don't have an account?{" "}
              <Link to="/register" className="font-medium text-blue-600 hover:underline">
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;
