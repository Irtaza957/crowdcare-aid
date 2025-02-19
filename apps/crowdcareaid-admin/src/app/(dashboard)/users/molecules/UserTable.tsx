'use client';
import { DataTable } from '@crowdcareaid-frontend/next-components';
import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { getAllUser } from '@crowdcareaid-frontend/next-actions';

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  country?: string;
  phone?: string;
  email: string;
  gender?: string;
}

const UserTable: React.FC<{ tableHeader: UserTableHeaderItem[] }> = ({
  tableHeader,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [userData, setUserData] = useState<any[]>([]);
  const [userDataLength, setUserDataLength] = useState(0);

  const itemsPerPage = 6;
  const page = parseInt(searchParams.get('page') || '1', 10);

  const getData = async (page: number) => {
    const response = await getAllUser('', page, itemsPerPage);
    setUserDataLength(response?.data?.length);
    if (response?.status === 200) {
      const transformedData = response?.data?.users?.map((item: User) => ({
        id: item._id,
        image: '',
        name: `${item.firstName} ${item.lastName}`,
        location: item.country || '-',
        phone: item.phone || '-',
        email: item.email,
        gender: item.gender || '-',
      }));
      setUserData(transformedData);
    }
  };

  useEffect(() => {
    getData(page);
  }, [page]);

  const excludeColumns = ['id'];

  return (
    <DataTable
      tableHeader={tableHeader}
      tableData={userData}
      page={page}
      itemsPerPage={itemsPerPage}
      onClick={(id) => {
        if (id) router.push(`/users/${id}`);
      }}
      handlePageChange={(newPage) => router.push(`?page=${newPage}`)}
      handleItemsPerPageChange={(e) =>
        router.push(`?itemsPerPage=${e.target.value}&page=1`)
      }
      totalPages={Math.ceil(userDataLength / itemsPerPage)}
      exclude={excludeColumns}
    />
  );
};

export default UserTable;
