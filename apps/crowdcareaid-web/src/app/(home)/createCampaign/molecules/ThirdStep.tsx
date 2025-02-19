import { Text } from '@crowdcareaid-frontend/next-components';
import { format } from 'date-fns';
import { StepperFormActions } from './StepperActions';
import Image from 'next/image';

interface FormData {
  title: string;
  location: string;
  category: string;
  amount: string;
  duration: string[];
  description: string;
  images?: string[];
}

interface ThirdStepFormProps {
  onSubmit: () => void;
  formData: FormData;
  loading: boolean;
  images: { url: string; file: File }[];
}

export function ThirdStepForm({
  onSubmit,
  formData,
  loading,
  images,
}: ThirdStepFormProps) {
  const formattedDuration = formData?.duration
    ? `${format(formData.duration[0], 'dd/MM/yyyy')} - ${format(
        formData.duration[1],
        'dd/MM/yyyy'
      )}`
    : '';

  return (
    <div className="py-5 w-full flex justify-center items-center">
      <div className="w-2/3 flex flex-col justify-start items-start">
        <Text variant={'primary'} className="text-brownOrange">
          Review Your Campaign
        </Text>
        <form onSubmit={onSubmit} className="w-full space-y-6">
          <div className="space-y-2 w-full pb-5">
            <Text className="text-xl font-semibold font-poppins text-darkGreen">
              Fundraiser Details
            </Text>
            <div className="border w-full border-gray-400 space-y-4 rounded-lg p-5">
              <div className="w-full flex flex-row justify-between items-center">
                <Text className="text-xl font-normal text-darkGray">
                  Fundraiser Title
                </Text>
                <Text className="text-xl font-normal text-black">
                  {formData?.title}
                </Text>
              </div>
              <div className="w-full flex flex-row justify-between items-center">
                <Text className="text-xl font-normal text-darkGray">
                  Location
                </Text>
                <Text className="text-xl font-normal text-black">
                  {formData?.location}
                </Text>
              </div>
              <div className="w-full flex flex-row justify-between items-center">
                <Text className="text-xl font-normal text-darkGray">
                  Category
                </Text>
                <Text className="text-xl font-normal text-black">
                  {formData?.category}
                </Text>
              </div>
            </div>
            <div className="py-5 space-y-2">
              <Text className="text-xl font-semibold font-poppins text-darkGreen">
                Amount Details
              </Text>
              <div className="border w-full border-gray-400 space-y-4 rounded-lg p-5">
                <div className="w-full flex flex-row justify-between items-center">
                  <Text className="text-xl font-normal text-darkGray">
                    Amount
                  </Text>
                  <Text className="text-xl font-normal text-black">
                    {formData?.amount}
                  </Text>
                </div>
                <div className="w-full flex flex-row justify-between items-center">
                  <Text className="text-xl font-normal text-darkGray">
                    Duration:
                  </Text>
                  <Text className="text-xl font-normal text-black">
                    {formattedDuration}
                  </Text>
                </div>
                <div className="w-full flex flex-row justify-between items-center">
                  <Text className="text-xl font-normal text-darkGray">
                    Attached Images
                  </Text>
                  <div className="flex flex-row space-x-3">
                    {images.map((img, index) => (
                      <Image
                        key={index}
                        src={img.url}
                        alt={`Uploaded image ${index + 1}`}
                        width={80}
                        height={80}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <Text className="text-xl font-semibold font-poppins text-darkGreen">
              Description
            </Text>
            <div className="border w-full border-gray-400 space-y-4 rounded-lg p-5">
              <Text className="text-xl font-normal text-black">
                {formData?.description}
              </Text>
            </div>
          </div>
          <StepperFormActions onSubmit={onSubmit} loading={loading} />
        </form>
      </div>
    </div>
  );
}
