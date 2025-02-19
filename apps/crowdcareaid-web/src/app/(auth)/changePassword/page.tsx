import { Text } from '@crowdcareaid-frontend/next-components';
import PasswordForm from './molecules/PasswordForm';
import { cookies } from 'next/headers';

export default function Index() {
  const email = cookies().get('email')?.value || '';

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <Text variant={'primary'} className="text-3xl font-bold font-pt_serif	">
        Change Password
      </Text>
      <Text variant={'sub'} className="text-center py-5">
        To change your account password, please fill in the fields below
      </Text>
      <PasswordForm email={email} />
    </div>
  );
}
