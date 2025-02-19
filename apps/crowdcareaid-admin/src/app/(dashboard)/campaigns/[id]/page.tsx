import { Text } from '@crowdcareaid-frontend/next-components';
import { getAllCampaigns } from '@crowdcareaid-frontend/next-actions';
import CampaignDetails from './molecules/campaignDetails';

export default async function Index() {
  return (
    <div className="flex flex-col w-full justify-start items-center">
      <Text className="text-[30px] font-pt_serif text-darkGreen text-left w-full pl-[10%]">
        Campaign Details
      </Text>
      <CampaignDetails/>
    </div>
  );
}
