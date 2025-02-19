import React from 'react';
import Image from 'next/image';
import { IMAGES, SVGS } from '@crowdcareaid-frontend/assets';
import { Button, Text } from '@crowdcareaid-frontend/next-components';

const userData = {
  name: 'Jane Cooper',
  mail: 'janecooper@gmail.com',
  gender: 'Male',
  DOB: '15-11-1996',
  phone: '(603) 555-0123',
  Location: 'New York',
};

const campaignData = {
  title: 'Education For Children',
  category: 'Education',
  location: 'Houston',
  amount: '$1,250',
  duration: '12-09-2024  18-09-2024',
  raisedAmount: '$625',
  images: [IMAGES.Background, IMAGES.Background, IMAGES.Background],
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed luctus cursus euismod. Nunc vel tristique leo. Quisque eu nunc vel erat condimentum gravida. Etiam blandit viverra libero, et ullamcorper nisl ultricies sed. Sed auctor accumsan elit et pharetra. Fusce ultricies faucibus hendrerit. Nunc mollis imperdiet mauris non tincidunt',
};

const campaignAttributes = [
  { label: 'Title', value: 'Education For Children' },
  { label: 'Category', value: 'Education' },
  { label: 'Location', value: 'Houston' },
  { label: 'Amount', value: `$1,250` },
  {
    label: 'Duration',
    value: `12-09-2024 - 18-09-2024`,
  },
  { label: 'Amount Raised', value: `625` },
];

const UserCampaignDetails: React.FC = () => {
  return (
    <div className="mx-2 mt-14 md:mx-10 md:mt-5">
      <div className="flex flex-col w-full items-center bg-[#FFFFFF] rounded-[10px] space-y-[25px] my-6 py-6">
        <div className="flex justify-between items-center w-full px-5">
          <Text className="text-[30px] font-serif text-darkGreen  justify-start ">
            Creator Campaign
          </Text>

          <Image
            src={IMAGES.UserProfileImage}
            alt="User"
            className="w-[45px] h-[45px] rounded-full"
            width={128}
            height={128}
          />
        </div>

        <div className="h-auto w-full pt-5 mt-2 grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
          <div className="grid grid-cols-2 px-5">
            <Text className="text-sm font-normal text-[#858585]">Name</Text>
            <Text className="text-base font-medium">{userData.name}</Text>
          </div>

          <hr className="md:hidden w-full col-span-2 h-0.5 text-[#858585]" />

          <div className="grid grid-cols-2 px-5">
            <Text className="text-sm font-normal text-[#858585]">Gender</Text>
            <Text className="text-base font-medium">{userData.gender}</Text>
          </div>

          <hr className="col-span-2 h-0.5 text-[#858585]" />

          <div className="grid grid-cols-2 px-5">
            <Text className="text-sm font-normal text-[#858585]">Mail</Text>
            <Text className="text-base font-medium">{userData.mail}</Text>
          </div>

          <hr className="md:hidden w-full col-span-2 h-0.5 text-[#858585]" />

          <div className="grid grid-cols-2 px-5">
            <Text className="text-sm font-normal text-[#858585]">
              Date of Birth
            </Text>
            <Text className="text-base font-medium">{userData.DOB}</Text>
          </div>

          <hr className="col-span-2 h-0.5 text-[#858585]" />

          <div className="grid grid-cols-2 px-5">
            <Text className="text-sm font-normal text-[#858585]">Phone</Text>
            <Text className="text-base font-medium">{userData.phone}</Text>
          </div>

          <hr className="col-span-2 h-0.5 " />

          <div className="grid grid-cols-2 px-5">
            <Text className="text-sm font-normal text-[#858585]">Location</Text>
            <Text className="text-base font-medium">{userData.Location}</Text>
          </div>

          <hr className="col-span-2 h-0.5 text-[#858585]" />
        </div>
      </div>

      <div className="flex flex-col w-full items-center bg-[#FFFFFF] rounded-[10px] space-y-8 my-6 pt-4 py-5">
        <Text className="text-[30px] font-serif text-darkGreen text-left w-full px-5 justify-start ">
          Campaign Details
        </Text>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-y-4">
          <div className="space-y-4">
            {campaignAttributes.map((attr, index) => (
              <div key={index}>
                <div className="grid grid-cols-2 px-5">
                  <Text className="text-sm font-normal text-[#858585]">
                    {attr.label}
                  </Text>
                  <Text className="text-base font-medium">{attr.value}</Text>
                </div>

                <hr className="border-t border-gray-300 my-2" />
              </div>
            ))}
          </div>

          <div className="space-y-4 px-5">
            <div className="space-y-2 flex flex-col items-start">
              <Text className="text-sm font-normal text-[#858585]">
                Description
              </Text>
              <Text className="text-sm font-medium border border-[#858585] rounded-md p-3">
                {campaignData.description}
              </Text>
            </div>

            {campaignData.images && campaignData.images.length > 0 && (
              <div className="grid grid-cols-2">
                <Text className="text-sm font-normal text-[#858585]">
                  Images
                </Text>
                <div className="flex flex-wrap space-x-2">
                  {campaignData.images.map((image, index) => (
                    <Image
                      key={index}
                      src={image}
                      alt={`Campaign image ${index + 1}`}
                      className="w-[43px] h-[43px] object-cover rounded-full"
                      width={128}
                      height={128}
                    />
                  ))}
                </div>
              </div>
            )}

            <hr className="h-0.5 text-lightGray col-span-2" />

            <div className="grid grid-cols-2">
              <Text className="text-sm font-normal text-[#858585]">
                Amount Target
              </Text>
              <Text className="text-base font-medium">
                ${campaignData.amount}
              </Text>
            </div>

            <hr className="col-span-2 h-0.5 text-lightGray" />
          </div>
        </div>

        <div className="flex justify-end w-full px-5">
          <Button className="w-[220px] mb-7 bg-greenPrimary font-medium text-sm">
            Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserCampaignDetails;
