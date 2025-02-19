'use client';

import { Text } from '@crowdcareaid-frontend/next-components';
import Image from 'next/image';

interface CategoryItem {
  _id: string;
  logo: string;
  name: string;
}

interface CategoriesProps {
  data: CategoryItem[];
}

const Categories: React.FC<CategoriesProps> = ({ data = [] }) => {
  return (
    <div className="w-full flex flex-col justify-between items-start">
      <Text variant={'primary'}>Categories</Text>
      <div className="flex flex-row justify-start items-center w-full space-x-12 py-6">
        {data.length > 0 ? (
          data.map((item) => (
            <div
              key={item._id}
              className="flex flex-row w-1/4 rounded-[10px] shadow-md p-5 justify-between items-center space-x-4"
            >
              <Image
                src={`${item.logo}`}
                alt={item.name}
                width={80}
                height={80}
                className="w-20 h-20"
              />
              <Text className="text-lg text-black font-bold">{item.name}</Text>
            </div>
          ))
        ) : (
          <Text>No categories available.</Text>
        )}
      </div>
    </div>
  );
};

export default Categories;
