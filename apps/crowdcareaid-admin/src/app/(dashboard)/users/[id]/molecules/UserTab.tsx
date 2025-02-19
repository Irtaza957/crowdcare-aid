import {
  DataTable,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@crowdcareaid-frontend/next-components';
import React from 'react';
import { tableData, tableHeader } from './data';

function UserTab() {
  const excludeColumns = ['id', 'email', 'gender'];

  return (
    <>
      <Tabs defaultValue="Fundraiser Details" className="w-[100%] rounded-lg">
        <TabsList className="grid w-full grid-cols-2 border-[0.5px] border-black">
          <TabsTrigger value="Fundraiser Details">
            Fundraiser Details
          </TabsTrigger>
          <TabsTrigger value="Donation Details">Donation Details</TabsTrigger>
        </TabsList>
        <TabsContent value="Fundraiser Details">
          <DataTable
            tableHeader={tableHeader}
            tableData={tableData}
            exclude={excludeColumns}
          />
        </TabsContent>
      </Tabs>
    </>
  );
}

export default UserTab;
