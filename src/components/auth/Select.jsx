import React from 'react';

const Select = ({ name, label, register, error, children, ...rest }) => {
    const selectClasses = `
           bg-input w-full px-4  p-3 rounded-l-md text-text-primary placeholder-text-secondary text-sm focus:outline-none focus:ring-2 focus:ring-blue-500

    `;

    return (
        <div className="w-full">
            {/* Label */}
            <label
                htmlFor={name}
                className="block text-sm font-medium mb-1 text-text-primary"
            >
                {label}
            </label>

            {/* Select Field */}
            <div className="relative">
                <select
                    id={name}
                    aria-invalid={!!error} // ✅ Accessibility improvement
                    {...register(name)}
                    {...rest}
                    className={selectClasses}
                >
                    {children}
                </select>

                {/* Custom Dropdown Icon */}
                {/* <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-text-secondary">
                    <svg
                        className="fill-current h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                    >
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                </div> */}
            </div>

            {/* Error Message */}
            {error && (
                <p className="text-red-500 text-xs mt-1">{error.message}</p>
            )}
        </div>
    );
};

export default Select;
