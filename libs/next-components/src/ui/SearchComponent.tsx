import React from 'react';
import { Input } from './input';
import { Button } from './button';

interface SearchComponentProps {
  isStatus?: boolean;
  isLocation?: boolean;
}

const SearchComponent: React.FC<SearchComponentProps> = ({
  isStatus = false,
  isLocation = false,
}) => {
  return (
    <div className="flex flex-col w-full items-center bg-[#FFFFFF] rounded-lg space-y-8 mt-3 mb-6 px-5 py-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 w-full gap-x-9 gap-y-5">
        <Input type="text" placeholder="Search by name" isTable={true} />

        <Input type="text" placeholder="Search by email" isTable={true} />

        {isStatus ? (
          <Input type="text" placeholder="Search status" isTable={true} />
        ) : (
          isLocation && (
            <Input type="text" placeholder="Search location" isTable={true} />
          )
        )}

        <Input type="text" placeholder="Search date" isTable={true} />

        <Button
          type="submit"
          className="w-full h-12 bg-darkGreen hover:bg-darkGreen"
        >
          Search
        </Button>
        <Button className="w-full h-12 bg-transparent text-black border rounded-md">
          Reset
        </Button>
      </div>
    </div>
  );
};

export default SearchComponent;
