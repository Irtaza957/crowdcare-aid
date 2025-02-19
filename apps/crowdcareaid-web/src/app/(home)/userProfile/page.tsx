'use server';
import UserData from './molecules/UserData';
import { getUserById } from '@crowdcareaid-frontend/next-actions';

export default async function Index() {
  const result = await getUserById();

  if (!result || !result.data) {
    return (
      <div className="p-5 w-full">
        <div className="flex mb-5 justify-between space-x-12"></div>
        <p>Error loading user data.</p>
      </div>
    );
  }

  return (
    <div className="p-5 w-full">
      <div className="flex mb-5 justify-between space-x-12"></div>
      <UserData data={result.data} />
    </div>
  );
}
