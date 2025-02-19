'use client';
import {
  Input,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@crowdcareaid-frontend/next-components';
import React, { useState } from 'react';
import FundRaiserDetails from './FundraiserDetails';
import DonationsDetails from './DonationsDetails';
import { SVGS } from '@crowdcareaid-frontend/assets';

type UserCampaignData = {
  data: CampaignData[];
};

function FundTabs({ data }: UserCampaignData) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <>
      <Tabs defaultValue="Fundraiser Details" className="w-[100%] rounded-lg">
        <TabsList className="grid w-full grid-cols-2 border-[0.5px] border-black">
          <TabsTrigger value="Fundraiser Details">
            Fundraiser Details
          </TabsTrigger>
          <TabsTrigger value="Donation Details">Donation Details</TabsTrigger>
        </TabsList>

        <div className="flex flex-row justify-between items-center w-full py-8">
          <div className="relative w-[90%]">
            <Input
              type="text"
              value={searchQuery}
              onChange={handleSearch}
              className="w-full border border-gray-300 rounded-full pl-14 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Search..."
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              {/* <SVGS.InputSearchIcon /> */}
            </div>
          </div>

          {/* Adjust the filter icon width */}
          <div className="w-[10%] flex justify-center">
            {/* <SVGS.FilterIcon /> */}
          </div>
        </div>

        <TabsContent value="Fundraiser Details">
          <FundRaiserDetails data={data} />
        </TabsContent>
        <TabsContent value="Donation Details">
          <DonationsDetails />
        </TabsContent>
      </Tabs>
    </>
  );
}

export default FundTabs;
