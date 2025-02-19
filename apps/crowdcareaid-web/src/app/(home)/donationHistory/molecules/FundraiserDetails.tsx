'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Button, Progress, Text } from '@crowdcareaid-frontend/next-components';
import { IMAGES, SVGS } from '@crowdcareaid-frontend/assets';

type UserCampaignData = {
  data: CampaignData[];
};

export default function FundRaiserDetails({ data }: UserCampaignData) {
  const [expandedCampaign, setExpandedCampaign] = useState<string | null>(null);

  useEffect(() => {
    if (data.length > 0) {
      setExpandedCampaign(data[0]._id); // Default expanded state for the first campaign
    }
  }, [data]);

  const toggleExpanded = (id: string) => {
    setExpandedCampaign(expandedCampaign === id ? null : id); // Toggle between expanded and collapsed states
  };

  return (
    <div className="flex flex-col w-full items-center bg-[#FFFFFF] space-y-8">
      {data.map((campaign) => {
        const isExpanded = expandedCampaign === campaign._id;

        return (
          <div
            key={campaign._id}
            className="bg-[#FFFFFF] h-auto w-[100%] rounded-[10px] min-h-[80%] px-5 py-6 mt-2 shadow-md flex flex-col justify-start space-y-[25px]"
          >
            <div className="flex justify-between items-center">
              <Text className="text-xl font-medium font-poppins text-darkGreen text-left w-full">
                {campaign.title}
              </Text>
              <div
                onClick={() => toggleExpanded(campaign._id)}
                className="cursor-pointer"
              >
                {isExpanded ? <SVGS.CollapsedIcon /> : <SVGS.ExpandIcon />}
              </div>
            </div>

            {/* Collapsed view content */}
            {!isExpanded && (
              <div className="flex flex-col space-y-2">
                <div className="flex flex-row justify-between items-center">
                  <div className="flex flex-row items-center space-x-3 w-1/2">
                    <Text className="text-sm font-normal font-poppins text-darkGray">
                      Amount Target
                    </Text>
                    <Text className="text-xl font-medium font-poppins text-black">
                      ${campaign.amount}
                    </Text>
                  </div>
                  <div className="flex items-center justify-end space-x-3 w-1/2">
                    <Text className="text-sm font-normal text-darkGray">
                      Fundraiser
                    </Text>
                    <Text className="text-xl font-medium font-poppins text-black">
                      ${campaign.raisedAmount}
                    </Text>
                  </div>
                </div>

                <Progress
                  value={
                    (Number(campaign.raisedAmount) / Number(campaign.amount)) *
                    100
                  }
                />

                <div className="flex justify-between">
                  <Text className="text-sm font-normal font-poppins text-darkGray">
                    Location
                  </Text>
                  <Text className="text-sm font-normal font-poppins text-black">
                    {campaign.location}
                  </Text>
                </div>
              </div>
            )}

            {/* Expanded view content */}
            {isExpanded && (
              <>
                <Text className="font-normal text-sm font-poppins">
                  {campaign.description}
                </Text>

                <div className="flex items-center space-x-[15px]">
                  {/* {campaign.images.map((image, index) => ( */}
                  <Image
                    // key={index}
                    src={IMAGES.Background} // Assuming IMAGES has the actual image mapping
                    alt={`Campaign Image`}
                    width={70}
                    height={40}
                    className="rounded-md"
                  />
                  {/* ))} */}
                </div>

                <div className="flex flex-row justify-between items-center min-w-full">
                  <div className="flex flex-row items-center space-x-3 w-1/2">
                    <Text className="text-sm font-normal font-poppins text-darkGray">
                      Amount Target
                    </Text>
                    <Text className="text-xl font-medium font-poppins text-black">
                      ${campaign.amount}
                    </Text>
                  </div>
                  <div className="flex items-center justify-end space-x-3 w-1/2">
                    <Text className="text-sm font-normal text-darkGray">
                      Fundraiser
                    </Text>
                    <Text className="text-xl font-medium font-poppins text-black">
                      ${campaign.raisedAmount}
                    </Text>
                  </div>
                </div>

                <div className="w-full flex flex-row justify-end items-end">
                  <Text className="text-base text-black font-medium font-poppins text-right -mb-2">
                    {(
                      (Number(campaign.raisedAmount) /
                        Number(campaign.amount)) *
                      100
                    ).toFixed(0)}
                    %
                  </Text>
                </div>
                <Progress
                  value={
                    (Number(campaign.raisedAmount) / Number(campaign.amount)) *
                    100
                  }
                />

                <div className="flex flex-row justify-between items-center min-w-full">
                  <div className="flex flex-col justify-start space-y-2">
                    <Text className="text-sm font-normal font-poppins text-darkGray">
                      Duration Date
                    </Text>
                    <Text className="text-sm font-normal text-black font-poppins">
                      {campaign.duration[0]} {campaign.duration[1]}
                    </Text>
                  </div>
                  <div className="flex flex-col justify-start space-y-2">
                    <Text className="text-sm font-normal font-poppins text-darkGray">
                      Location
                    </Text>
                    <Text className="text-sm font-normal text-black font-poppins">
                      {campaign.location}
                    </Text>
                  </div>
                </div>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}
