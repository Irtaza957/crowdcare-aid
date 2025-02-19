import { IMAGES } from '@crowdcareaid-frontend/assets';
import { Text, Button } from '@crowdcareaid-frontend/next-components';
import Image from 'next/image';
import React from 'react';
import { getAllUser } from '@crowdcareaid-frontend/next-actions';
interface UserCardProps {
  id: string;
}

export default async function UserCard({ id }: UserCardProps) {
  const { data } = await getAllUser(id, 100, 100);

  const userInformation = [
    {
      id: 0,
      title: 'Name',
      name: data?.users?.firstName + ' ' + data?.users?.lastName,
      image: true,
    },
    {
      id: 1,
      title: 'Phone',
      name: data?.users?.phone,
    },
    {
      id: 2,
      title: 'Mail',
      name: data?.users?.email,
    },
    {
      id: 3,
      title: 'Gender',
      name: data?.users?.gender,
    },
    {
      id: 4,
      title: 'Birth Date',
      name: data?.users?.dob,
    },
  ];

  return (
    <>
      <Text className="text-[16px] text-black font-bold">User Information</Text>
      {userInformation?.map((item) => (
        <div className="flex justify-between items-center mt-3" key={item.id}>
          <div className="flex flex-col">
            <Text className="text-[14px] text-greyText font-normal">
              {item.title}
            </Text>
            <Text className="text-[14px] text-black font-normal">
              {item.name}
            </Text>
          </div>
          {item.image && (
            <Image
              src={IMAGES.UserProfilePlaceholder}
              className="h-[50px] w-[50px]"
              alt="Picture of the author"
            />
          )}
        </div>
      ))}
      <Button className="w-[100%] mt-7 bg-greenPrimary">Back</Button>
    </>
  );
}
