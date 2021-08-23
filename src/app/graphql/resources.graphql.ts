import { gql } from '@apollo/client';

export const getSkills = gql`
query skills {  
    skill{
        id,
        name
    }     
}`;