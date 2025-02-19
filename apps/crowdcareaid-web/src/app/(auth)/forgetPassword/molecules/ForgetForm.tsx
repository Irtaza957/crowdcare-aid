'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Button,
  Input,
  useToast,
} from '@crowdcareaid-frontend/next-components';
import { resetPassword } from '@crowdcareaid-frontend/next-actions';
import { Schema } from '@crowdcareaid-frontend/next-actions';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@crowdcareaid-frontend/next-components';
import { z } from 'zod';

type ResetPasswordHandlerPayload = z.infer<typeof Schema.ResetPassword>;

const ForgetForm = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(Schema.ResetPassword),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data: ResetPasswordHandlerPayload) => {
    const payload = {
      email: data.email,
    };

    setLoading(true);

    try {
      const result = await resetPassword(payload);
      if (result?.success) {
        toast({
          title: 'OTP Sent Successfully',
        });
        router.push('/otpVerification');
      } else {
        toast({
          variant: 'destructive',
          title: 'Reset Password Failed',
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
        title: 'Reset Password Failed',
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
        <Button
          type="submit"
          isLoading={loading}
          className="w-full h-12 bg-brownOrange hover:bg-brownOrange"
        >
          Send Email
        </Button>
      </form>
    </Form>
  );
};

export default ForgetForm;
