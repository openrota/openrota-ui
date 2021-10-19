import { gql, useMutation } from '@apollo/client';

// Define mutation

export const getVerificationInvitation = gql`
  query verifyToken($emailId: String!, $token: String!) {
    verify(emailId: $emailId, token: $token)
  }
`;

export const createInvitationTokenMutation = gql`
  type Invitation {
    emailId: String!
  }
  type InvitationInput {
    emailId: String!
  }
  mutation createInvitationToken($invitationlist: [InvitationInput]) {
    createInvitationToken(invitationlist: $invitationlist) {
      responseStatus
      token
    }
  }
`;

export const getInvitations = gql`
  query invitation {
    invitation {
      emailId
      status
    }
  }
`;
