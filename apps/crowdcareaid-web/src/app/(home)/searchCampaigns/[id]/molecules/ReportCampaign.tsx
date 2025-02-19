'use client';

import React, { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  Button,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  RadioGroup,
  RadioGroupItem,
  Textarea,
  useToast,
} from '@crowdcareaid-frontend/next-components';

const FormSchema = z.object({
  type: z.enum(
    [
      'Identity fraud',
      'Undesirable or harmful',
      'Publication of inappropriate contents',
      'Harassment or bullying',
      'Other',
    ],
    {
      required_error: 'You need to select a report reason.',
    }
  ),
  description: z.string().optional(),
});

const ReportCampaign: React.FC = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [selectedReason, setSelectedReason] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: 'You submitted the following values:',
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });

    form.resetFields();

    setIsOpen(false);
  }

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline">Open Drawer</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full px-12">
          <DrawerHeader>
            <DrawerTitle className="text-2xl font-medium text-[#1A3F1E]">
              Report the user
            </DrawerTitle>
            <DrawerDescription className="text-sm font-normal text-[#858585]">
              Please help us and select a reason to understand what is going on.
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0">
            <Form {...form}>
              <form className="space-y-6">
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormControl>
                        <RadioGroup
                          onValueChange={(value) => {
                            field.onChange(value);
                            setSelectedReason(value);
                          }}
                          defaultValue={field.value}
                          className="flex flex-col space-y-4"
                        >
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormItem className="flex items-center justify-between bg-white rounded-md px-6 py-4 shadow-md">
                              <FormLabel className="font-normal">
                                Identity fraud
                              </FormLabel>
                              <FormControl>
                                <RadioGroupItem value="Identity fraud" />
                              </FormControl>
                            </FormItem>

                            <FormItem className="flex items-center justify-between bg-white rounded-md px-6 py-4 shadow-md">
                              <FormLabel className="font-normal">
                                Undesirable or harmful
                              </FormLabel>
                              <FormControl>
                                <RadioGroupItem value="Undesirable or harmful" />
                              </FormControl>
                            </FormItem>

                            <FormItem className="flex items-center justify-between bg-white rounded-md px-6 py-4 shadow-md">
                              <FormLabel className="font-normal">
                                Publication of inappropriate contents
                              </FormLabel>
                              <FormControl>
                                <RadioGroupItem value="Publication of inappropriate contents" />
                              </FormControl>
                            </FormItem>

                            <FormItem className="flex items-center justify-between bg-white rounded-md px-6 py-4 shadow-md">
                              <FormLabel className="font-normal">
                                Harassment or bullying
                              </FormLabel>
                              <FormControl>
                                <RadioGroupItem value="Harassment or bullying" />
                              </FormControl>
                            </FormItem>

                            <FormItem className="flex items-center justify-between bg-white rounded-md px-6 py-4 shadow-md">
                              <FormLabel className="font-normal">
                                Other
                              </FormLabel>
                              <FormControl>
                                <RadioGroupItem value="Other" />
                              </FormControl>
                            </FormItem>
                          </div>
                        </RadioGroup>
                      </FormControl>

                      {selectedReason === 'Other' && (
                        <FormItem className="space-y-3">
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="enter report details here."
                              {...form.register('description')}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </div>
          <DrawerFooter className="flex flex-row justify-between items-center w-full space-x-11">
            <Button
              type="button"
              onClick={form.handleSubmit(onSubmit)}
              className="w-full h-12 bg-darkGreen hover:bg-darkGreen"
            >
              Submit
            </Button>
            <DrawerClose asChild>
              <Button className="w-full h-12 bg-transparent " variant="outline">
                Cancel
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default ReportCampaign;
