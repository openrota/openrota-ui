import { gql, useMutation } from '@apollo/client';

// Define mutation


export const getVerificationInvitation = gql`
  query verifyToken($emailId: String!, $token: String!) {
    verify(emailId: $emailId, token: $token)
  }
`;

export const createInvitationTokenMutation = gql`
  mutation createInvitationToken {
    createInvitationToken(invitation: {emailId: ""}) {
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