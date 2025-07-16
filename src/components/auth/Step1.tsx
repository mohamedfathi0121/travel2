import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { step1Schema } from '../../schemas/registrationSchemas';
import Input from './Input';
import { Link } from 'react-router-dom';

const Step1 = ({ nextStep, updateFormData }) => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(step1Schema)
    });

    const onSubmit = (data) => {
        updateFormData(data);
        nextStep();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-800 text-center">Create your account</h1>
            <div className="space-y-4">
                <Input name="fullName" label="Full name" register={register} error={errors.fullName} placeholder="Enter your full name" />
                <Input name="email" label="Email" type="email" register={register} error={errors.email} placeholder="Enter your email" />
                <Input name="password" label="Password" type="password" register={register} error={errors.password} placeholder="Enter your password" />
                <Input name="confirmPassword" label="Confirm Password" type="password" register={register} error={errors.confirmPassword} placeholder="Confirm your password" />
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                Next
            </button>
            <p className="text-center text-sm text-gray-600">
                Already have an account? <Link to="/login" className="font-medium text-blue-600 hover:underline">Log in</Link>
            </p>
        </form>
    );
};

export default Step1;

