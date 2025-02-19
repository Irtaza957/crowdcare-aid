'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Button,
  Input,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  useToast,
} from '../../src';
import { login } from '@crowdcareaid-frontend/next-actions';
import { Schema } from '@crowdcareaid-frontend/next-actions';
import { useRouter } from 'next/navigation';
import { z } from 'zod';

interface LoginProps {
  isAdmin?: boolean;
}

type LoginHandlerPayload = z.infer<typeof Schema.Login>;

const LoginForm = ({ isAdmin }: LoginProps) => {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(Schema.Login),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginHandlerPayload) => {
    const payload = {
      email: data.email,
      password: data.password,
      loginType: 'email',
      userType: isAdmin ? 'admin' : 'user',
    };

    setLoading(true);

    try {
      const result = await login(payload);
      if (result.success) {
        toast({
          title: 'Congratulations',
          description: 'User Logged In Successfully',
        });
        isAdmin ? router.push('/dashboard') : router.push('/home');
      } else {
        toast({
          variant: 'destructive',
          title: 'Login failed',
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
        title: 'Login Failed',
        description: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full space-y-6 py-6"
      >
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
                  passcode={true}
                  placeholder="Enter Your Password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-col justify-end items-end space-y-4 w-full">
          {!isAdmin && (
            <Button
              onClick={() => {
                router.push('/forgetPassword');
              }}
              className="bg-white text-brownOrange underline hover:bg-white z-50"
            >
              Forgot Password
            </Button>
          )}

          <Button
            type="submit"
            isLoading={loading}
            className="w-full h-12 bg-darkGreen hover:bg-darkGreen"
          >
            Login
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default LoginForm;
