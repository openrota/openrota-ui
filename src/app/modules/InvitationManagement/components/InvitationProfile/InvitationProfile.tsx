import React from 'react';
import { DynamicFormRenderer, Loading } from '@app/components';
import { useVerifyTokenQuery } from '@app/models';
import { useCreateInvitationTokenMutation } from '@app/models';
import invitationSchema from '@app/modules/InvitationManagement/schema/invitation-profile.json';
import { Alert, AlertGroup } from '@patternfly/react-core';

const InvitationProfile: React.FC = () => {

    let input;
    const [createTokenMutateFunction, { data, loading, error }] = useCreateInvitationTokenMutation({
         onCompleted: (data) => {
         },
    });


  if (loading) return 'Submitting...';
  if (error) return `Submission error! ${error.message}`;
//   if (data) return (<React.Fragment>
//                                                <AlertGroup>
//                                                  <Alert title="Mail Sent " variant="success" isInline />
//
//                                                </AlertGroup>
//                                              </React.Fragment>);

  console.log( "DATA " + data)

  const onSubmit = (values) => {
    console.log(values);
    createTokenMutateFunction({ variables: { emailId: values.email } });
    alert('Mail Sent')
  };

  return <DynamicFormRenderer schema={invitationSchema} onSubmit={onSubmit} />

};

export { InvitationProfile };
