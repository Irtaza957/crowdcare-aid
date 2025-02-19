import { FC, ReactElement } from 'react';
import { Label } from './label';
import { SVGS } from '@crowdcareaid-frontend/assets';

interface DialogSideBarProps {
  open: boolean;
  isChild: boolean;
  children: ReactElement;
  setOpen: (open: boolean) => void;
}

const DialogSideBar: FC<DialogSideBarProps> = ({
  open,
  setOpen,
  isChild,
  children,
}) => {
  return (
    open && (
      <div className="fixed inset-0 flex items-center justify-start bg-white z-50 w-screen h-screen">
        <div className="relative rounded-lg shadow-lg w-screen h-screen">
          <div className="flex justify-between items-center bg-[#1A3F1E] w-full h-16 px-5 shadow-2xl shadow-[#1A3F1E] z-10">
            <div className="flex items-center space-x-[15px]">
              {isChild ? (
                <>
                  <div
                    onClick={() => setOpen(false)}
                    className="bg-white p-[5px] rounded-[8px]"
                  >
                    <SVGS.LeftArrow width={20} />
                  </div>

                  <Label className="font-medium text-sm text-white">Menu</Label>
                </>
              ) : (
                <div className="w-[125px] h-[31px] flex justify-center items-center bg-white rounded-full">
                  <SVGS.Logo width={'100px'} />
                </div>
              )}
            </div>

            <SVGS.Cancel width={30} onClick={() => setOpen(false)} />
          </div>

          {children}
        </div>
      </div>
    )
  );
};

export { DialogSideBar };
