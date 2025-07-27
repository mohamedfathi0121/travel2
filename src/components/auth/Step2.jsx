import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { step2Schema } from "../../schemas/registrationSchemas";
import Input from "./Input";
import Select from "./Select";

// ✅ Import countries and cities
import countriesAndCities from "all-countries-and-cities-json";

// ✅ Import phone codes
import phoneCodes from "../../data/phone.json";

const Step2 = ({ nextStep, prevStep, updateFormData, formData }) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(step2Schema),
    defaultValues: {
      gender: formData.gender || "",
      dob: formData.dob || "",
      age: formData.age || "",
      country: formData.country || "",
      city: formData.city || "",
      countryCode: formData.countryCode || "",
      phoneNumber: formData.phoneNumber || "",
    },
  });

  const [cities, setCities] = useState([]);

  const selectedCountry = watch("country");
  const dob = watch("dob");

  // ✅ Convert phone codes JSON to dropdown-friendly array
  const countryCodes = Object.entries(phoneCodes).map(([iso, code]) => ({
    iso,
    code: `+${code}`,
    label: `${iso} (+${code})`,
  }));

  // ✅ Populate cities on mount if formData already has a country
  useEffect(() => {
    const country = selectedCountry || formData?.country;
    if (country) {
      setCities(countriesAndCities[country] || []);
    } else {
      setCities([]);
    }
  }, [selectedCountry, formData]);

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
      setValue("age", age);
    } else {
      setValue("age", "");
    }
  }, [dob, setValue]);

  const onSubmit = (data) => {
    // ✅ Combine country code + phone number into a single phone field
    const fullPhone = `${data.countryCode}${data.phoneNumber}`;

    const finalData = {
      ...data,
      phone: fullPhone,
    };

    // ✅ Optionally remove separate fields
    delete finalData.countryCode;
    delete finalData.phoneNumber;

    updateFormData(finalData);
    nextStep();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <h1 className="text-3xl font-bold text-text-primary text-center">
        Tell Us About Yourself
      </h1>

      <div className="space-y-4">
        {/* ✅ Gender */}
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

        {/* ✅ Date of Birth & Age */}
        <Input
          name="dob"
          label="Date of Birth"
          type="date"
          register={register}
          error={errors.dob}
          onInput={(e) => {
            const parts = e.target.value.split("-");
            if (parts[0] && parts[0].length > 4) {
              parts[0] = parts[0].slice(0, 4); // Ensure year is max 4 digits
              e.target.value = parts.join("-");
            }
          }}
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

        {/* ✅ Country & City */}
        <Select
          name="country"
          label="Country"
          register={register}
          error={errors.country}
        >
          <option value="">Select your country</option>
          {Object.keys(countriesAndCities).map((country) => (
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
          {cities.map((city, i) => (
            <option key={`${city}-${i}`} value={city}>
              {city}
            </option>
          ))}
        </Select>

        {/* ✅ Phone Number with Country Code */}
        <div>
          <label className="block text-sm mb-1 text-text-primary">
            Phone Number
          </label>
          <div className="flex">
            <select
              {...register("countryCode")}
              className="w-1/3 bg-input p-3 rounded-l-md text-text-hard-secondary"
            >
              <option value="">Code</option>
              {countryCodes.map((c) => (
                <option key={c.iso} value={c.code}>
                  {c.label}
                </option>
              ))}
            </select>
            <input
              type="tel"
              placeholder="5551234567"
              {...register("phoneNumber")}
              className="w-2/3 bg-input p-3 rounded-r-md text-text-primary"
            />
          </div>
          {errors.countryCode && (
            <p className="text-red-500 text-xs">
              {errors.countryCode.message}
            </p>
          )}
          {errors.phoneNumber && !errors.countryCode && (
            <p className="text-red-500 text-xs">
              {errors.phoneNumber.message}
            </p>
          )}
        </div>
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
