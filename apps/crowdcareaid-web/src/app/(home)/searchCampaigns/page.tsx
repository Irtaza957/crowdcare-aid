'use server';
import SearchScreen from './molecules/SearchScreen';

export default async function Index() {
  return (
    <div className="flex flex-col w-full justify-start items-center">
      <div className="p-5 space-y-7 w-4/5 flex flex-row justify-between items-start">
        <SearchScreen />
      </div>
    </div>
  );
}
