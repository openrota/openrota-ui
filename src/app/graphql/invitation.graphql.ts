import { gql, useMutation } from '@apollo/client';

// Define mutation


export const getVerificationInvitation = gql`
  query verifyToken($emailId: String!, $token: String!) {
    verify(emailId: $emailId, token: $token)
  }
`;

export const createInvitationTokenMutation = gql`
  mutation createInvitationToken($emailId: String!) {
    createInvitationToken(invitation: {emailId: $emailId}) {
      responseStatus
      token
    }
  }
`;

// import { gql } from '@apollo/client';
//
// export const getInvitationVerification = gql`
// query verifyToken {
//   verify(emailId: "", token: "")
// }`;