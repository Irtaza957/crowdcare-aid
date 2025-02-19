'use client';
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import Image from 'next/image';
import { IMAGES, SVGS } from '@crowdcareaid-frontend/assets';
import { Text } from '../ui/text';
import Link from 'next/link';

interface UserTableHeaderItem {
  id: number;
  headerTitle: string;
}

interface TableDataItem {
  id: number;
  image?: string;
  name: string;
  location: string;
  phone: string;
  email: string;
  gender: string;
}

interface UserTableProps {
  tableHeader: UserTableHeaderItem[];
  tableData: TableDataItem[];
  onClick?: (id?: number) => void;
  itemsPerPage?: number;
  page?: number;
  totalPages?: number;
  handlePageChange?: (page: number) => void;
  handleItemsPerPageChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  exclude?: string[];
}

const DataTable: React.FC<UserTableProps> = ({
  tableHeader,
  tableData,
  onClick,
  itemsPerPage = 10,
  page = 1,
  handlePageChange,
  handleItemsPerPageChange,
  totalPages = 1,
  exclude = [],
}) => {
  const getPaginationRange = () => {
    const range = 5;
    const startPage = Math.max(1, page - Math.floor(range / 2));
    const endPage = Math.min(totalPages, startPage + range - 1);

    if (endPage - startPage < range - 1) {
      return {
        start: Math.max(1, endPage - (range - 1)),
        end: endPage,
      };
    }

    return { start: startPage, end: endPage };
  };

  const { start, end } = getPaginationRange();

  return (
    <div className="bg-[#FFFFFF] h-auto w-[100%] rounded-[10px] min-h-[80%] p-3 mt-2">
      <Table>
        <TableHeader>
          <TableRow className="bg-[#F0F4F7] border-b-0">
            {tableHeader
              .filter((item) => !exclude.includes(item.headerTitle))
              .map((item) => (
                <TableHead
                  className="text-[#000000] text-[16px] font-poppins"
                  key={item.id}
                >
                  {item.headerTitle}
                </TableHead>
              ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {tableData.map((data) => (
            <TableRow
              key={data.id}
              className="border-b-[0.5px] border-[#858585] cursor-pointer"
              onClick={() => onClick?.(data.id)}
            >
              {Object.entries(data)
                .filter(([key]) => !exclude.includes(key))
                .map(([key, value]) => (
                  <TableCell
                    className="font-normal text-[#000000] text-[14px]"
                    key={key}
                  >
                    {key === 'image' ? (
                      <Image
                        src={
                          value?.length ? value : IMAGES.UserProfilePlaceholder
                        }
                        alt={key}
                        width={50}
                        height={50}
                        className="sm:h-[55px] sm:w-[55px] md:h-[50px] md:w-[50px] h-[45px] w-[45px] rounded-[30px]"
                      />
                    ) : (
                      value
                    )}
                  </TableCell>
                ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex sm:flex-row flex-col space-y-3 sm:space-y-0 justify-between items-center px-10 py-2 border-t-[0.5px] border-[#858585]">
        <div className="relative sm:space-x-4 space-x-2">
          <Text className="font-normal text-[#000000] text-[14px]">
            Show Rows Per Page
          </Text>
          <select
            className="border border-[#000000] rounded-[7px] py-[0.5px] pl-2 pr-7 appearance-none outline-none"
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
          >
            {[6, 10, 20].map((number) => (
              <option
                key={number}
                value={number}
                className="font-normal text-[#000000] text-[14px]"
              >
                {number}
              </option>
            ))}
          </select>
          <SVGS.Down width={30} className="absolute top-0 right-0" />
        </div>
        <div className="bg-[#F0F4F7] h-[44px] flex justify-center items-center rounded-[8px] space-x-2 px-2">
          {page > 1 ? (
            <Link href={`?page=${page - 1}`}>
              <SVGS.Down width={30} className="rotate-90" />
            </Link>
          ) : (
            <span className="disabled-link">
              <SVGS.Down width={30} className="rotate-90" />
            </span>
          )}
          {Array.from(
            { length: end - start + 1 },
            (_, index) => start + index
          ).map((number) => (
            <button
              key={number}
              className={`px-2 py-[0.5px] rounded-[20px] self-center ${
                page === number ? 'bg-[#1A3F1E] text-white' : ''
              }`}
              onClick={() => handlePageChange?.(number)}
            >
              {number}
            </button>
          ))}
          {page < totalPages ? (
            <Link href={`?page=${page + 1}`}>
              <SVGS.Down width={30} className="-rotate-90" />
            </Link>
          ) : (
            <span className="disabled-link">
              <SVGS.Down width={30} className="-rotate-90" />
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default DataTable;
