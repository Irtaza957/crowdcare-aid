import { Text } from '@crowdcareaid-frontend/next-components';
import SignupForm from './molecules/SignupForm';
import Link from 'next/link';
import { SVGS } from '@crowdcareaid-frontend/assets';

export default function Index() {
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <Text variant={'primary'}>Create your Account</Text>
      <SignupForm />
      <div className="flex flex-col justify-between items-center w-full space-y-4 py-3">
        <div className="flex flex-row justify-between items-center w-full">
          <div className="border-t border-darkGray w-1/3" />
          <Text variant={'sub'}>Or Signup With</Text>
          <div className="border-t border-darkGray w-1/3" />
        </div>
        <div className="flex flex-row justify-between items-center space-x-5">
          <div className="border border-darkGray p-2 rounded-full">
            <SVGS.WebGoogle />
          </div>
          <div className="border border-darkGray p-2 rounded-full">
            <SVGS.WebFacebook />
          </div>
        </div>
      </div>
      <Text variant={'secondary'}>
        Already have account ?{'  '}
        <Link href="/login" style={{ color: '#EA7E24' }}>
          Sign in
        </Link>
      </Text>
    </div>
  );
}
