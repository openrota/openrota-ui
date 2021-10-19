import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** Scalar for BigInteger */
  BigInteger: any;
  /** Scalar for Date */
  Date: any;
};



export type Employee = {
  designation?: Maybe<Scalars['String']>;
  emailId?: Maybe<Scalars['String']>;
  employeeId?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['BigInteger']>;
};

export type EmployeeFilterInput = {
  emailId?: Maybe<FilterFieldInput>;
  firstName?: Maybe<FilterFieldInput>;
  lastName?: Maybe<FilterFieldInput>;
};

export type EmployeeInput = {
  designation?: Maybe<Scalars['String']>;
  emailId?: Maybe<Scalars['String']>;
  employeeId?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['BigInteger']>;
};

export type EmployeeProjectDetail = {
  projectName?: Maybe<Scalars['String']>;
  sharedResource?: Maybe<SharedResource>;
  id?: Maybe<Scalars['BigInteger']>;
};

export type EmployeeProjectDetailInput = {
  projectName?: Maybe<Scalars['String']>;
  sharedResource?: Maybe<SharedResourceInput>;
  id?: Maybe<Scalars['BigInteger']>;
};

export type EmployeeSkillProficiency = {
  employee?: Maybe<SharedResource>;
  proficiencyLevel?: Maybe<SkillProficiencyLevel>;
  skill?: Maybe<Skill>;
  id?: Maybe<Scalars['BigInteger']>;
};

export type EmployeeSkillProficiencyInput = {
  employee?: Maybe<SharedResourceInput>;
  proficiencyLevel?: Maybe<SkillProficiencyLevel>;
  skill?: Maybe<SkillInput>;
  id?: Maybe<Scalars['BigInteger']>;
};

