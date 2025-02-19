import {
  Button,
  SearchComponent,
  Text,
} from '@crowdcareaid-frontend/next-components';
import UserTable from './molecules/UserTable';
import React from 'react';
import { IMAGES } from '@crowdcareaid-frontend/assets';
import { tableHeader } from './molecules/data';
import { Suspense } from 'react';

const Index: React.FC = (context) => {
  return (
    <div className="p-10">
      <Text className="text-[30px] font-pt_serif text-[#1A3F1E] ">
        User List
      </Text>
      <Suspense>
        <SearchComponent isLocation />
        <UserTable tableHeader={tableHeader} />
      </Suspense>
    </div>
  );
};

export default Index;
