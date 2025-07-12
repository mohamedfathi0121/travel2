import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { step3Schema } from '../../schemas/registrationSchemas';

const Step3 = ({ prevStep, formData }) => {
    const { handleSubmit, register, watch } = useForm({
        resolver: zodResolver(step3Schema)
    });
    const [preview, setPreview] = useState(null);
    const photo = watch('profilePhoto');

    useEffect(() => {
        if (photo && photo.length > 0) {
            const file = photo[0];
            setPreview(URL.createObjectURL(file));
        } else {
            setPreview(null);
        }
    }, [photo]);

    const onSubmit = () => {
        console.log('Final Form Data:', formData);
        alert('Registration Complete! Check the console for the final data.');
    };
    
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-800 text-center">Add a profile photo</h1>
            <p className="text-center text-gray-600">Having a profile photo helps other members recognize you and builds trust within the community.</p>
            
            <div className="w-full p-8 border-2 border-dashed border-gray-300 rounded-lg text-center">
                {preview ? (
                    <div className="flex flex-col items-center">
                        <img src={preview} alt="Profile preview" className="w-32 h-32 rounded-full object-cover mb-4" />
                        <label htmlFor="profilePhoto" className="cursor-pointer bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors">
                            Change Photo
                        </label>
                        <input id="profilePhoto" type="file" {...register('profilePhoto')} className="hidden" accept="image/*" />
                    </div>
                ) : (
                    <>
                        <p className="text-gray-500 mb-4">Drag and drop or browse to upload</p>
                        <label htmlFor="profilePhoto" className="cursor-pointer bg-white border border-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors">
                            Browse
                        </label>
                        <input id="profilePhoto" type="file" {...register('profilePhoto')} className="hidden" accept="image/*" />
                    </>
                )}
            </div>

            <div className="flex justify-center">
                <button type="submit" className="bg-blue-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-700 transition-colors">
                    Complete Registration
                </button>
            </div>
             <button type="button" onClick={prevStep} className="w-full text-center text-sm text-gray-600 hover:underline mt-4">
                Back
            </button>
        </form>
    );
};

export default Step3;
