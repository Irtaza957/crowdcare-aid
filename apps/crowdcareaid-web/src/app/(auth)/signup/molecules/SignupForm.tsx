'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Button,
  Input,
  useToast,
} from '@crowdcareaid-frontend/next-components';
import { signup } from '@crowdcareaid-frontend/next-actions';
import { Schema } from '@crowdcareaid-frontend/next-actions';
import { useRouter } from 'next/navigation';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@crowdcareaid-frontend/next-components';
import { z } from 'zod';
import { useState } from 'react';

type SignUpHandlerPayload = z.infer<typeof Schema.SignUp>;

const SignupForm = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(Schema.SignUp),
    defaultValues: {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: SignUpHandlerPayload) => {
    const payload = {
      email: data.email,
      password: data.password,
      firstName: data.firstName,
      lastName: data.lastName,
    };

    setLoading(true);

    try {
      const result = await signup(payload);
      if (result.success) {
        toast({
          title: 'Congratulations',
          description: 'User Registered Successfully',
        });
        router.push('/otpVerification');
      } else {
        toast({
          variant: 'destructive',
          title: 'Signup failed',
          description: result.message,
        });
      }
    } catch (error) {
      let errorMessage = 'An unexpected error occurred. Please try again.';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      toast({
        variant: 'destructive',
        title: 'Signup failed',
        description: errorMessage,
      });
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full space-y-6 py-6"
      >
        <div className="flex flex-row justify-between items-center space-x-2">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input type="text" placeholder="First Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input type="text" placeholder="Last Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="email" placeholder="Enter Your Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Enter Your Password"
                  passcode={true}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Confirm Your Password"
                  passcode={true}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          isLoading={loading}
          className="w-full h-12 bg-darkGreen hover:bg-darkGreen"
        >
          Signup
        </Button>
      </form>
    </Form>
  );
};

export default SignupForm;
