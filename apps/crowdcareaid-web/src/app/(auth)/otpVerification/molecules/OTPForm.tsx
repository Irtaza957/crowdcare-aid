'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Text, useToast } from '@crowdcareaid-frontend/next-components';
import { verifyOTP, resendOTP } from '@crowdcareaid-frontend/next-actions';
import { Schema } from '@crowdcareaid-frontend/next-actions';
import { useRouter } from 'next/navigation';

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@crowdcareaid-frontend/next-components';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@crowdcareaid-frontend/next-components';
import { z } from 'zod';
import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

interface OTPFormProps {
  email: string;
  routeTo: string;
}

type OTPVerificationHandlerPayload = z.infer<typeof Schema.OTPVerification>;

const OTPForm = ({ email, routeTo }: OTPFormProps) => {
  // hooks
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(90);

  const form = useForm({
    resolver: zodResolver(Schema.OTPVerification),
    defaultValues: {
      otp: '',
    },
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleResendOTP = useCallback(async () => {
    const payload = {
      email,
    };

    try {
      const result = await resendOTP(payload);
      if (result?.success) {
        toast({
          title: 'OTP Resent Successfully',
        });
        setTimer(90);
      } else {
        toast({
          variant: 'destructive',
          title: 'Failed to Resend OTP',
          description: result.message,
        });
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'An unexpected error occurred. Please try again.';
      console.error('Failed to Resend OTP', error);
      toast({
        variant: 'destructive',
        title: 'Failed to Resend OTP',
        description: errorMessage,
      });
    }
  }, [email, toast]);

  const onSubmit = useCallback(
    async (data: OTPVerificationHandlerPayload) => {
      const payload = {
        email,
        otp: data.otp,
      };

      setLoading(true);

      try {
        const result = await verifyOTP(payload);
        if (result?.success) {
          toast({
            title: 'OTP Verified Successfully',
          });
          if (routeTo) {
            router.push(routeTo);
          }
        } else {
          toast({
            variant: 'destructive',
            title: 'OTP Verification Failed',
            description: result.message,
          });
        }
      } catch (error) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : 'An unexpected error occurred. Please try again.';
        console.error('OTP Verification Failed', error);
        toast({
          variant: 'destructive',
          title: 'OTP Verification Failed',
          description: errorMessage,
        });
      } finally {
        setLoading(false);
      }
    },
    [email, routeTo, router, toast]
  );

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(
      remainingSeconds
    ).padStart(2, '0')}`;
  };

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-6 py-6 flex flex-col justify-center items-center"
        >
          <FormField
            control={form.control}
            name="otp"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <InputOTP maxLength={4} {...field}>
                    <InputOTPGroup className="space-x-4">
                      {Array.from({ length: 4 }).map((_, index) => (
                        <InputOTPSlot
                          key={index}
                          className="rounded-md shadow-md border border-borderGray"
                          index={index}
                        />
                      ))}
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full h-12 bg-brownOrange hover:bg-brownOrange"
            isLoading={loading}
          >
            Verify OTP
          </Button>
        </form>
      </Form>
      <div className="mt-4 flex flex-row items-center justify-center space-x-1">
        <Text variant={'sub'}>Did not receive the OTP?</Text>
        {timer > 0 ? (
          <div className="text-brownOrange text-sm font-bold cursor-not-allowed font-poppins">
            {formatTime(timer)}
          </div>
        ) : (
          <Link
            className="text-brownOrange text-sm font-bold underline font-poppins"
            onClick={handleResendOTP}
            href="#"
          >
            Resend OTP
          </Link>
        )}
      </div>
    </div>
  );
};

export default OTPForm;
