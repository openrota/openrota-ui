import { gql } from '@apollo/client';

export const getEmployees = gql`
query getEmployees {  
    sharedResource{
     id,
     firstName
    }      
}`;
