import { SVGS } from '@crowdcareaid-frontend/assets';
import { Text, LoginForm } from '@crowdcareaid-frontend/next-components';
import Link from 'next/link';

export default function Index() {
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <Text variant={'primary'} className="text-3xl font-bold font-pt_serif	">
        Welcome Back
      </Text>
      <LoginForm />
      <div className="flex flex-col justify-between items-center w-full space-y-4 py-3">
        <div className="flex flex-row justify-between items-center w-full">
          <div className="border-t border-darkGray w-1/3" />
          <Text variant={'sub'}>Or Login With</Text>
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
        Don’t have account ?{'  '}
        <Link href="/signup" style={{ color: '#EA7E24' }}>
          SignUp
        </Link>
      </Text>
    </div>
  );
}
