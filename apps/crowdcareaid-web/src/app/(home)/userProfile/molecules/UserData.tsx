'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import {
  Button,
  FormLabel,
  Input,
  useToast,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Textarea,
  Text,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  DatePicker,
  PhoneInputComponent,
} from '@crowdcareaid-frontend/next-components';
import { editUserById, Schema } from '@crowdcareaid-frontend/next-actions';
import { z } from 'zod';
import {
  SVGS,
  userProfileContributionData,
} from '@crowdcareaid-frontend/assets';
import { useState } from 'react';
import Image from 'next/image';

type EditUserHandlerPayload = z.infer<typeof Schema.EditUser>;

interface UserDataProps {
  data: UserData;
}

const genderOptions = [
  { value: 'Male', label: 'Male' },
  { value: 'Female', label: 'Female' },
  { value: 'Other', label: 'Other' },
];

const UserData = ({ data }: UserDataProps) => {
  console.log('Dtaa', data);
  const { toast } = useToast();
  const userName = `${data?.firstName} ${data?.lastName}`;
  const [isEditable, setIsEditable] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState(data?.profileImageUrl || '');
  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(Schema.EditUser),
    defaultValues: {
      firstName: data?.firstName,
      lastName: data?.lastName,
      aboutMe: data?.aboutMe || '',
      phone: data?.phone || '',
      country: data?.country || '',
      region: data?.region || '',
      dob: data?.dob,
      gender: data?.gender || '',
    },
  });

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setSelectedImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (data: EditUserHandlerPayload) => {
    const dob = Array.isArray(data.dob) ? data.dob[0] : data.dob;
    const dobString = dob instanceof Date ? format(dob, 'yyyy-MM-dd') : '';

    const payload = {
      firstName: data.firstName,
      lastName: data.lastName,
      aboutMe: data.aboutMe || '',
      phone: data.phone,
      dob: dobString,
      country: data.country,
      gender: data.gender,
      region: data.region || '',
    };

    setLoading(true);
    try {
      const result = await editUserById(payload);
      if (result?.success) {
        toast({
          title: 'User Information Updated Successfully',
        });
        setIsEditable(false);
      } else {
        toast({
          variant: 'destructive',
          title: 'Failed To Update User Details',
          description: result?.message,
        });
      }
    } catch (error) {
      let errorMessage = 'An unexpected error occurred. Please try again.';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      console.error('Failed To Update User Details', error);
      toast({
        variant: 'destructive',
        title: 'Failed To Update User Details',
        description: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col justify-between items-center">
      <div className="w-4/5 flex flex-row justify-between items-center">
        <div className="w-1/2 flex flex-row justify-start items-center">
          <div className="relative">
            {previewImage ? (
              <Image
                src={previewImage}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover"
                width={128}
                height={128}
              />
            ) : (
              <SVGS.UserProfile />
            )}
            {isEditable && (
              <>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  id="profileImageInput"
                  onChange={handleImageChange}
                />
                <label
                  htmlFor="profileImageInput"
                  className="absolute top-0 right-0 flex items-center justify-center bg-darkGreen border-2 border-white text-white rounded-full p-2 cursor-pointer"
                >
                  <SVGS.EditWhite />
                </label>
              </>
            )}
          </div>
          <div className="flex flex-col justify-center items-start ml-4">
            <Text variant="profile">{userName}</Text>
            <Text variant="sub">{data?.email}</Text>
            <Text variant="sub">{data?.country}</Text>
          </div>
        </div>
        <div className="w-1/2 flex flex-row justify-end items-center">
          <Button
            className="bg-[#F0F4F7] px-7 py-4"
            onClick={() => setIsEditable(true)}
          >
            <div className="flex flex-row justify-center items-center space-x-3">
              <Text variant={'edit'}>Edit</Text>
              <SVGS.Edit />
            </div>
          </Button>
        </div>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-4/5 space-y-6 py-6"
        >
          <div className="flex flex-row justify-between items-center space-x-10">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem className="w-1/2">
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="First Name"
                      {...field}
                      disabled={!isEditable}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem className="w-1/2">
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Last Name"
                      {...field}
                      disabled={!isEditable}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-row justify-between items-center space-x-10">
            <FormField
              control={form.control}
              name="dob"
              render={({ field: { value, onChange } }) => (
                <FormItem className="w-1/2 flex flex-col space-y-3 pt-2">
                  <FormLabel>Date of birth</FormLabel>
                  <FormControl>
                    <DatePicker
                      value={value}
                      onChange={(val) => onChange(val[0])}
                      disabled={!isEditable}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field: { value, onChange } }) => (
                <FormItem className="w-1/2">
                  <FormLabel>Contact Number</FormLabel>
                  <FormControl>
                    <PhoneInputComponent
                      value={value}
                      onChange={onChange}
                      placeholder="Enter your phone number"
                      className="h-12 w-full bg-white"
                      disabled={!isEditable}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="aboutMe"
            render={({ field }) => (
              <FormItem>
                <FormLabel>About</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter some information about yourself"
                    {...field}
                    disabled={!isEditable}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex flex-row justify-between items-center space-x-10">
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem className="w-1/2">
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Your Location"
                      {...field}
                      disabled={!isEditable}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem className="w-1/2">
                  <FormLabel>Gender</FormLabel>
                  <FormControl>
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                      disabled={!isEditable}
                    >
                      <SelectTrigger>
                        <SelectValue
                          className="font-poppins text-sm text-black font-bold"
                          placeholder="Select Your Gender"
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {genderOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {isEditable && (
            <div className="flex space-x-[50px]">
              <Button
                onClick={() => {
                  form.reset();
                  setIsEditable(false);
                }}
                isLoading={loading}
                className="w-full h-12 bg-transparent text-black border rounded-md"
              >
                Back
              </Button>

              <Button
                type="submit"
                isLoading={loading}
                className="w-full h-12 bg-darkGreen hover:bg-darkGreen"
              >
                Signup
              </Button>
            </div>
          )}
        </form>
      </Form>

      {!isEditable && (
        <div className="flex flex-col space-y-3 w-4/5">
          <Text className="font-bold text-2xl text-[#1A3F1E]">
            Contribution
          </Text>

          <div className="flex space-x-[0.5px] h-64 w-full">
            {userProfileContributionData.map((row, index) => (
              <div
                key={index}
                className={`flex flex-col justify-center items-center h-full w-1/3 bg-[#EA7E24] ${
                  index === 0
                    ? 'rounded-tl-md rounded-bl-md'
                    : index === 2
                    ? 'rounded-tr-md rounded-br-md'
                    : ''
                }`}
              >
                <Text className="font-normal text-2xl text-white">
                  {row.value}
                </Text>
                <Text className="font-normal text-2xl text-white">
                  {row.label}
                </Text>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserData;
