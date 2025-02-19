import { SVGS, IMAGES } from '@crowdcareaid-frontend/assets';
import Image from 'next/image';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={IMAGES.Background}
          layout="fill"
          objectFit="cover"
          alt="Background"
        />
      </div>
      <div className="absolute top-1/2 left-1/2 lg:left-20 transform -translate-x-1/2 lg:-translate-x-0 -translate-y-1/2  w-11/12 md:w-3/4 lg:w-1/4 bg-white rounded-lg h-auto p-10 flex flex-col items-center justify-start">
        <SVGS.Logo width={'70%'} />
        {children}
      </div>
    </div>
  );
}
