import { gql } from '@apollo/client';

const getEmployees = gql`
query getEmployees {  
    sharedResource{
     id,
     firstName
    }      
}`;

export { getEmployees };