'use client';
import { Input, Progress, Text } from '@crowdcareaid-frontend/next-components';
import React, { useState, useEffect, useCallback } from 'react';
import { IMAGES, SVGS } from '@crowdcareaid-frontend/assets';
import Link from 'next/link';
import Image from 'next/image';
import {
  getAllCampaigns,
  getFilteredCampaigns,
} from '@crowdcareaid-frontend/next-actions';

function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [data, setData] = useState([]);

  // Custom debounce function
  const debounce = (func: Function, delay: number) => {
    let timeoutId: ReturnType<typeof setTimeout>;
    return (...args: any[]) => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  // Fetch campaigns based on search query
  const fetchData = useCallback(async () => {
    try {
      const result = await getFilteredCampaigns(searchQuery);

      // Assuming result contains { data: [] } structure
      setData(result.data);
    } catch (error) {
      console.error('Error fetching campaigns:', error);
      setData([]); // Clear data if an error occurs
    }
  }, [searchQuery]);

  // Debounce the fetchData function
  const debouncedFetchData = useCallback(debounce(fetchData, 500), [fetchData]);

  useEffect(() => {
    debouncedFetchData();
    return () => {
      debouncedFetchData.cancel && debouncedFetchData.cancel();
    };
  }, [searchQuery, debouncedFetchData]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="flex flex-col space-y-10 w-full justify-start items-center py-8">
      <div className="relative w-full">
        <Input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          className="w-full min-h-16 border border-gray-300 rounded-full pl-14 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
          placeholder="Search..."
        />
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
          {/* <SVGS.InputSearchIcon /> */}
        </div>
      </div>

      {data?.length ? (
        data.map((row, index) => (
          <div key={index} className="w-full">
            <Link
              href={`/searchCampaigns/${row._id}`}
              className="w-full flex bg-white rounded-md shadow-md space-x-6"
            >
              <Image
                src={IMAGES.Background}
                alt="User"
                className="w-[200px] h-[158px] rounded-md"
                width={128}
                height={128}
              />

              <div className="w-full flex flex-col space-y-4 py-4 pr-6">
                <Text className="text-xl font-medium">{row.title}</Text>

                <div className="w-full flex flex-col space-y-2">
                  <Text className="text-xs text-black font-normal font-poppins text-right -mb-2">
                    {(
                      (Number(row.raisedAmount) / Number(row.amount)) *
                      100
                    ).toFixed(0)}
                    %
                  </Text>
                  <Progress
                    value={
                      (Number(row.raisedAmount) / Number(row.amount)) * 100
                    }
                  />{' '}
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex flex-col space-y-1">
                    <Text className="text-sm font-normal text-[#858585]">
                      Duration Date
                    </Text>
                    <Text className="text-sm font-normal">
                      {row.duration[0]} {row.duration[1]}
                    </Text>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <Text className="text-sm font-normal text-[#858585]">
                      {}
                    </Text>
                    <Text className="text-sm font-normal">{row.location}</Text>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))
      ) : (
        <div className="flex flex-col justify-center items-center space-y-3 pt-6">
          <SVGS.NoDataIcon />
          <Text className="text-sm font-poppins text-darkGray font-normal text-center">
            No data available to show! <br /> Please search something
          </Text>
        </div>
      )}
    </div>
  );
}

export default SearchScreen;
