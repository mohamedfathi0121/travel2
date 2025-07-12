import React, { useState } from 'react';
import ProgressBar from '../../components/auth/ProgressBar';
import Step1 from '../../components/auth/Step1';
import Step2 from '../../components/auth/Step2';
import Step3 from '../../components/auth/Step3';

export default function RegisterPage() {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({});

    const nextStep = () => setStep(prev => prev + 1);
    const prevStep = () => setStep(prev => prev - 1);

    const updateFormData = (newData) => {
        setFormData(prev => ({ ...prev, ...newData }));
    };

    const renderStep = () => {
        switch (step) {
            case 1:
                return <Step1 nextStep={nextStep} updateFormData={updateFormData} />;
            case 2:
                return <Step2 nextStep={nextStep} prevStep={prevStep} updateFormData={updateFormData} />;
            case 3:
                // Pass the combined data to the final step
                return <Step3 prevStep={prevStep} formData={formData} />;
            default:
                return <Step1 nextStep={nextStep} updateFormData={updateFormData} />;
        }
    };

    return (
        <div className="bg-white min-h-screen flex flex-col font-sans">
            <main className="flex-grow flex items-center justify-center">
                <div className="w-full max-w-lg px-4 sm:px-6 lg:px-8 py-12">
                    <p className="text-sm font-medium text-gray-500 mb-2">Step {step} of 3</p>
                    <ProgressBar currentStep={step} totalSteps={3} />
                    <div className="mt-8">
                        {renderStep()}
                    </div>
                </div>
            </main>
        </div>
    );
}
