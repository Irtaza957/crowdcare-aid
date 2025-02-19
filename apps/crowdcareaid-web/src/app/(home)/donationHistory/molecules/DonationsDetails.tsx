import Image from 'next/image';
import { Button, Progress, Text } from '@crowdcareaid-frontend/next-components';
import { IMAGES, SVGS } from '@crowdcareaid-frontend/assets';

export default function DonationsDetails() {
  return (
    <div className="flex flex-col w-full items-center bg-[#FFFFFF] space-y-8">
      <div className="bg-[#FFFFFF] h-auto w-[100%] rounded-[10px] min-h-[80%] px-5 py-6 mt-2 shadow-md flex flex-col justify-start space-y-[25px]">
        <div className="flex justify-between items-center">
          <Text className="text-xl font-medium font-poppins text-darkGreen text-left w-full">
            Fund for children education
          </Text>
          {/* <SVGS.LeftArrow className="-rotate-[90deg]" /> */}
        </div>

        <Text className="font-normal text-sm font-poppins">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Text>

        <div className="flex items-center space-x-[15px]">
          <Image
            src={IMAGES.Background}
            alt="User"
            width={70}
            height={40}
            className="rounded-md"
          />
          <Image
            src={IMAGES.Background}
            alt="User"
            width={70}
            height={40}
            className="rounded-md"
          />
          <Image
            src={IMAGES.Background}
            alt="User"
            width={70}
            height={40}
            className="rounded-md"
          />
          <Image
            src={IMAGES.Background}
            alt="User"
            width={70}
            height={40}
            className="rounded-md"
          />
        </div>

        <div className="flex flex-row justify-between items-center min-w-full">
          <div className="flex flex-row items-center space-x-3 w-1/2">
            <Text className="text-sm font-normal font-poppins text-darkGray">
              Amount Target
            </Text>
            <Text className="text-xl font-medium font-poppins text-black">
              $1,000
            </Text>
          </div>
          <div className="flex items-center justify-end space-x-3 w-1/2">
            <Text className="text-sm font-normal text-darkGray">
              Fundraiser
            </Text>
            <Text className="text-xl font-medium font-poppins text-black">
              $1,000
            </Text>
          </div>
        </div>
        <div className="w-full flex flex-row justify-end items-end">
          <Text className="text-base text-black font-medium font-poppins text-right -mb-2">
            87%
          </Text>
        </div>
        <Progress value={(87 / 100) * 100} />

        <div className="flex flex-row justify-between items-center min-w-full">
          <div className="flex flex-col justify-start space-y-2">
            <Text className="text-sm font-normal font-poppins text-darkGray">
              Duration Date
            </Text>
            <Text className="text-sm font-normal text-black font-poppins">
              15-06-2024 20-06-2024
            </Text>
          </div>
          <div className="flex flex-col justify-start space-y-2">
            <Text className="text-sm font-normal font-poppins text-darkGray">
              Location
            </Text>
            <Text className="text-sm font-normal text-black font-poppins">
              New York
            </Text>
          </div>
        </div>
      </div>
      <div className="bg-[#FFFFFF] h-auto w-[100%] rounded-[10px] min-h-[80%] px-5 py-6 mt-2 shadow-md flex flex-col justify-start space-y-[25px]">
        <div className="flex justify-between items-center">
          <Text className="text-xl font-medium font-poppins text-darkGreen text-left w-full">
            Fund for children education
          </Text>
          {/* <SVGS.LeftArrow className="-rotate-[90deg]" /> */}
        </div>

        <div className="flex flex-row justify-between items-center min-w-full">
          <div className="flex flex-row items-center space-x-3 w-1/2">
            <Text className="text-sm font-normal font-poppins text-darkGray">
              Amount Target
            </Text>
            <Text className="text-xl font-medium font-poppins text-black">
              $1,000
            </Text>
          </div>
          <div className="flex items-center justify-end space-x-3 w-1/2">
            <Text className="text-sm font-normal text-darkGray">
              Fundraiser
            </Text>
            <Text className="text-xl font-medium font-poppins text-black">
              $1,000
            </Text>
          </div>
        </div>
        <div className="w-full flex flex-row justify-end items-end">
          <Text className="text-base text-black font-medium font-poppins text-right -mb-2">
            87%
          </Text>
        </div>
        <Progress value={(87 / 100) * 100} />

        <div className="flex flex-row justify-between items-center min-w-full">
          <div className="flex flex-col justify-start space-y-2">
            <Text className="text-sm font-normal font-poppins text-darkGray">
              Duration Date
            </Text>
            <Text className="text-sm font-normal text-black font-poppins">
              15-06-2024 20-06-2024
            </Text>
          </div>
          <div className="flex flex-col justify-start space-y-2">
            <Text className="text-sm font-normal font-poppins text-darkGray">
              Location
            </Text>
            <Text className="text-sm font-normal text-black font-poppins">
              New York
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
}
