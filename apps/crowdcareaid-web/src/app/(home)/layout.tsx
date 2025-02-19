import { HomeLayout } from '@crowdcareaid-frontend/next-components';
import React from 'react';

function layout({ children }: { children: React.ReactNode }) {
  return <HomeLayout>{children}</HomeLayout>;
}

export default layout;
