import React from 'react';

const Select = ({ name, label, register, error, children, ...rest }) => (
     <div className="w-full">
        <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
        <div className="relative">
            <select
                id={name}
                {...register(name)}
                {...rest}
                className={`w-full appearance-none px-4 py-3 bg-gray-100 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white ${error ? 'border-red-500' : ''}`}
            >
                {children}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
        </div>
        {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
    </div>
);

export default Select;

