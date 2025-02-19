import { z } from 'zod';

const Login = z.object({
  email: z.string().email({ message: 'Invalid email address.' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters.' }),
});

const SignUp = z
  .object({
    firstName: z.string().min(1, { message: 'First name is required' }),
    lastName: z.string().min(1, { message: 'Last name is required' }),
    email: z.string().email({ message: 'Invalid email address.' }),
    password: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters.' }),
    confirmPassword: z
      .string()
      .min(1, { message: 'Please confirm your password' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

const ResetPassword = z.object({
  email: z.string().email({ message: 'Invalid email address.' }),
});

const ChangePassword = z
  .object({
    newPassword: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters.' }),
    confirmPassword: z
      .string()
      .min(1, { message: 'Please confirm your password' }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

const ChangeYourPassword = z
  .object({
    oldPassword: z
      .string()
      .min(6, { message: 'Old password must not be empty.' }),
    newPassword: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters.' }),
    confirmPassword: z
      .string()
      .min(1, { message: 'Please confirm your password' }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

const OTPVerification = z.object({
  otp: z.string().min(4, {
    message: 'Your one-time password must be 4 characters.',
  }),
});

const EditUser = z.object({
  firstName: z.string().min(1, { message: 'First name is required' }),
  lastName: z.string().min(1, { message: 'Last name is required' }),
  aboutMe: z.string().optional(),
  phone: z
    .string()
    .min(10, { message: 'Phone number must be at least 10 digits' }),
  country: z.string().min(2, { message: 'Country is required' }),
  region: z.string().optional(),
  dob: z.date({ message: 'Date of birth is required' }),
  gender: z.string().min(1, { message: 'Gender is required' }),
});

const CreateCampaignSchema = z.object({
  title: z.string().min(2, { message: 'Title must be at least 2 characters.' }),
  location: z
    .string()
    .min(2, { message: 'Location must be at least 2 characters.' }),
  category: z.string().nonempty({ message: 'Please select a category.' }),
  amount: z.string().min(1, { message: 'Amount is required.' }),
  duration: z
    .array(z.date())
    .nonempty({ message: 'Please select a date range.' }),
  description: z
    .string()
    .max(500, { message: 'Description must be less than 500 characters.' }),
});

export const Schema = {
  Login,
  SignUp,
  ResetPassword,
  ChangePassword,
  OTPVerification,
  EditUser,
  CreateCampaignSchema,
  ChangeYourPassword,
};
