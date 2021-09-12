import React from 'react';
import { DynamicFormRenderer, Loading } from '@app/components';
import { useVerifyTokenQuery } from '@app/models';
import { useCreateInvitationTokenMutation } from '@app/models';
import invitationSchema from '@app/modules/InvitationManagement/schema/invitation-profile.json';
import { ToastContainer, toast } from 'react-toastify';


const InvitationProfile: React.FC = () => {

  const [createTokenMutateFunction, { data, loading, error }] = useCreateInvitationTokenMutation( {
  onCompleted: (data) => {
  // call toaster or notification
        // return 'Mail sent!'
         toast("Mail Sent");
  }});

  if (loading) return 'Submitting...';
  if (error) return `Submission error! ${error.message}`;

  console.log( "DATA " + data)

  const onSubmit = (values) => {
    console.log(values);
    createTokenMutateFunction()
  };

  return <DynamicFormRenderer schema={invitationSchema} onSubmit={onSubmit} />;
};

export { InvitationProfile };
