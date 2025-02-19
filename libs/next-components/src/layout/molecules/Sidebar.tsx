'use client';
import React, { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Text } from '../../index';
import { SVGS } from '@crowdcareaid-frontend/assets';

interface SidebarProps {
  isAdmin: boolean;
  isMobile?: boolean;
  setIsMenu?: (ag: boolean) => void;
  setIsChild?: (ag: boolean) => void;
}

type LinkProps = {
  name: string;
  link: string;
  icon: ReactNode;
};

const AdminLinks = [
  { name: 'Dashboard', icon: <SVGS.SidebarDashboard />, link: '/dashboard' },
  { name: 'Users', icon: <SVGS.SidebarUsers />, link: '/users' },
  { name: 'Campaigns', icon: <SVGS.SidebarUsers />, link: '/campaigns' },
];

const UserLinks = [
  { name: 'Home', icon: <SVGS.SidebarDashboard />, link: '/home' },
  {
    name: 'Create Campaign',
    icon: <SVGS.SidebarUsers />,
    link: '/createCampaign',
  },
  {
    name: 'Create Donations',
    icon: <SVGS.SidebarUsers />,
    link: '/createDonations',
  },
  {
    name: 'Donation History',
    icon: <SVGS.SidebarUsers />,
    link: '/donationHistory',
  },
  {
    name: 'Search',
    icon: <SVGS.SidebarUsers />,
    link: '/searchCampaigns',
  },
  {
    name: 'Settings',
    icon: <SVGS.SidebarUsers />,
    link: '/userProfile',
    // children: [
    //   {
    //     name: 'My Profile',
    //     icon: <SVGS.SidebarUsers />,
    //     link: '/userProfile',
    //   },
    //   {
    //     name: 'Language',
    //     icon: <SVGS.SidebarUsers />,
    //     link: '/donationHistory',
    //   },
    //   {
    //     name: 'FAQ',
    //     icon: <SVGS.SidebarUsers />,
    //     link: '/searchCampaign',
    //   },
    //   {
    //     name: 'Change Password',
    //     icon: <SVGS.SidebarUsers />,
    //     link: '/changeYourPassword',
    //   },
    //   {
    //     name: 'Privacy Policy',
    //     icon: <SVGS.SidebarUsers />,
    //     link: '/donationHistory',
    //   },
    //   {
    //     name: 'Terms & Conditions',
    //     icon: <SVGS.SidebarUsers />,
    //     link: '/searchCampaign',
    //   },
    //   {
    //     name: 'Logout',
    //     icon: <SVGS.SidebarUsers />,
    //     link: '/donationHistory',
    //   },
    //   {
    //     name: 'Delete Account',
    //     icon: <SVGS.SidebarUsers />,
    //     link: '/searchCampaign',
    //   },
    // ],
  },

  {
    name: 'Change Password',
    icon: <SVGS.SidebarUsers />,
    link: '/changeYourPassword',
  },
];

const Sidebar: React.FC<SidebarProps> = ({
  isAdmin,
  isMobile,
  setIsMenu,
  setIsChild,
}) => {
  const pathname = usePathname();

  return (
    <div
      className={`flex w-full h-screen flex-col ${
        isMobile
          ? 'items-start pt-2 px-5 bg-[#1A3F1E] space-y-[30px]'
          : 'pt-10 items-center bg-gradient-to-b from-[#1A3F1E] to-[#44A54F]'
      }`}
    >
      {isMobile ? (
        <div />
      ) : (
        <div
          className={`w-[200px] h-[50px] flex ${
            isMobile ? 'justify-start' : 'justify-center'
          } items-center bg-white rounded-[10px] mb-1`}
        >
          <SVGS.Logo width={'75%'} />
        </div>
      )}

      {(isAdmin ? AdminLinks : UserLinks).map((link: LinkProps) =>
        isMobile ? (
          <Link
            key={link.name}
            className={`w-full h-[40px] flex items-center cursor-pointer mb-4 rounded-[10px] space-x-[20px] px-10 ${
              pathname.includes(link.link) ? 'bg-white' : ''
            }`}
            href={link.link}
            onClick={() => {
              setIsMenu(false);
              setIsChild(pathname === 'Setting' ? true : false);
            }}
          >
            <div
              className={
                pathname.includes(link.link) ? 'text-[#1A3F1E]' : 'text-white'
              }
            >
              {link.icon}
            </div>
            <Text
              className={`text-sm font-normal ${
                pathname.includes(link.link) ? 'text-[#1A3F1E]' : 'text-white'
              }`}
            >
              {link.name}
            </Text>
          </Link>
        ) : (
          <Link
            key={link.name}
            className={`w-[200px] h-[40px] flex items-center cursor-pointer mb-4 rounded-[10px] ${
              pathname.includes(link.link) ? 'bg-white' : ''
            }`}
            href={link.link}
          >
            <div
              className={`ml-3 ${
                pathname.includes(link.link) ? 'text-[#1A3F1E]' : 'text-white'
              }`}
            >
              {link.icon}
            </div>
            <Text
              className={`text-sm font-pt_serif ml-5 ${
                pathname.includes(link.link) ? 'text-[#1A3F1E]' : 'text-white'
              }`}
            >
              {link.name}
            </Text>
          </Link>
        )
      )}
    </div>
  );
};

export default Sidebar;
