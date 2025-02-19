'use server';
import { Text } from '@crowdcareaid-frontend/next-components';
import { getAuthUserCampaigns } from '@crowdcareaid-frontend/next-actions';
import FundTabs from './molecules/FundTabs';

export default async function Index() {
  const UserCampaignsData = await getAuthUserCampaigns();

  return (
    <div className="flex flex-col w-full justify-start items-center">
      <div className="w-full py-5 bg-brownOrange flex items-center justify-center">
        <Text variant={'primary'} className="text-white">
          Payment Details
        </Text>
      </div>
      <div className="p-5 space-y-7 w-4/5 flex flex-row justify-between items-start">
        <FundTabs data={UserCampaignsData?.data || []} />
      </div>
    </div>
  );
}
