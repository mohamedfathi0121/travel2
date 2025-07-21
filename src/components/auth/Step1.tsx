import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { step1Schema } from "../../schemas/registrationSchemas";
import Input from "./Input";
import { Link } from "react-router-dom";
import supabase from "../../utils/supabase"; // ✅ Ensure correct path

const Step1 = ({ nextStep, updateFormData }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm({
    resolver: zodResolver(step1Schema),
  });

  const [checkingEmail, setCheckingEmail] = useState(false);

  const onSubmit = async data => {
    setCheckingEmail(true);

    // ✅ Call Edge Function to check if email exists
    const { data: result, error } = await supabase.functions.invoke(
      "check-email-exists",
      {
        body: { email: data.email },
      }
    );

    setCheckingEmail(false);

    if (error) {
      console.error("Function error:", error);
      setError("email", {
        type: "manual",
        message: "Server error, please try again later.",
      });
      return;
    }

    if (result?.exists) {
      setError("email", {
        type: "manual",
        message: "Email already exists.",
      });
    } else {
      clearErrors("email");
      updateFormData(data);
      nextStep();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Heading */}
      <h1 className="text-3xl font-bold text-text-primary text-center">
        Create Your Account
      </h1>

      {/* Inputs */}
      <div className="space-y-4">
        <Input
          name="fullName"
          label="Full Name"
          register={register}
          error={errors.fullName}
          placeholder="Enter your full name"
        />
        <Input
          name="email"
          label="Email"
          type="email"
          register={register}
          error={errors.email}
          placeholder="Enter your email"
        />
        <Input
          name="password"
          label="Password"
          type="password"
          register={register}
          error={errors.password}
          placeholder="Enter your password"
          autoComplete="off"
        />
        <Input
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          register={register}
          error={errors.confirmPassword}
          placeholder="Confirm your password"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={checkingEmail}
        className="w-full bg-button-primary text-white font-bold py-3 px-4 rounded-lg 
                           hover:bg-button-primary-hover transition-colors disabled:opacity-50"
      >
        {checkingEmail ? "Checking..." : "Next"}
      </button>

      {/* Login Redirect */}
      <p className="text-center text-sm text-text-secondary">
        Already have an account?{" "}
        <Link
          to="/login"
          className="font-medium text-button-primary hover:underline"
        >
          Log in
        </Link>
      </p>
    </form>
  );
};

export default Step1;
