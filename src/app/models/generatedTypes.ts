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
  /** Create a new resource request */
  createOrUpdateResourceRequest?: Maybe<ResourceRequest>;
  /** Delete SR */
  deleteSharedResource?: Maybe<SharedResource>;
  /** Delete skills of SR */
  deleteSkillForSR?: Maybe<EmployeeSkillProficiency>;
  /** Add skills to SR */
  addSkillsToSR?: Maybe<SharedResource>;
  /** Create a new token */
  createInvitationToken?: Maybe<Array<Maybe<InvitationResponse>>>;
  /** Create a new Employee */
  createProject?: Maybe<Project>;
  /** Update skill of SR */
  updateSkillOfSR?: Maybe<EmployeeSkillProficiency>;
  /** Add a new skill */
  createSkill?: Maybe<Skill>;
  /** Create a new Employee */
  createEmployee?: Maybe<Employee>;
  /** Create a new SR */
  createOrUpdateSharedResource?: Maybe<SharedResource>;
};


/** Mutation root */
export type MutationCreateOrUpdateResourceRequestArgs = {
  resourceRequest?: Maybe<ResourceRequestInput>;
};


/** Mutation root */
export type MutationDeleteSharedResourceArgs = {
  id?: Maybe<Scalars['BigInteger']>;
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
export type MutationCreateInvitationTokenArgs = {
  invitationlist?: Maybe<Array<Maybe<InvitationInput>>>;
};


/** Mutation root */
export type MutationCreateProjectArgs = {
  project?: Maybe<ProjectInput>;
};


/** Mutation root */
export type MutationUpdateSkillOfSrArgs = {
  id?: Maybe<Scalars['BigInteger']>;
  employeeSkillProficiency?: Maybe<EmployeeSkillProficiencyInput>;
};


/** Mutation root */
export type MutationCreateSkillArgs = {
  skill?: Maybe<SkillInput>;
};


/** Mutation root */
export type MutationCreateEmployeeArgs = {
  employee?: Maybe<EmployeeInput>;
};


/** Mutation root */
export type MutationCreateOrUpdateSharedResourceArgs = {
  resource?: Maybe<SharedResourceInput>;
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
  /** Get an SR by id */
  sharedResourceById?: Maybe<SharedResource>;
  /** Get all Employees */
  employee?: Maybe<Array<Maybe<Employee>>>;
  /** Get all skills */
  skill?: Maybe<Array<Maybe<Skill>>>;
  /** Get all invitations */
  invitation?: Maybe<Array<Maybe<Invitation>>>;
  /** Verify Email */
  verify: Scalars['Boolean'];
  /** Get all resources request */
  sharedResourceRequest?: Maybe<Array<Maybe<ResourceRequest>>>;
  /** Get all resources using the filters eq, lt,le,gt,ge */
  sharedResourceWithFilters?: Maybe<Array<Maybe<Employee>>>;
  /** Get all resources */
  sharedResource?: Maybe<Array<Maybe<SharedResource>>>;
  /** Get all projects */
  project?: Maybe<Array<Maybe<Project>>>;
  /** Get all Employees using the filters eq, lt,le,gt,ge */
  employeesWithFilter?: Maybe<Array<Maybe<Employee>>>;
  /** Get an SR by emailId */
  sharedResourceByEmailId?: Maybe<SharedResource>;
  /** Get an employee by id */
  employeeById?: Maybe<Employee>;
};


/** Query root */
export type QuerySharedResourceByIdArgs = {
  id?: Maybe<Scalars['BigInteger']>;
};


/** Query root */
export type QueryVerifyArgs = {
  emailId?: Maybe<Scalars['String']>;
  token?: Maybe<Scalars['String']>;
};


/** Query root */
export type QuerySharedResourceWithFiltersArgs = {
  filter?: Maybe<EmployeeFilterInput>;
};


/** Query root */
export type QueryEmployeesWithFilterArgs = {
  filter?: Maybe<EmployeeFilterInput>;
};


/** Query root */
export type QuerySharedResourceByEmailIdArgs = {
  emailId?: Maybe<Scalars['String']>;
};


/** Query root */
export type QueryEmployeeByIdArgs = {
  id?: Maybe<Scalars['BigInteger']>;
};

export enum ResourceAvailabilityStatus {
  Available = 'AVAILABLE',
  Unavailable = 'UNAVAILABLE'
}

export type ResourceRequest = {
  /** ISO-8601 */
  endDate?: Maybe<Scalars['Date']>;
  pillar?: Maybe<Scalars['String']>;
  project?: Maybe<Scalars['String']>;
  requester?: Maybe<Employee>;
  /** ISO-8601 */
  startDate?: Maybe<Scalars['Date']>;
  status?: Maybe<ResourceRequestStatus>;
  taskDetails?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['BigInteger']>;
};

export type ResourceRequestInput = {
  /** ISO-8601 */
  endDate?: Maybe<Scalars['Date']>;
  pillar?: Maybe<Scalars['String']>;
  project?: Maybe<Scalars['String']>;
  requester?: Maybe<EmployeeInput>;
  /** ISO-8601 */
  startDate?: Maybe<Scalars['Date']>;
  status?: Maybe<ResourceRequestStatus>;
  taskDetails?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['BigInteger']>;
};

export enum ResourceRequestStatus {
  Assigned = 'ASSIGNED',
  Cancelled = 'CANCELLED',
  Completed = 'COMPLETED',
  ExtensionApproved = 'EXTENSION_APPROVED',
  ExtensionDenied = 'EXTENSION_DENIED',
  ExtensionRequested = 'EXTENSION_REQUESTED',
  Inprogress = 'INPROGRESS',
  Pending = 'PENDING'
}

export type SharedResource = {
  employeeProjectDetails?: Maybe<Array<Maybe<EmployeeProjectDetail>>>;
  skillProficiencies?: Maybe<Array<Maybe<EmployeeSkillProficiency>>>;
  status?: Maybe<ResourceAvailabilityStatus>;
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
  status?: Maybe<ResourceAvailabilityStatus>;
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

export type GetResourceRequestsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetResourceRequestsQuery = { sharedResourceRequest?: Maybe<Array<Maybe<(
    Pick<ResourceRequest, 'project' | 'pillar' | 'startDate' | 'endDate' | 'status' | 'id'>
    & { requester?: Maybe<Pick<Employee, 'firstName'>> }
  )>>> };

export type CreateResourceRequestMutationVariables = Exact<{
  resourceRequest?: Maybe<ResourceRequestInput>;
}>;


export type CreateResourceRequestMutation = { createOrUpdateResourceRequest?: Maybe<Pick<ResourceRequest, 'id'>> };

export type GetAllSharedResourceQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllSharedResourceQuery = { sharedResource?: Maybe<Array<Maybe<Pick<SharedResource, 'totalExperience' | 'lastName' | 'status' | 'firstName' | 'designation' | 'emailId' | 'employeeId' | 'id'>>>> };

export type GetSrByIdQueryVariables = Exact<{
  id?: Maybe<Scalars['BigInteger']>;
}>;


export type GetSrByIdQuery = { sharedResourceById?: Maybe<(
    Pick<SharedResource, 'totalExperience' | 'designation' | 'employeeId' | 'id'>
    & { skillProficiencies?: Maybe<Array<Maybe<(
      Pick<EmployeeSkillProficiency, 'id'>
      & { skill?: Maybe<Pick<Skill, 'id'>> }
    )>>> }
  )> };

export type GetSharedResourceByEmailIdQueryVariables = Exact<{
  emailId?: Maybe<Scalars['String']>;
}>;


export type GetSharedResourceByEmailIdQuery = { sharedResourceByEmailId?: Maybe<Pick<SharedResource, 'id'>> };

export type CreateOrUpdateSharedResourceMutationVariables = Exact<{
  resource?: Maybe<SharedResourceInput>;
}>;


export type CreateOrUpdateSharedResourceMutation = { createOrUpdateSharedResource?: Maybe<Pick<SharedResource, 'id'>> };

export type SkillsQueryVariables = Exact<{ [key: string]: never; }>;


export type SkillsQuery = { skill?: Maybe<Array<Maybe<Pick<Skill, 'id' | 'name'>>>> };


export const GetResourceRequestsDocument = gql`
    query getResourceRequests {
  sharedResourceRequest {
    requester {
      firstName
    }
    project
    pillar
    startDate
    endDate
    status
    id
  }
}
    `;

/**
 * __useGetResourceRequestsQuery__
 *
 * To run a query within a React component, call `useGetResourceRequestsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetResourceRequestsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetResourceRequestsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetResourceRequestsQuery(baseOptions?: Apollo.QueryHookOptions<GetResourceRequestsQuery, GetResourceRequestsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetResourceRequestsQuery, GetResourceRequestsQueryVariables>(GetResourceRequestsDocument, options);
      }
export function useGetResourceRequestsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetResourceRequestsQuery, GetResourceRequestsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetResourceRequestsQuery, GetResourceRequestsQueryVariables>(GetResourceRequestsDocument, options);
        }
export type GetResourceRequestsQueryHookResult = ReturnType<typeof useGetResourceRequestsQuery>;
export type GetResourceRequestsLazyQueryHookResult = ReturnType<typeof useGetResourceRequestsLazyQuery>;
export type GetResourceRequestsQueryResult = Apollo.QueryResult<GetResourceRequestsQuery, GetResourceRequestsQueryVariables>;
export const CreateResourceRequestDocument = gql`
    mutation createResourceRequest($resourceRequest: ResourceRequestInput) {
  createOrUpdateResourceRequest(resourceRequest: $resourceRequest) {
    id
  }
}
    `;
export type CreateResourceRequestMutationFn = Apollo.MutationFunction<CreateResourceRequestMutation, CreateResourceRequestMutationVariables>;

/**
 * __useCreateResourceRequestMutation__
 *
 * To run a mutation, you first call `useCreateResourceRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateResourceRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createResourceRequestMutation, { data, loading, error }] = useCreateResourceRequestMutation({
 *   variables: {
 *      resourceRequest: // value for 'resourceRequest'
 *   },
 * });
 */
export function useCreateResourceRequestMutation(baseOptions?: Apollo.MutationHookOptions<CreateResourceRequestMutation, CreateResourceRequestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateResourceRequestMutation, CreateResourceRequestMutationVariables>(CreateResourceRequestDocument, options);
      }
export type CreateResourceRequestMutationHookResult = ReturnType<typeof useCreateResourceRequestMutation>;
export type CreateResourceRequestMutationResult = Apollo.MutationResult<CreateResourceRequestMutation>;
export type CreateResourceRequestMutationOptions = Apollo.BaseMutationOptions<CreateResourceRequestMutation, CreateResourceRequestMutationVariables>;
export const GetAllSharedResourceDocument = gql`
    query getAllSharedResource {
  sharedResource {
    totalExperience
    lastName
    status
    firstName
    designation
    emailId
    employeeId
    id
  }
}
    `;

/**
 * __useGetAllSharedResourceQuery__
 *
 * To run a query within a React component, call `useGetAllSharedResourceQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllSharedResourceQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllSharedResourceQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllSharedResourceQuery(baseOptions?: Apollo.QueryHookOptions<GetAllSharedResourceQuery, GetAllSharedResourceQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllSharedResourceQuery, GetAllSharedResourceQueryVariables>(GetAllSharedResourceDocument, options);
      }
export function useGetAllSharedResourceLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllSharedResourceQuery, GetAllSharedResourceQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllSharedResourceQuery, GetAllSharedResourceQueryVariables>(GetAllSharedResourceDocument, options);
        }
export type GetAllSharedResourceQueryHookResult = ReturnType<typeof useGetAllSharedResourceQuery>;
export type GetAllSharedResourceLazyQueryHookResult = ReturnType<typeof useGetAllSharedResourceLazyQuery>;
export type GetAllSharedResourceQueryResult = Apollo.QueryResult<GetAllSharedResourceQuery, GetAllSharedResourceQueryVariables>;
export const GetSrByIdDocument = gql`
    query getSRById($id: BigInteger) {
  sharedResourceById(id: $id) {
    totalExperience
    designation
    employeeId
    skillProficiencies {
      id
      skill {
        id
      }
    }
    id
  }
}
    `;

/**
 * __useGetSrByIdQuery__
 *
 * To run a query within a React component, call `useGetSrByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSrByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSrByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetSrByIdQuery(baseOptions?: Apollo.QueryHookOptions<GetSrByIdQuery, GetSrByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSrByIdQuery, GetSrByIdQueryVariables>(GetSrByIdDocument, options);
      }
export function useGetSrByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSrByIdQuery, GetSrByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSrByIdQuery, GetSrByIdQueryVariables>(GetSrByIdDocument, options);
        }
export type GetSrByIdQueryHookResult = ReturnType<typeof useGetSrByIdQuery>;
export type GetSrByIdLazyQueryHookResult = ReturnType<typeof useGetSrByIdLazyQuery>;
export type GetSrByIdQueryResult = Apollo.QueryResult<GetSrByIdQuery, GetSrByIdQueryVariables>;
export const GetSharedResourceByEmailIdDocument = gql`
    query getSharedResourceByEmailId($emailId: String) {
  sharedResourceByEmailId(emailId: $emailId) {
    id
  }
}
    `;

/**
 * __useGetSharedResourceByEmailIdQuery__
 *
 * To run a query within a React component, call `useGetSharedResourceByEmailIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSharedResourceByEmailIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSharedResourceByEmailIdQuery({
 *   variables: {
 *      emailId: // value for 'emailId'
 *   },
 * });
 */
export function useGetSharedResourceByEmailIdQuery(baseOptions?: Apollo.QueryHookOptions<GetSharedResourceByEmailIdQuery, GetSharedResourceByEmailIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSharedResourceByEmailIdQuery, GetSharedResourceByEmailIdQueryVariables>(GetSharedResourceByEmailIdDocument, options);
      }
export function useGetSharedResourceByEmailIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSharedResourceByEmailIdQuery, GetSharedResourceByEmailIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSharedResourceByEmailIdQuery, GetSharedResourceByEmailIdQueryVariables>(GetSharedResourceByEmailIdDocument, options);
        }
export type GetSharedResourceByEmailIdQueryHookResult = ReturnType<typeof useGetSharedResourceByEmailIdQuery>;
export type GetSharedResourceByEmailIdLazyQueryHookResult = ReturnType<typeof useGetSharedResourceByEmailIdLazyQuery>;
export type GetSharedResourceByEmailIdQueryResult = Apollo.QueryResult<GetSharedResourceByEmailIdQuery, GetSharedResourceByEmailIdQueryVariables>;
export const CreateOrUpdateSharedResourceDocument = gql`
    mutation createOrUpdateSharedResource($resource: SharedResourceInput) {
  createOrUpdateSharedResource(resource: $resource) {
    id
  }
}
    `;
export type CreateOrUpdateSharedResourceMutationFn = Apollo.MutationFunction<CreateOrUpdateSharedResourceMutation, CreateOrUpdateSharedResourceMutationVariables>;

/**
 * __useCreateOrUpdateSharedResourceMutation__
 *
 * To run a mutation, you first call `useCreateOrUpdateSharedResourceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateOrUpdateSharedResourceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createOrUpdateSharedResourceMutation, { data, loading, error }] = useCreateOrUpdateSharedResourceMutation({
 *   variables: {
 *      resource: // value for 'resource'
 *   },
 * });
 */
export function useCreateOrUpdateSharedResourceMutation(baseOptions?: Apollo.MutationHookOptions<CreateOrUpdateSharedResourceMutation, CreateOrUpdateSharedResourceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateOrUpdateSharedResourceMutation, CreateOrUpdateSharedResourceMutationVariables>(CreateOrUpdateSharedResourceDocument, options);
      }
export type CreateOrUpdateSharedResourceMutationHookResult = ReturnType<typeof useCreateOrUpdateSharedResourceMutation>;
export type CreateOrUpdateSharedResourceMutationResult = Apollo.MutationResult<CreateOrUpdateSharedResourceMutation>;
export type CreateOrUpdateSharedResourceMutationOptions = Apollo.BaseMutationOptions<CreateOrUpdateSharedResourceMutation, CreateOrUpdateSharedResourceMutationVariables>;
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