'use client';

import { Text, Progress, Button } from '@crowdcareaid-frontend/next-components';
import Image from 'next/image';

type TopProjectsProps = {
  data: CampaignData[];
};

const TopFundraisers = ({ data }: TopProjectsProps) => {
  return (
    <div className="w-full flex flex-col justify-between items-start">
      <Text variant={'primary'}>Top Fundraisers</Text>
      <div className="flex flex-row justify-start items-center w-full min-w-[75vw] space-x-12 py-6 overflow-x-scroll">
        {data.length > 0 ? (
          data.map((item) => (
            <div
              key={item._id}
              className="flex flex-col w-full lg:w-1/4 lg:min-w-80 rounded-[10px] shadow-md justify-between items-center border border-gray-300"
            >
              <Image
                src={'https://i.ibb.co/7pKnXgp/Group-645.png'}
                alt={'Campaign Image'}
                width={100}
                height={100}
                className="w-full h-auto p-0 m-0"
              />
              <div className="flex flex-col justify-between items-center p-4 w-full">
                <Text className="text-base text-black font-medium font-poppins text-center">
                  {item.title}
                </Text>
                <div className="w-full flex flex-row justify-end items-end">
                  <Text className="text-base text-black font-medium font-poppins text-right">
                    {(Number(item.raisedAmount) / Number(item.amount)) * 100}%
                  </Text>
                </div>
                <Progress
                  value={
                    (Number(item.raisedAmount) / Number(item.amount)) * 100
                  }
                />
                <div className="flex flex-row justify-between items-center w-full py-4">
                  <Text className="text-sm text-darkGray font-normal text-start font-poppins">
                    Raised:{' '}
                    <span className="text-base text-black font-poppins">
                      {item.raisedAmount}
                    </span>
                  </Text>
                  <Text className="text-sm text-darkGray font-normal text-start font-poppins">
                    Target of:
                    <span className="text-base text-black font-poppins">
                      {item.amount}
                    </span>
                  </Text>
                </div>
                <div className="w-full flex flex-row justify-between items-center pb-3">
                  <Text className="text-sm text-darkGray font-normal text-start font-poppins">
                    {item?.category?.name}
                  </Text>
                  <Text className="text-sm text-darkGray font-normal text-start font-poppins">
                    {item?.address?.name}
                  </Text>
                </div>
                <Button className="bg-darkGreen h-10 w-1/3 rounded-lg">
                  Donate
                </Button>
              </div>
            </div>
          ))
        ) : (
          <Text>No projects available.</Text>
        )}
      </div>
    </div>
  );
};

export default TopFundraisers;
