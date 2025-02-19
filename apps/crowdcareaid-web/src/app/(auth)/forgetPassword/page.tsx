import { Text } from '@crowdcareaid-frontend/next-components';
import ForgetForm from './molecules/ForgetForm';

export default function Index() {
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <Text variant={'primary'} className="text-3xl font-bold font-pt_serif	">
        Reset Password
      </Text>
      <Text variant={'sub'} className="text-center py-5">
        Please enter your Email address that you used to register with us.
      </Text>
      <ForgetForm />
    </div>
  );
}
