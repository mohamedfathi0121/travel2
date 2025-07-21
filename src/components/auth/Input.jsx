import React from 'react';

const Input = ({ name, label, register, error, ...rest }) => (
    <div className="w-full">
        {/* Label */}
        <label
            htmlFor={name}
            className="block text-sm font-medium mb-1 text-text-primary"
        >
            {label}
        </label>

        {/* Input */}
        <input
            id={name}
            {...register(name)}
            {...rest}
            className={`w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 
                ${error ? 'border-red-500' : 'border-transparent'} 
                bg-input text-text-primary placeholder-text-secondary 
                focus:ring-button-primary `}
        />

        {/* Error Message */}
        {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
    </div>
);

export default Input;
