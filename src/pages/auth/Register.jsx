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
                return <Step3 prevStep={prevStep} formData={formData} />;
            default:
                return <Step1 nextStep={nextStep} updateFormData={updateFormData} />;
        }
    };

    return (
        <div className="bg-background min-h-screen flex flex-col font-sans">
            <main className="flex-grow flex items-center justify-center">
                <div className="w-full max-w-lg px-4 sm:px-6 lg:px-8 py-12">
                    {/* Step Counter */}
                    <p className="text-sm font-medium text-text-secondary mb-2 text-center">
                        Step {step} of 3
                    </p>

                    {/* Progress Bar */}
                    <ProgressBar currentStep={step} totalSteps={3} />

                    {/* Form Steps */}
                    <div className="mt-8 p-8 rounded-2xl shadow-md shadow-lg shadow-text-hard-secondary">
                        {renderStep()}
                    </div>
                </div>
            </main>
        </div>
    );
}
