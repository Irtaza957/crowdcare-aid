import { Text } from '@crowdcareaid-frontend/next-components';
import UserTab from './molecules/UserTab';
import UserCard from './molecules/UserCard';

interface Context {
  params?: {
    id?: string;
  };
}

export default function Index({ params }: Context) {
  const RevenueData = [
    {
      id: 0,
      text1: 'Total Fundraiser Amount',
      price: '$1250',
      text2: 'Total Amount Last Month',
      color1: '#92D7FE',
      color2: '#578198',
    },
    {
      id: 1,
      text1: 'Total Donation Amount',
      price: '$1550',
      text2: 'Total Amount Last Month',
      color1: '#92FF9D',
      color2: '#57995E',
    },
    {
      id: 2,
      text1: 'Complete Project',
      price: '10',
      text2: 'Total Project Last Month',
      color1: '#FF9393',
      color2: '#995858',
    },
  ];

  const userId = params?.id ?? 'defaultId'; // Provide a default ID if params?.id is undefined

  return (
    <div className="p-5">
      <div className="flex mb-5 justify-between space-x-12">
        {RevenueData.map((item) => (
          <div
            key={item.id}
            className="flex flex-col h-[142px] w-1/3 rounded-[10px] p-5 justify-between"
            style={{
              background: `linear-gradient(to bottom, ${item.color1}, ${item.color2})`,
            }}
          >
            <Text className="text-[16px] text-white font-normal">
              {item.text1}
            </Text>
            <Text className="text-[25px] text-white font-bold">
              {item.price}
            </Text>
            <Text className="text-[16px] text-white font-normal">
              {item.text2}
            </Text>
          </div>
        ))}
      </div>
      <div className="flex justify-between space-x-16">
        <div className="w-1/3 bg-white rounded-[10px] p-4">
          <UserCard id={userId} />
        </div>
        <div className="w-2/3 bg-white rounded-[10px] p-4">
          <UserTab />
        </div>
      </div>
    </div>
  );
}
