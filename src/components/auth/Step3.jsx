import React, { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { step3Schema } from "../../schemas/registrationSchemas";
import supabase from "../../utils/supabase";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Step3 = ({ prevStep, formData }) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(step3Schema),
  });

  const navigate = useNavigate();
  const [preview, setPreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const photo = watch("profilePhoto");

  // Handle preview when a file is selected
  useEffect(() => {
    if (photo && photo.length > 0) {
      const file = photo[0];
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview(null);
    }
  }, [photo]);

  // Handle drag and drop file selection
  const handleDrop = useCallback(
    e => {
      e.preventDefault();
      e.stopPropagation();
      const file = e.dataTransfer.files[0];
      if (file) {
        setValue("profilePhoto", [file], { shouldValidate: true });
      }
    },
    [setValue]
  );

  const onSubmit = async step3Data => {
    setIsSubmitting(true);
    setError(null);

    const finalData = { ...formData, ...step3Data };

    try {
      const apiFormData = new FormData();
      apiFormData.append("email", finalData.email);
      apiFormData.append("password", finalData.password);
      apiFormData.append("displayName", finalData.fullName);
      apiFormData.append("age", finalData.age);
      apiFormData.append("gender", finalData.gender);
      apiFormData.append("dateOfBirth", finalData.dob);
      apiFormData.append("country", finalData.country);
      apiFormData.append("city", finalData.city);
      apiFormData.append(
        "phoneNumbers",
        JSON.stringify([`${finalData.countryCode} ${finalData.phoneNumber}`])
      );
      apiFormData.append("avatarFile", finalData.profilePhoto[0]);
      console.log(apiFormData)
      const { error } = await supabase.functions.invoke("user-register", {
        body: apiFormData,
      });

      if (error) throw error;

      toast.success("Registration Completed Successfully!");
      navigate("/login");
    } catch (err) {
      console.error("Submission failed:", err);
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <h1 className="text-3xl font-bold text-text-primary text-center">
        Add a Profile Photo
      </h1>
      <p className="text-center text-text-secondary">
        A profile photo helps members recognize you and build trust.
      </p>

      <div
        className="w-full p-8 border-2 border-dashed rounded-lg text-center cursor-pointer
                   bg-input text-text-secondary hover:border-button-primary transition-colors"
        onDrop={handleDrop}
        onDragOver={e => e.preventDefault()}
      >
        {preview ? (
          <div className="flex flex-col items-center">
            <img
              src={preview}
              alt="Profile preview"
              className="w-32 h-32 rounded-full object-cover mb-4"
            />
            <label
              htmlFor="profilePhoto"
              className="cursor-pointer bg-background text-text-primary font-semibold py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Change Photo
            </label>
          </div>
        ) : (
          <>
            <p className="mb-4">Drag & drop or click below to upload</p>
            <label
              htmlFor="profilePhoto"
              className="cursor-pointer bg-background border border-gray-300 text-text-primary font-semibold py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Browse
            </label>
          </>
        )}
        <input
          id="profilePhoto"
          type="file"
          {...register("profilePhoto")}
          className="hidden"
          accept="image/*"
        />
        {errors.profilePhoto && (
          <p className="text-red-500 text-sm mt-2">
            {errors.profilePhoto.message}
          </p>
        )}
      </div>

      {error && <p className="text-red-500 text-center">{error}</p>}

      <div className="flex justify-center">
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-button-primary text-white font-bold py-3 px-8 rounded-lg 
                     hover:bg-button-primary-hover transition-colors disabled:bg-gray-400"
        >
          {isSubmitting
            ? "Completing Registration..."
            : "Complete Registration"}
        </button>
      </div>
      <button
        type="button"
        onClick={prevStep}
        className="w-full text-center text-sm text-text-secondary hover:underline mt-4"
      >
        Back
      </button>
    </form>
  );
};

export default Step3;
