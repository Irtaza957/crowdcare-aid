'use server';
import { IMAGES } from '@crowdcareaid-frontend/assets';
import { Button, Text } from '@crowdcareaid-frontend/next-components';
import Image from 'next/image';
import Categories from './molecules/Cateogries';
import {
  getCampaignCateogries,
  getPopularCampaigns,
} from '@crowdcareaid-frontend/next-actions';
import RecentProjects from './molecules/RecentProjects';
import TopFundraisers from './molecules/TopFundraisers';

export default async function Index() {
  const categoryData = await getCampaignCateogries();
  const popularCampaignData = await getPopularCampaigns();

  // Log the results for debugging
  console.log('CATEGORY DATA', categoryData);
  console.log('POPULAR CAMPAIGNS DATA', popularCampaignData);

  return (
    <div className="p-5 space-y-7 w-4/5">
      <Text variant={'primary'} className="text-brownOrange">
        What do you want to donate today?
      </Text>
      <div className="relative w-full rounded-lg h-64 bg-cover bg-center flex items-center justify-center">
        <Image
          src={IMAGES.CrowdScreenBG}
          layout="fill"
          objectFit="cover"
          alt="Background"
          className="rounded-lg"
        />
        <div className="absolute bottom-16 left-16 z-10 flex flex-col justify-start items-start space-y-10">
          <Text variant={'primary'} className="text-white">
            Start Your Own Funding
          </Text>
          <Button
            type="submit"
            className="w-52 h-12 bg-brownOrange hover:bg-brownOrange text-lg font-medium font-poppins"
          >
            Start Campaign
          </Button>
        </div>
      </div>
      <Categories data={categoryData?.data || []} />
      <TopFundraisers data={popularCampaignData?.data || []} />
      <RecentProjects data={popularCampaignData?.data || []} />
    </div>
  );
}
