import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { step2Schema } from "../../schemas/registrationSchemas";
import Input from "./Input";
import Select from "./Select";

const Step2 = ({ nextStep, prevStep, updateFormData }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(step2Schema),
    defaultValues: { age: "" },
  });

  const onSubmit = data => {
    updateFormData(data);
    nextStep();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800 text-center">
        Tell us about yourself
      </h1>
      <div className="space-y-4">
        <Input
          name="age"
          label="Age"
          type="number"
          register={name => register(name, { valueAsNumber: true })}
          error={errors.age}
          placeholder="Enter your age"
        />
        <Select
          name="gender"
          label="Gender"
          register={register}
          error={errors.gender}
        >
          <option value="">Select</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
          <option value="prefer_not_to_say">Prefer not to say</option>
        </Select>
        <Input
          name="dob"
          label="Date of Birth"
          register={register}
          error={errors.dob}
          placeholder="MM/DD/YYYY"
        />
        <Select
          name="country"
          label="Country"
          register={register}
          error={errors.country}
        >
          <option value="">Select your country</option>
          <option value="usa">United States</option>
          <option value="canada">Canada</option>
          <option value="uk">United Kingdom</option>
          <option value="australia">Australia</option>
        </Select>
        <Select
          name="city"
          label="City"
          register={register}
          error={errors.city}
        >
          <option value="">Select</option>
          <option value="ny">New York</option>
          <option value="la">Los Angeles</option>
          <option value="london">London</option>
          <option value="sydney">Sydney</option>
        </Select>
      </div>
      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={prevStep}
          className="bg-gray-200 text-gray-800 font-bold py-3 px-6 rounded-lg hover:bg-gray-300 transition-colors"
        >
          Back
        </button>
        <button
          type="submit"
          className="bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Next
        </button>
      </div>
    </form>
  );
};

export default Step2;
