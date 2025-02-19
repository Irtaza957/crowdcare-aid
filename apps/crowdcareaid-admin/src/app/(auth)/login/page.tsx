import { LoginForm, Text } from '@crowdcareaid-frontend/next-components';
import React from 'react';

export default function Index() {
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <Text variant={'primary'} className="text-3xl font-bold font-pt_serif	">
        Admin Login
      </Text>
      <LoginForm isAdmin />
    </div>
  );
}
