'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Autoplay from 'embla-carousel-autoplay';

import { IMAGES } from '@crowdcareaid-frontend/assets';
import {
  Button,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  Progress,
  Text,
} from '@crowdcareaid-frontend/next-components';
import ReportCampaign from './molecules/ReportCampaign';
import { getCampaignDetails } from '@crowdcareaid-frontend/next-actions';

interface SingleCampaignDetailProps {
  params: { id: string };
}

const SingleCampaignDetail: React.FC<SingleCampaignDetailProps> = ({
  params,
}) => {
  const [campaignData, setCampaignData] = useState<any>(null); // State to store the campaign details
  const [loading, setLoading] = useState<boolean>(true); // State to manage loading

  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  const campaignId = params.id;

  // Fetch campaign details when component mounts
  useEffect(() => {
    const fetchCampaignDetails = async () => {
      setLoading(true);
      try {
        const data = await getCampaignDetails(campaignId);
        setCampaignData(data?.data); // Update the state with campaign details
      } catch (error) {
        console.error('Error fetching campaign details:', error);
      } finally {
        setLoading(false); // Stop the loading spinner
      }
    };

    fetchCampaignDetails();
  }, [campaignId]);

  if (loading) {
    return <div>Loading...</div>; // Show a loading indicator while data is being fetched
  }

  if (!campaignData) {
    return <div>No campaign data found.</div>; // Handle case where no data is found
  }

  return (
    <div className="flex flex-col w-full justify-start items-center mb-9 mt-12 p-5">
      <div className="flex flex-col space-y-6 w-4/5">
        <Carousel
          plugins={[plugin.current]}
          className="w-full"
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
          opts={{
            align: 'start',
            loop: true,
          }}
        >
          {/* <CarouselContent>
            {campaignData.images.map((image: string, index: number) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <Image
                    src={image}
                    alt={`Campaign Image ${index + 1}`}
                    className="w-full h-[330px] object-cover rounded-md"
                    width={128}
                    height={128}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent> */}
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>

        <div className="space-y-4 flex flex-col">
          <Text className="text-xl font-medium">
            {campaignData.title || 'Donate for flood victim'}
          </Text>

          <Text className="text-sm font-normal">
            {campaignData.description ||
              'No description available for this campaign.'}
          </Text>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex flex-col justify-start space-y-[8px]">
            <Text className="text-sm font-normal text-[#858585]">
              Total Fundraise
            </Text>
            <Text className="text-sm font-normal">
              ${campaignData.totalFundraise || '0'}
            </Text>
          </div>

          <div className="flex items-center space-x-[10px]">
            <div className="flex flex-col justify-start space-y-[8px]">
              <Text className="text-sm font-normal text-[#858585]">
                Total Amount
              </Text>
              <Text className="text-sm font-normal">
                ${campaignData.totalAmount || '0'}
              </Text>
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col space-y-2">
          <Text className="text-xs text-black font-normal font-poppins text-right -mb-2">
            {`${(
              (campaignData.totalFundraise / campaignData.totalAmount) *
              100
            ).toFixed(2)}%`}
          </Text>

          <Progress
            value={
              (campaignData.totalFundraise / campaignData.totalAmount) * 100
            }
          />
        </div>

        <div className="flex justify-between items-center">
          <div className="flex flex-col justify-start space-y-[8px]">
            <Text className="text-sm font-normal text-[#858585]">
              {campaignData.location?.country || 'Country'}
            </Text>
            <Text className="text-sm font-normal">
              {campaignData.location?.city || 'City'}
            </Text>
          </div>

          <div className="flex items-center space-x-[10px]">
            <div className="flex flex-col justify-start space-y-[8px]">
              <Text className="text-sm font-normal text-[#858585]">
                Duration Date
              </Text>
              <Text className="text-sm font-normal">
                {campaignData.startDate || 'Start Date'} -{' '}
                {campaignData.endDate || 'End Date'}
              </Text>
            </div>
          </div>
        </div>

        <div className="flex space-x-[50px]">
          <Link className="w-full" href={'/searchCampaigns'}>
            <Button
              type="reset"
              className="w-full h-16 bg-transparent text-black border border-black rounded-md"
            >
              Back
            </Button>
          </Link>

          <Button
            type="submit"
            className="w-full h-16 bg-darkGreen hover:bg-darkGreen rounded-md"
          >
            Donate
          </Button>
        </div>

        <ReportCampaign />
      </div>
    </div>
  );
};

export default SingleCampaignDetail;
