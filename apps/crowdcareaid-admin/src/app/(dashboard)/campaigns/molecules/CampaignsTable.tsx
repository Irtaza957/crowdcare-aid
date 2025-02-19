'use client';
import { DataTable, useToast } from '@crowdcareaid-frontend/next-components';
import React, { useEffect, useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@crowdcareaid-frontend/next-components';
import {
  updateCampaignStatus,
  getUserById,
} from '@crowdcareaid-frontend/next-actions';

const capitalizeName = (name: string) => {
  return name
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

const CampaignTable: React.FC<{
  tableHeader;
  tableData;
}> = ({ tableHeader, tableData }) => {
  const [userMap, setUserMap] = useState<{ [key: string]: string }>({});
  const [data, setData] = useState(tableData);
  const { toast } = useToast();

  const fetchUserNames = async (userIds: string[]) => {
    try {
      const userPromises = userIds.map((id) => getUserById(id));
      const userResults = await Promise.all(userPromises);
      const users = userResults.reduce((acc, result) => {
        if (result?.status === 200) {
          const user = result.data.users;
          const fullName = `${user.firstName} ${user.lastName}`;
          acc[user._id] = capitalizeName(fullName);
        }
        return acc;
      }, {} as { [key: string]: string });
      setUserMap(users);
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error fetching user details',
        description: 'Failed to load user details.',
      });
    }
  };

  useEffect(() => {
    const userIds = tableData.map((item) => item.createdBy);
    fetchUserNames(userIds);
  }, [tableData]);

  const handleStatusChange = async (id: string, status: string) => {
    const payload = {
      id,
      status,
    };

    try {
      const result = await updateCampaignStatus(payload);
      if (result?.success) {
        toast({
          title: 'Campaign Status Updated Successfully',
        });
        setData((prevData) =>
          prevData.map((item) => (item._id === id ? { ...item, status } : item))
        );
      } else {
        toast({
          variant: 'destructive',
          title: 'Error while Updating Status',
          description: result.message,
        });
      }
    } catch (error) {
      let errorMessage =
        'An error occurred while updating the status of the campaign. Please try again later.';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      toast({
        variant: 'destructive',
        title: 'Error while Updating Status',
        description: errorMessage,
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'border-blue-500 text-blue-500';
      case 'rejected':
        return 'border-red-500 text-red-500';
      default:
        return 'border-darkGreen text-darkGreen';
    }
  };

  const getStatusTextColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'text-blue-500';
      case 'rejected':
        return 'text-red-500';
      default:
        return 'text-darkGreen';
    }
  };

  const transformedData = data.map((item: CampaignTableData) => ({
    id: item._id,
    name: item.title,
    amount: item.amount,
    location: item.location,
    creator: userMap[item.createdBy] || 'Loading...',
    status: (
      <Select
        value={item.status}
        onValueChange={(newStatus) => handleStatusChange(item._id, newStatus)}
      >
        <SelectTrigger className={`border-2 ${getStatusColor(item.status)}`}>
          <SelectValue
            className={`font-poppins text-sm font-bold ${getStatusTextColor(
              item.status
            )}`}
            placeholder="Select Status"
          />
        </SelectTrigger>
        <SelectContent>
          {[
            { label: 'Accepted', value: 'approved' },
            { label: 'Rejected', value: 'rejected' },
            { label: 'Pending', value: 'pending' },
          ].map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    ),
  }));

  const excludeColumns = ['id'];

  return (
    <DataTable
      tableHeader={tableHeader}
      tableData={transformedData}
      exclude={excludeColumns}
    />
  );
};

export default CampaignTable;
