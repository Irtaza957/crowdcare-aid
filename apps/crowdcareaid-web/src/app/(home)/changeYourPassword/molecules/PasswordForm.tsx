'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Button,
  Input,
  useToast,
} from '@crowdcareaid-frontend/next-components';
import { changePassword, Schema } from '@crowdcareaid-frontend/next-actions';

interface PasswordFormProps {
  email: string;
}

type ChangePasswordHandlerPayload = z.infer<typeof Schema.ChangeYourPassword>;

const PasswordForm = ({ email }: PasswordFormProps) => {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(Schema.ChangeYourPassword),
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: ChangePasswordHandlerPayload) => {
    const payload = {
      email: email,
      newPassword: data.newPassword,
    };

    setLoading(true);

    try {
      const result = await changePassword(payload);
      if (result?.success) {
        toast({
          title: 'Password Updated Successfully',
        });
        router.push('/login');
      } else {
        toast({
          variant: 'destructive',
          title: 'Password Update Failed',
          description: result.message,
        });
      }
    } catch (error) {
      let errorMessage =
        'An error occurred while updating the password. Please try again later.';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      toast({
        variant: 'destructive',
        title: 'Password Update Failed',
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
        className="w-full flex flex-col justify-between items-start h-full"
      >
        <div className="w-full space-y-6 py-6">
          <FormField
            control={form.control}
            name="oldPassword"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Old Password"
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
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="New Password"
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
                    placeholder="Confirm Password"
                    passcode={true}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button
          type="submit"
          isLoading={loading}
          className="w-full h-12  bg-darkGreen hover:bg-darkGreen "
        >
          Continue
        </Button>
      </form>
    </Form>
  );
};

export default PasswordForm;
