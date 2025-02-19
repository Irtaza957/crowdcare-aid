'use client';
import React from 'react';
import Sidebar from './molecules/Sidebar';
import Navbar from './molecules/Navbar';

interface LayoutProps {
  isAdmin?: boolean;
  children: React.ReactNode;
}

export default function HomeLayout({ children, isAdmin = false }: LayoutProps) {
  return (
    <div className="flex flex-col w-full h-full bg-gray-100">
      <div className="w-full fixed top-0 z-40">
        <Navbar />
      </div>
      <div className="flex flex-row w-full h-full ">
        <div className="hidden lg:block w-1/5 fixed top-0 left-0 h-full z-40">
          <Sidebar isAdmin={isAdmin} />
        </div>
        <div className="w-full lg:w-4/5 ml-0 lg:ml-[20%] mt-[6%] relative z-30 bg-white">
          {children}
        </div>
      </div>
    </div>
  );
}