export type FilterFieldInput = {
  operator?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

export type Invitation = {
  emailId?: Maybe<Scalars['String']>;
  status?: Maybe<InvitationStatus>;
  id?: Maybe<Scalars['BigInteger']>;
};

export type InvitationInput = {
  emailId?: Maybe<Scalars['String']>;
  status?: Maybe<InvitationStatus>;
  id?: Maybe<Scalars['BigInteger']>;
};

export type InvitationResponse = {
  responseStatus: Scalars['Int'];
  token?: Maybe<Scalars['String']>;
};

export enum InvitationStatus {
  Completed = 'COMPLETED',
  Expired = 'EXPIRED',
  Pending = 'PENDING'
}

/** Mutation root */
export type Mutation = {
  /** Create a new SR */
  createOrUpdateSharedResource?: Maybe<SharedResource>;
  /** Add a new skill */
  createSkill?: Maybe<Skill>;
  /** Create a new token */
  createInvitationToken?: Maybe<Array<Maybe<InvitationResponse>>>;
  /** Delete skills of SR */
  deleteSkillForSR?: Maybe<EmployeeSkillProficiency>;
  /** Add skills to SR */
  addSkillsToSR?: Maybe<SharedResource>;
  /** Create a new Employee */
  createProject?: Maybe<Project>;
  /** Create a new Employee */
  createEmployee?: Maybe<Employee>;
  /** Delete SR */
  deleteSharedResource?: Maybe<SharedResource>;
  /** Update skill of SR */
  updateSkillOfSR?: Maybe<EmployeeSkillProficiency>;
};


/** Mutation root */
export type MutationCreateOrUpdateSharedResourceArgs = {
  resource?: Maybe<SharedResourceInput>;
};


/** Mutation root */
export type MutationCreateSkillArgs = {
  skill?: Maybe<SkillInput>;
};


/** Mutation root */
export type MutationCreateInvitationTokenArgs = {
  invitationlist?: Maybe<Array<Maybe<InvitationInput>>>;
};


/** Mutation root */
export type MutationDeleteSkillForSrArgs = {
  id?: Maybe<Scalars['BigInteger']>;
  employeeSkillProficiency?: Maybe<EmployeeSkillProficiencyInput>;
};


/** Mutation root */
export type MutationAddSkillsToSrArgs = {
  id?: Maybe<Scalars['BigInteger']>;
  employeeSkillProficiencies?: Maybe<Array<Maybe<EmployeeSkillProficiencyInput>>>;
};


/** Mutation root */
export type MutationCreateProjectArgs = {
  project?: Maybe<ProjectInput>;
};


/** Mutation root */
export type MutationCreateEmployeeArgs = {
  employee?: Maybe<EmployeeInput>;
};


/** Mutation root */
export type MutationDeleteSharedResourceArgs = {
  id?: Maybe<Scalars['BigInteger']>;
};


/** Mutation root */
export type MutationUpdateSkillOfSrArgs = {
  id?: Maybe<Scalars['BigInteger']>;
  employeeSkillProficiency?: Maybe<EmployeeSkillProficiencyInput>;
};

export type Project = {
  businessUnit: Scalars['String'];
  employee?: Maybe<SharedResource>;
  projectManager?: Maybe<Employee>;
  projectName: Scalars['String'];
  requiredSkillSet: Array<Maybe<Skill>>;
  slot?: Maybe<Slot>;
  id?: Maybe<Scalars['BigInteger']>;
};

export type ProjectInput = {
  businessUnit: Scalars['String'];
  employee?: Maybe<SharedResourceInput>;
  projectManager?: Maybe<EmployeeInput>;
  projectName: Scalars['String'];
  requiredSkillSet: Array<Maybe<SkillInput>>;
  slot?: Maybe<SlotInput>;
  id?: Maybe<Scalars['BigInteger']>;
};

/** Query root */
export type Query = {
  /** Get an employee by id */
  employeeById?: Maybe<Employee>;
  /** Get an SR by id */
  sharedResourceById?: Maybe<SharedResource>;
  /** Get all invitations */
  invitation?: Maybe<Array<Maybe<Invitation>>>;
  /** Get all Employees */
  employee?: Maybe<Array<Maybe<Employee>>>;
  /** Get all resources using the filters eq, lt,le,gt,ge */
  sharedResourceWithFilters?: Maybe<Array<Maybe<Employee>>>;
  /** Verify Email */
  verify: Scalars['Boolean'];
  /** Get all Employees using the filters eq, lt,le,gt,ge */
  employeesWithFilter?: Maybe<Array<Maybe<Employee>>>;
  /** Get all projects */
  project?: Maybe<Array<Maybe<Project>>>;
  /** Get all resources */
  sharedResource?: Maybe<Array<Maybe<SharedResource>>>;
  /** Get all skills */
  skill?: Maybe<Array<Maybe<Skill>>>;
};


/** Query root */
export type QueryEmployeeByIdArgs = {
  id?: Maybe<Scalars['BigInteger']>;
};


/** Query root */
export type QuerySharedResourceByIdArgs = {
  id?: Maybe<Scalars['BigInteger']>;
};


/** Query root */
export type QuerySharedResourceWithFiltersArgs = {
  filter?: Maybe<EmployeeFilterInput>;
};


/** Query root */
export type QueryVerifyArgs = {
  emailId?: Maybe<Scalars['String']>;
  token?: Maybe<Scalars['String']>;
};


/** Query root */
export type QueryEmployeesWithFilterArgs = {
  filter?: Maybe<EmployeeFilterInput>;
};

export type SharedResource = {
  employeeProjectDetails?: Maybe<Array<Maybe<EmployeeProjectDetail>>>;
  skillProficiencies?: Maybe<Array<Maybe<EmployeeSkillProficiency>>>;
  totalExperience?: Maybe<Scalars['String']>;
  designation?: Maybe<Scalars['String']>;
  emailId?: Maybe<Scalars['String']>;
  employeeId?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['BigInteger']>;
};

export type SharedResourceInput = {
  employeeProjectDetails?: Maybe<Array<Maybe<EmployeeProjectDetailInput>>>;
  skillProficiencies?: Maybe<Array<Maybe<EmployeeSkillProficiencyInput>>>;
  totalExperience?: Maybe<Scalars['String']>;
  designation?: Maybe<Scalars['String']>;
  emailId?: Maybe<Scalars['String']>;
  employeeId?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['BigInteger']>;
};

export type Skill = {
  name?: Maybe<Scalars['String']>;
  skillProficiencies?: Maybe<Array<Maybe<EmployeeSkillProficiency>>>;
  id?: Maybe<Scalars['BigInteger']>;
};

export type SkillInput = {
  name?: Maybe<Scalars['String']>;
  skillProficiencies?: Maybe<Array<Maybe<EmployeeSkillProficiencyInput>>>;
  id?: Maybe<Scalars['BigInteger']>;
};

export enum SkillProficiencyLevel {
  Advanced = 'ADVANCED',
  Beginner = 'BEGINNER',
  Intermediate = 'INTERMEDIATE'
}

export type Slot = {
  /** ISO-8601 */
  endDate?: Maybe<Scalars['Date']>;
  /** ISO-8601 */
  startDate?: Maybe<Scalars['Date']>;
  id?: Maybe<Scalars['BigInteger']>;
};

export type SlotInput = {
  /** ISO-8601 */
  endDate?: Maybe<Scalars['Date']>;
  /** ISO-8601 */
  startDate?: Maybe<Scalars['Date']>;
  id?: Maybe<Scalars['BigInteger']>;
};

export type GetEmployeesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetEmployeesQuery = { sharedResource?: Maybe<Array<Maybe<Pick<SharedResource, 'id' | 'firstName'>>>> };

export type VerifyTokenQueryVariables = Exact<{
  emailId: Scalars['String'];
  token: Scalars['String'];
}>;


export type VerifyTokenQuery = Pick<Query, 'verify'>;

export type CreateInvitationTokenMutationVariables = Exact<{
  invitationlist?: Maybe<Array<Maybe<InvitationInput>> | Maybe<InvitationInput>>;
}>;


export type CreateInvitationTokenMutation = { createInvitationToken?: Maybe<Array<Maybe<Pick<InvitationResponse, 'responseStatus' | 'token'>>>> };

export type InvitationQueryVariables = Exact<{ [key: string]: never; }>;


export type InvitationQuery = { invitation?: Maybe<Array<Maybe<Pick<Invitation, 'emailId' | 'status'>>>> };

export type SkillsQueryVariables = Exact<{ [key: string]: never; }>;


export type SkillsQuery = { skill?: Maybe<Array<Maybe<Pick<Skill, 'id' | 'name'>>>> };


export const GetEmployeesDocument = gql`
    query getEmployees {
  sharedResource {
    id
    firstName
  }
}
    `;

/**
 * __useGetEmployeesQuery__
 *
 * To run a query within a React component, call `useGetEmployeesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetEmployeesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetEmployeesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetEmployeesQuery(baseOptions?: Apollo.QueryHookOptions<GetEmployeesQuery, GetEmployeesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetEmployeesQuery, GetEmployeesQueryVariables>(GetEmployeesDocument, options);
      }
export function useGetEmployeesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetEmployeesQuery, GetEmployeesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetEmployeesQuery, GetEmployeesQueryVariables>(GetEmployeesDocument, options);
        }
export type GetEmployeesQueryHookResult = ReturnType<typeof useGetEmployeesQuery>;
export type GetEmployeesLazyQueryHookResult = ReturnType<typeof useGetEmployeesLazyQuery>;
export type GetEmployeesQueryResult = Apollo.QueryResult<GetEmployeesQuery, GetEmployeesQueryVariables>;
export const VerifyTokenDocument = gql`
    query verifyToken($emailId: String!, $token: String!) {
  verify(emailId: $emailId, token: $token)
}
    `;

/**
 * __useVerifyTokenQuery__
 *
 * To run a query within a React component, call `useVerifyTokenQuery` and pass it any options that fit your needs.
 * When your component renders, `useVerifyTokenQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useVerifyTokenQuery({
 *   variables: {
 *      emailId: // value for 'emailId'
 *      token: // value for 'token'
 *   },
 * });
 */
export function useVerifyTokenQuery(baseOptions: Apollo.QueryHookOptions<VerifyTokenQuery, VerifyTokenQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<VerifyTokenQuery, VerifyTokenQueryVariables>(VerifyTokenDocument, options);
      }
export function useVerifyTokenLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<VerifyTokenQuery, VerifyTokenQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<VerifyTokenQuery, VerifyTokenQueryVariables>(VerifyTokenDocument, options);
        }
