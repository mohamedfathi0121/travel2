import { z } from 'zod';


// Schema for the Login Page
export const loginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(1, 'Password is required'),
});


export const step1Schema = z.object({
    fullName: z.string().min(1, 'Full name is required'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

export const step2Schema = z.object({
    age: z.number({ invalid_type_error: "Age is required" }).min(18, 'You must be at least 18 years old'),
    gender: z.string().min(1, 'Gender is required'),
    dob: z.string().regex(/^\d{2}\/\d{2}\/\d{4}$/, 'Date of birth must be in MM/DD/YYYY format'),
    country: z.string().min(1, 'Country is required'),
    city: z.string().min(1, 'City is required'),
});

export const step3Schema = z.object({
    profilePhoto: z.any().optional(),
});

