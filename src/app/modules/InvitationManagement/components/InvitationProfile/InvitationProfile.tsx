import React from 'react';
import { DynamicFormRenderer, Loading } from '@app/components';
import { useInvitationQuery, useCreateInvitationTokenMutation } from '@app/models';
import invitationSchema from '@app/modules/InvitationManagement/schema/invitation-profile.json';
import { Alert, AlertGroup } from '@patternfly/react-core';
import { TableComposable, Thead, Tbody, Tr, Th, Td, Caption } from '@patternfly/react-table';

const InvitationProfile: React.FC = () => {
  let hasSuccess;
  const variant = hasSuccess ? 'success' : 'danger';
  const title = hasSuccess ? 'Mail Sent  Successfully' : 'Mail Failed. Something wrong, try again';
  const { loading, data, refetch } = useInvitationQuery({
    nextFetchPolicy: 'cache-and-network',
  });
  const columns = ['Email', 'Status'];
  let rows: string[][] | undefined = data?.invitation?.map((s) => [s?.emailId as string, s?.status as string]);
  const [createTokenMutateFunction, { error }] = useCreateInvitationTokenMutation({});
  const onSubmit = (values) => {
    let emaillist: Array<object> = [];
    values.email.split(';').forEach((s) => emaillist.push({ emailId: s }));
    createTokenMutateFunction({ variables: { invitationlist: emaillist } });
    alert('Mail Sent');
  };

  return (
    <>
      <DynamicFormRenderer schema={invitationSchema} onSubmit={onSubmit} />
      <React.Fragment>
        <TableComposable>
          <Caption>Existing invitations</Caption>
          <Thead>
            <Tr>
              {columns.map((column, columnIndex) => (
                <Th key={columnIndex}>{column}</Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {rows?.map((row, rowIndex) => (
              <Tr key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <Td key={`${rowIndex}_${cellIndex}`} dataLabel={columns[cellIndex]}>
                    {cell}
                  </Td>
                ))}
              </Tr>
            ))}
          </Tbody>
        </TableComposable>
      </React.Fragment>
    </>
  );
};

export { InvitationProfile };