export type VerifyTokenQueryHookResult = ReturnType<typeof useVerifyTokenQuery>;
export type VerifyTokenLazyQueryHookResult = ReturnType<typeof useVerifyTokenLazyQuery>;
export type VerifyTokenQueryResult = Apollo.QueryResult<VerifyTokenQuery, VerifyTokenQueryVariables>;
export const CreateInvitationTokenDocument = gql`
    mutation createInvitationToken($invitationlist: [InvitationInput]) {
  createInvitationToken(invitationlist: $invitationlist) {
    responseStatus
    token
  }
}
    `;
export type CreateInvitationTokenMutationFn = Apollo.MutationFunction<CreateInvitationTokenMutation, CreateInvitationTokenMutationVariables>;

/**
 * __useCreateInvitationTokenMutation__
 *
 * To run a mutation, you first call `useCreateInvitationTokenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateInvitationTokenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createInvitationTokenMutation, { data, loading, error }] = useCreateInvitationTokenMutation({
 *   variables: {
 *      invitationlist: // value for 'invitationlist'
 *   },
 * });
 */
export function useCreateInvitationTokenMutation(baseOptions?: Apollo.MutationHookOptions<CreateInvitationTokenMutation, CreateInvitationTokenMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateInvitationTokenMutation, CreateInvitationTokenMutationVariables>(CreateInvitationTokenDocument, options);
      }
