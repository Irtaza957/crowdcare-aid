import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { IMAGES } from '@crowdcareaid-frontend/assets';
import { Progress, Text } from '@crowdcareaid-frontend/next-components';

interface SearchCardsProps {
  label: string;
  fromDate: string;
  toDate: string;
  country: string;
  city: string;
  image: string;
  id: string;
}

const SearchCards: React.FC<SearchCardsProps> = (row) => {
  return (
    <Link
      href={`/searchCampaigns/${row.id}`}
      className="w-full flex bg-white rounded-md shadow-md space-x-6"
    >
      <Image
        src={IMAGES.Background}
        alt="User"
        className="w-[200px] h-[158px] rounded-md"
        width={128}
        height={128}
      />

      <div className="w-full flex flex-col space-y-4 py-4 pr-6">
        <Text className="text-xl font-medium">{row.label}</Text>

        <div className="w-full flex flex-col space-y-2">
          <Text className="text-xs text-black font-normal font-poppins text-right -mb-2">
            %50
          </Text>

          <Progress value={(50 / 100) * 100} />
        </div>

        <div className="flex justify-between items-center">
          <div className="flex flex-col space-y-1">
            <Text className="text-sm font-normal text-[#858585]">
              Duration Date
            </Text>
            <Text className="text-sm font-normal">
              {row.fromDate} {row.toDate}
            </Text>
          </div>
          <div className="flex flex-col space-y-1">
            <Text className="text-sm font-normal text-[#858585]">
              {row.country}
            </Text>
            <Text className="text-sm font-normal">{row.city}</Text>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SearchCards;
