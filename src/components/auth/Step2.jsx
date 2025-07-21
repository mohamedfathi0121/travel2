import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { step2Schema } from "../../schemas/registrationSchemas";
import Input from "./Input";
import Select from "./Select";

// ✅ Import all countries and cities
import countriesAndCities from "all-countries-and-cities-json";

const Step2 = ({ nextStep, prevStep, updateFormData }) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(step2Schema),
    defaultValues: { age: "", dob: "", country: "", city: "" },
  });

  const [cities, setCities] = useState([]);

  const selectedCountry = watch("country");
  const dob = watch("dob"); // Watch date of birth changes

  // ✅ Update cities when the user selects a country
  useEffect(() => {
    if (selectedCountry) {
      setCities(countriesAndCities[selectedCountry] || []);
    } else {
      setCities([]);
    }
  }, [selectedCountry]);

  // ✅ Automatically calculate age when DOB changes
  useEffect(() => {
    if (dob) {
      const today = new Date();
      const birthDate = new Date(dob);
      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      setValue("age", age); // Update age in the form
    } else {
      setValue("age", "");
    }
  }, [dob, setValue]);

  const onSubmit = data => {
    updateFormData(data);
    nextStep();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <h1 className="text-3xl font-bold text-text-primary text-center">
        Tell Us About Yourself
      </h1>

      <div className="space-y-4">
        {/* ✅ Read-Only Age (Auto Calculated) */}

        <Select
          name="gender"
          label="Gender"
          register={register}
          error={errors.gender}
        >
          <option value="">Select</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="prefer_not_to_say">Prefer not to say</option>
        </Select>

        {/* ✅ Date of Birth (Triggers Age Calculation) */}
        <Input
          name="dob"
          label="Date of Birth"
          type="date"
          register={register}
          error={errors.dob}
        />
        <Input
          name="age"
          label="Age"
          type="number"
          register={register}
          error={errors.age}
          placeholder="Your age will be calculated automatically"
          autoComplete="off"
          readOnly
        />
        <Select
          name="country"
          label="Country"
          register={register}
          error={errors.country}
        >
          <option value="">Select your country</option>
          {Object.keys(countriesAndCities).map(country => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </Select>

        <Select
          name="city"
          label="City"
          register={register}
          error={errors.city}
          disabled={!selectedCountry}
        >
          <option value="">Select</option>
          {cities.map(city => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </Select>
      </div>

      <div className="flex justify-between space-x-4">
        <button
          type="button"
          onClick={prevStep}
          className="text-button-primary border border-button-primary font-bold py-3 px-6 rounded-lg
                     hover:bg-button-primary hover:text-button-text transition-colors"
        >
          Back
        </button>
        <button
          type="submit"
          className="bg-button-primary text-white font-bold py-3 px-6 rounded-lg
                     hover:bg-button-primary-hover transition-colors"
        >
          Next
        </button>
      </div>
    </form>
  );
};

export default Step2;
