import { gql } from '@apollo/client';

export const getVerificationInvitation = gql`
  query verifyToken($emailId: String!, $token: String!) {
    verify(emailId: $emailId, token: $token)
  }
`;
