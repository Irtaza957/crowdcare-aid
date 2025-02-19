'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FormProvider, useFormContext } from 'react-hook-form';
import * as z from 'zod';
import { useState } from 'react';
import { Step, Stepper, toast } from '@crowdcareaid-frontend/next-components';
import {
  createCampaign,
  Schema,
  uploadImages,
} from '@crowdcareaid-frontend/next-actions';
import { FirstStepForm } from './FirstStep';
import { SecondStepForm } from './SecondStep';
import { ThirdStepForm } from './ThirdStep';
import { steps } from './data';

interface UploadedImage {
  url: string;
  file: File;
}

export default function StepperForm({ categoryData = [] }) {
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<UploadedImage[]>([]);

  const form = useForm({
    resolver: zodResolver(Schema.CreateCampaignSchema),
    defaultValues: {
      title: '',
      location: '',
      category: '',
      amount: '',
      duration: [],
      description: '',
      images: [''],
    },
  });

  const handleImageUpload = async () => {
    const payload = { image: images.map((i) => i.file) }; // Pass the files directly
    console.log('Payload:', payload);

    try {
      const result = await uploadImages(payload); // Call the client-side upload function
      console.log('Upload result:', result);

      if (result.success) {
        return result;
      } else {
        console.error('Upload failed:', result.message);
      }
    } catch (error) {
      console.error('Error uploading images:', error);
    }
  };

  const onSubmit = async (
    formData: z.infer<typeof Schema.CreateCampaignSchema>
  ) => {
    setLoading(true);
    const uploadResult = await handleImageUpload();
    console.log('uploadResult', uploadResult);
    const formattedFormData = {
      ...formData,
      duration: formData.duration,
      images: ['12345'],
    };

    console.log('FormData', formData);
    console.log('FData', formattedFormData);
    // try {
    //   const result = await createCampaign(formattedFormData);
    //   if (result.success) {
    //     toast({
    //       title: 'Congratulations',
    //       description: 'Campaign Created Successfully',
    //     });
    //   } else {
    //     toast({
    //       variant: 'destructive',
    //       title: 'Campaign Creation Failed',
    //       description: result.message,
    //     });
    //   }
    // } catch (error) {
    //   let errorMessage = 'An unexpected error occurred. Please try again.';
    //   if (error instanceof Error) {
    //     errorMessage = error.message;
    //   }
    //   toast({
    //     variant: 'destructive',
    //     title: 'Campaign Creation Failed',
    //     description: errorMessage,
    //   });
    // } finally {
    //   setLoading(false);
    // }
  };

  return (
    <FormProvider {...form}>
      <div className="flex w-full flex-col gap-4">
        <Stepper
          orientation={'vertical'}
          variant="circle-alt"
          initialStep={0}
          steps={steps}
        >
          {steps.map((stepProps, index) => {
            if (index === 0) {
              return (
                <Step
                  key={stepProps.label}
                  {...stepProps}
                  className="bg-darkGreen text-white"
                >
                  <FirstStepForm categoryData={categoryData} form={form} />
                </Step>
              );
            }
            if (index === 1) {
              return (
                <Step
                  key={stepProps.label}
                  {...stepProps}
                  className="bg-darkGreen text-white"
                >
                  <SecondStepForm
                    form={form}
                    images={images}
                    setImages={setImages}
                  />
                </Step>
              );
            }
            return (
              <Step key={stepProps.label} {...stepProps}>
                <ThirdStepForm
                  onSubmit={form.handleSubmit(onSubmit)}
                  formData={form.getValues()}
                  loading={loading}
                  images={images}
                />
              </Step>
            );
          })}
        </Stepper>
      </div>
    </FormProvider>
  );
}
