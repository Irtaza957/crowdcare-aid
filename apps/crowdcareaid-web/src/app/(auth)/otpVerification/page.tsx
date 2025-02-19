import { Text } from '@crowdcareaid-frontend/next-components';
import OTPForm from './molecules/OTPForm';
import { SVGS } from '@crowdcareaid-frontend/assets';
import { cookies } from 'next/headers';

export default function Index() {
  const mail = cookies().get('email')?.value || '';
  const routeTo = cookies().get('routeTo')?.value || '';
  const tempOTP = cookies().get('tempOTP')?.value || '';

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <Text variant="primary" className="text-3xl font-bold font-pt_serif">
        OTP Verification
      </Text>
      <Text variant="sub" className="text-center py-5">
        OTP sent to your email {mail}
      </Text>
      <Text variant="sub" className="text-center pb-5">
        For Dev Mode Your OTP is <b>{tempOTP}</b>
      </Text>
      <SVGS.otp width={200} height={200} />
      <OTPForm email={mail} routeTo={routeTo} />
    </div>
  );
}
