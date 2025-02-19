'use server';
import { Text } from '@crowdcareaid-frontend/next-components';
import StepperForm from './molecules/StepperForm';
import { getCampaignCateogries } from '@crowdcareaid-frontend/next-actions';

export default async function Index() {
  const result = await getCampaignCateogries();

  if (!result || !result.data) {
    return (
      <div className="flex flex-col w-full justify-start items-center">
        <div className="w-full py-5 bg-brownOrange flex items-center justify-center">
          <Text variant={'primary'} className="text-white">
            Fundraiser Details
          </Text>
        </div>
        <div className="p-5 space-y-7 w-4/5 flex flex-row justify-between items-start">
          <p>Error loading campaign categories.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full justify-start items-center">
      <div className="w-full py-5 bg-brownOrange flex items-center justify-center">
        <Text variant={'primary'} className="text-white">
          Fundraiser Details
        </Text>
      </div>
      <div className="p-5 space-y-7 w-4/5 flex flex-row justify-between items-start">
        <StepperForm categoryData={result.data} />
      </div>
    </div>
  );
}
