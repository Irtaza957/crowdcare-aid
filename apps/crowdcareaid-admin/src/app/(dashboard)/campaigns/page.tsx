import { SearchComponent, Text } from '@crowdcareaid-frontend/next-components';
import { getAllCampaigns } from '@crowdcareaid-frontend/next-actions';
import { CampaignTable, tableHeader } from './molecules';

export default async function Index() {
  const campaignsData = await getAllCampaigns();

  return (
    <div className="flex flex-col w-full justify-start items-center p-10">
      <Text className="text-[30px] font-pt_serif text-darkGreen text-left w-full">
        Campaigns
      </Text>
      <div className="w-full flex flex-col justify-between items-start">
        <SearchComponent isStatus />

        <CampaignTable
          tableData={campaignsData.data}
          tableHeader={tableHeader}
        />
      </div>
    </div>
  );
}