export type CreateInvitationTokenMutationHookResult = ReturnType<typeof useCreateInvitationTokenMutation>;
export type CreateInvitationTokenMutationResult = Apollo.MutationResult<CreateInvitationTokenMutation>;
export type CreateInvitationTokenMutationOptions = Apollo.BaseMutationOptions<CreateInvitationTokenMutation, CreateInvitationTokenMutationVariables>;
export const InvitationDocument = gql`
    query invitation {
  invitation {
    emailId
    status
  }
}
    `;

/**
 * __useInvitationQuery__
 *
 * To run a query within a React component, call `useInvitationQuery` and pass it any options that fit your needs.
 * When your component renders, `useInvitationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useInvitationQuery({
 *   variables: {
 *   },
 * });
 */
export function useInvitationQuery(baseOptions?: Apollo.QueryHookOptions<InvitationQuery, InvitationQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<InvitationQuery, InvitationQueryVariables>(InvitationDocument, options);
      }
export function useInvitationLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<InvitationQuery, InvitationQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<InvitationQuery, InvitationQueryVariables>(InvitationDocument, options);
        }
export type InvitationQueryHookResult = ReturnType<typeof useInvitationQuery>;
export type InvitationLazyQueryHookResult = ReturnType<typeof useInvitationLazyQuery>;
export type InvitationQueryResult = Apollo.QueryResult<InvitationQuery, InvitationQueryVariables>;
export const SkillsDocument = gql`
    query skills {
  skill {
    id
    name
  }
}
    `;

/**
 * __useSkillsQuery__
 *
 * To run a query within a React component, call `useSkillsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSkillsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSkillsQuery({
 *   variables: {
 *   },
 * });
 */
export function useSkillsQuery(baseOptions?: Apollo.QueryHookOptions<SkillsQuery, SkillsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SkillsQuery, SkillsQueryVariables>(SkillsDocument, options);
      }
export function useSkillsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SkillsQuery, SkillsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SkillsQuery, SkillsQueryVariables>(SkillsDocument, options);
        }
export type SkillsQueryHookResult = ReturnType<typeof useSkillsQuery>;
export type SkillsLazyQueryHookResult = ReturnType<typeof useSkillsLazyQuery>;
export type SkillsQueryResult = Apollo.QueryResult<SkillsQuery, SkillsQueryVariables>;