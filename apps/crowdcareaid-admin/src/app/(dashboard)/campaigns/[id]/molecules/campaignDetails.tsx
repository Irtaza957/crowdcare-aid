import Image from 'next/image';
import { Button, Text } from '@crowdcareaid-frontend/next-components';
import { IMAGES, SVGS } from '@crowdcareaid-frontend/assets';
import { getAllCampaigns } from '@crowdcareaid-frontend/next-actions';

export default async function CampaignDetails() {
  return (
    <div className="flex flex-col w-full items-center bg-[#FFFFFF] rounded-md space-y-8 mx-4 my-6 px-5 py-8">
      <Text className="text-[30px] font-serif text-darkGreen text-left w-full px-5 justify-start ">
        Campaigns
      </Text>
      <div className="bg-[#FFFFFF] h-auto w-[100%] rounded-[10px] min-h-[80%] px-5 py-6 mt-2 shadow-md flex flex-col justify-start space-y-[25px]">
        <div className="flex justify-between items-center">
          <Text className="text-[20px] font-medium text-darkGreen text-left w-full">
            Fund for children education
          </Text>

          <SVGS.ArrowDown />
        </div>

        <p className="font-normal text-sm">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>

        <div className="flex items-center space-x-[15px]">
          <Image
            src={IMAGES.Background}
            alt="User"
            className="w-[120px] h-[68px] rounded-[5px]"
            width={128}
            height={128}
          />
          <Image
            src={IMAGES.Background}
            alt="User"
            className="w-[120px] h-[68px] rounded-[5px]"
            width={128}
            height={128}
          />
          <Image
            src={IMAGES.Background}
            alt="User"
            className="w-[120px] h-[68px] rounded-[5px]"
            width={128}
            height={128}
          />
          <Image
            src={IMAGES.Background}
            alt="User"
            className="w-[120px] h-[68px] rounded-[5px]"
            width={128}
            height={128}
          />
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-[10px]">
            <Text className="text-sm font-normal text-[#858585]">
              Amount Target
            </Text>
            <Text className="text-xl font-medium">$1,000</Text>
          </div>
          <div className="flex items-center space-x-[10px]">
            <Text className="text-sm font-normal text-[#858585]">
              Fundraiser
            </Text>
            <Text className="text-xl font-medium">$1,000</Text>
          </div>
        </div>

        <div className="flex justify-end items-center border-b-4 border-primary">
          <Text className="text-sm font-normal">%100</Text>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex flex-col justify-start space-y-[8px]">
            <Text className="text-sm font-normal text-[#858585]">
              Duration Date
            </Text>
            <Text className="text-sm font-normal">15-06-2024 20-06-2024</Text>
          </div>
          <div className="flex items-center space-x-[10px]">
            <div className="flex flex-col justify-start space-y-[8px]">
              <Text className="text-sm font-normal text-[#858585]">
                Location
              </Text>
              <Text className="text-sm font-normal">New York</Text>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex flex-col justify-start space-y-[8px]">
            <Text className="text-sm font-normal text-[#858585]">Category</Text>
            <Text className="text-sm font-normal">Education</Text>
          </div>
          <div className="flex items-center space-x-[10px]">
            <div className="flex flex-col justify-start space-y-[8px]">
              <Text className="text-sm font-normal text-[#858585]">
                Category
              </Text>
              <Text className="text-sm font-normal">Jane Cooper</Text>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end w-full">
        <Button className="w-[220px] mb-7 bg-greenPrimary font-medium text-sm">
          Back
        </Button>
      </div>
    </div>
  );
}
