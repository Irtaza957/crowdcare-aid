import { Text } from '@crowdcareaid-frontend/next-components';
import PasswordForm from './molecules/PasswordForm';
import { cookies } from 'next/headers';

export default function Index() {
  const email = cookies().get('email')?.value || '';

  return (
    <div className="h-[70vh] min-h-[86vh] md:min-h-[75vh] flex flex-col mx-4 mt-16 mb-12 md:mx-32 md:mt-14">
      <Text variant={'primary'} className="text-3xl font-bold font-pt_serif	">
        Change Password
      </Text>
      <PasswordForm email={email} />
    </div>
  );
}
