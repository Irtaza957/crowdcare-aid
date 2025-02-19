/* eslint-disable react/jsx-pascal-case */
'use client';

import React, { useEffect, useState } from 'react';
import { IMAGES, SVGS } from '@crowdcareaid-frontend/assets';
import { DialogSideBar, Input, Label } from '../../index';
import Sidebar from './Sidebar';
import Image from 'next/image';

function Navbar() {
  const [isMenu, setIsMenu] = useState(false);
  const [isChild, setIsChild] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024) {
        setIsMenu(false);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="flex justify-between items-center py-6 pl-5 pr-4 lg:py-5 lg:pl-10 lg:pr-9 bg-white shadow-md ml-0 lg:ml-[20%]">
      {/* // left side // */}
      <div className="lg:hidden flex">
        <SVGS.Menu
          width={30}
          className="cursor-pointer"
          onClick={() => setIsMenu(!isMenu)}
        />
      </div>
      <div className="hidden lg:flex">
        <Input type="text" placeholder="Search" isSearch={true} />
      </div>

      {/* // right side // */}
      <div className="flex items-center justify-end space-x-5">
        <div className="flex justify-between items-center p-[10px] space-x-[24px] w-auto h-[40px] md:border md:rounded-[7px] md:border-[#858585]">
          <div className="flex items-center space-x-[8px] md:space-x-[5px]">
            <Image
              src={IMAGES.UserProfileImage}
              alt="User"
              className="w-[35px] h-[35px] md:w-[25px] md:h-[25px] rounded-[4px]"
              width={128}
              height={128}
            />
            <div className="flex flex-col justify-start">
              <Label className="font-normal text-sm">Jane Cooper</Label>
              <Label className="font-normal text-[8px] md:hidden">
                janecooper@gmail.com
              </Label>
            </div>
          </div>
          <div className="hidden md:block">
            <SVGS.Down width={25} />
          </div>
        </div>

        <div className="hidden md:flex items-center space-x-2 w-[40px] h-[40px] border rounded-[7px] border-[#858585] justify-center">
          <SVGS.bell width={30} />
        </div>
      </div>

      {isMenu && (
        <DialogSideBar open={isMenu} setOpen={setIsMenu} isChild={isChild}>
          <Sidebar
            isAdmin
            isMobile={true}
            setIsMenu={setIsMenu}
            setIsChild={setIsChild}
          />
        </DialogSideBar>
      )}
    </div>
  );
}

export default Navbar;
