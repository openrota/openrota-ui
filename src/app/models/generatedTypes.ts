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
  /** Scalar for DateTime */
  DateTime: any;
};

export type AccessRequest = {
  emailId?: Maybe<Scalars['String']>;
  reason?: Maybe<Scalars['String']>;
  status?: Maybe<InvitationStatus>;
  id?: Maybe<Scalars['BigInteger']>;
};

export type AccessRequestInput = {
  emailId?: Maybe<Scalars['String']>;
  reason?: Maybe<Scalars['String']>;
  status?: Maybe<InvitationStatus>;
  id?: Maybe<Scalars['BigInteger']>;
};

export type AllowedDesignationResponse = {
  designationName?: Maybe<Scalars['String']>;
  isgranted: Scalars['Boolean'];
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
  /** ISO-8601 */
  createdAt?: Maybe<Scalars['DateTime']>;
  emailId?: Maybe<Scalars['String']>;
  status?: Maybe<InvitationStatus>;
  token?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['BigInteger']>;
};

export type InvitationInput = {
  /** ISO-8601 */
  createdAt?: Maybe<Scalars['DateTime']>;
  emailId?: Maybe<Scalars['String']>;
  status?: Maybe<InvitationStatus>;
  token?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['BigInteger']>;
};

export type InvitationResponse = {
  responseStatus: Scalars['Int'];
  responseText?: Maybe<Scalars['String']>;
  token?: Maybe<Scalars['String']>;
};

export enum InvitationStatus {
  Completed = 'COMPLETED',
  Expired = 'EXPIRED',
  Pending = 'PENDING'
}

/** Mutation root */
export type Mutation = {
  /** Verify Invitation */
  verifyInvitation?: Maybe<InvitationResponse>;
  /** Create a new token */
  createInvitationToken?: Maybe<InvitationResponse>;
  /** Delete SR */
  deleteSharedResource?: Maybe<SharedResource>;
  /** Create a new SR */
  createOrUpdateSharedResource?: Maybe<SharedResource>;
  /** Check whether desg8ination is whitelisted */
  verifyDesignation?: Maybe<AllowedDesignationResponse>;
  /** Create a new Employee */
  createProject?: Maybe<Project>;
  /** Delete skills of SR */
  deleteSkillForSR?: Maybe<EmployeeSkillProficiency>;
  /** Create a new access request */
  createAccessRequest?: Maybe<AccessRequest>;
  /** Add a new skill */
  createSkill?: Maybe<Skill>;
  /** Update skill of SR */
  updateSkillOfSR?: Maybe<EmployeeSkillProficiency>;
  /** Create a new resource request */
  createOrUpdateResourceRequest?: Maybe<ResourceRequest>;
  /** Add skills to SR */
  addSkillsToSR?: Maybe<SharedResource>;
  /** Create a new Employee */
  createEmployee?: Maybe<Employee>;
};


/** Mutation root */
export type MutationVerifyInvitationArgs = {
  emailId?: Maybe<Scalars['String']>;
  token?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};


/** Mutation root */
export type MutationCreateInvitationTokenArgs = {
  invitation?: Maybe<InvitationInput>;
};


/** Mutation root */
export type MutationDeleteSharedResourceArgs = {
  id?: Maybe<Scalars['BigInteger']>;
};


/** Mutation root */
export type MutationCreateOrUpdateSharedResourceArgs = {
  resource?: Maybe<SharedResourceInput>;
};


/** Mutation root */
export type MutationVerifyDesignationArgs = {
  designation?: Maybe<Scalars['String']>;
};


/** Mutation root */
export type MutationCreateProjectArgs = {
  project?: Maybe<ProjectInput>;
};


/** Mutation root */
export type MutationDeleteSkillForSrArgs = {
  id?: Maybe<Scalars['BigInteger']>;
  employeeSkillProficiency?: Maybe<EmployeeSkillProficiencyInput>;
};


/** Mutation root */
export type MutationCreateAccessRequestArgs = {
  accessRequest?: Maybe<AccessRequestInput>;
};


/** Mutation root */
export type MutationCreateSkillArgs = {
  skill?: Maybe<SkillInput>;
};


/** Mutation root */
export type MutationUpdateSkillOfSrArgs = {
  id?: Maybe<Scalars['BigInteger']>;
  employeeSkillProficiency?: Maybe<EmployeeSkillProficiencyInput>;
};


/** Mutation root */
export type MutationCreateOrUpdateResourceRequestArgs = {
  resourceRequest?: Maybe<ResourceRequestInput>;
};


/** Mutation root */
export type MutationAddSkillsToSrArgs = {
  id?: Maybe<Scalars['BigInteger']>;
  employeeSkillProficiencies?: Maybe<Array<Maybe<EmployeeSkillProficiencyInput>>>;
};


/** Mutation root */
export type MutationCreateEmployeeArgs = {
  employee?: Maybe<EmployeeInput>;
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
  /** Get all resources */
  sharedResource?: Maybe<Array<Maybe<SharedResource>>>;
  /** Get invitations by Id */
  getInvitationById?: Maybe<Invitation>;
  /** Get all access requests */
  accessRequest?: Maybe<Array<Maybe<AccessRequest>>>;
  /** Get all Employees */
  employee?: Maybe<Array<Maybe<Employee>>>;
  /** Get resources request by id */
  sharedResourceRequestById?: Maybe<ResourceRequest>;
  /** Get all Employees using the filters eq, lt,le,gt,ge */
  employeesWithFilter?: Maybe<Array<Maybe<Employee>>>;
  /** Get all resources using the filters eq, lt,le,gt,ge */
  sharedResourceWithFilters?: Maybe<Array<Maybe<Employee>>>;
  /** Get all projects */
  project?: Maybe<Array<Maybe<Project>>>;
  /** Get all resources request */
  sharedResourceRequest?: Maybe<Array<Maybe<ResourceRequest>>>;
  /** Get an SR by id */
  sharedResourceById?: Maybe<SharedResource>;
  /** Get an SR by emailId */
  sharedResourceByEmailId?: Maybe<SharedResource>;
  /** Get all skills */
  skill?: Maybe<Array<Maybe<Skill>>>;
  /** Get required skills of request Id */
  getSkillsByRequestId?: Maybe<Array<Maybe<ResourceRequestSkillsProficiency>>>;
  /** Get an employee by id */
  employeeById?: Maybe<Employee>;
  /** Get all invitations */
  invitation?: Maybe<Array<Maybe<Invitation>>>;
};


/** Query root */
export type QueryGetInvitationByIdArgs = {
  id: Scalars['BigInteger'];
};


/** Query root */
export type QuerySharedResourceRequestByIdArgs = {
  id: Scalars['BigInteger'];
};


/** Query root */
export type QueryEmployeesWithFilterArgs = {
  filter?: Maybe<EmployeeFilterInput>;
};


/** Query root */
export type QuerySharedResourceWithFiltersArgs = {
  filter?: Maybe<EmployeeFilterInput>;
};


/** Query root */
export type QuerySharedResourceByIdArgs = {
  id?: Maybe<Scalars['BigInteger']>;
};


/** Query root */
export type QuerySharedResourceByEmailIdArgs = {
  emailId?: Maybe<Scalars['String']>;
};


/** Query root */
export type QueryGetSkillsByRequestIdArgs = {
  id: Scalars['BigInteger'];
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
  createdAt?: Maybe<Scalars['DateTime']>;
  /** ISO-8601 */
  endDate?: Maybe<Scalars['Date']>;
  pillar?: Maybe<Scalars['String']>;
  project?: Maybe<Scalars['String']>;
  requester?: Maybe<Employee>;
  skillProficiencies?: Maybe<Array<Maybe<ResourceRequestSkillsProficiency>>>;
  /** ISO-8601 */
  startDate?: Maybe<Scalars['Date']>;
  status?: Maybe<ResourceRequestStatus>;
  taskDetails?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['BigInteger']>;
};

export type ResourceRequestInput = {
  /** ISO-8601 */
  createdAt?: Maybe<Scalars['DateTime']>;
  /** ISO-8601 */
  endDate?: Maybe<Scalars['Date']>;
  pillar?: Maybe<Scalars['String']>;
  project?: Maybe<Scalars['String']>;
  requester?: Maybe<EmployeeInput>;
  skillProficiencies?: Maybe<Array<Maybe<ResourceRequestSkillsProficiencyInput>>>;
  /** ISO-8601 */
  startDate?: Maybe<Scalars['Date']>;
  status?: Maybe<ResourceRequestStatus>;
  taskDetails?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['BigInteger']>;
};

export type ResourceRequestSkillsProficiency = {
  proficiencyLevel?: Maybe<SkillProficiencyLevel>;
  resourceRequest?: Maybe<ResourceRequest>;
  skill?: Maybe<Skill>;
  id?: Maybe<Scalars['BigInteger']>;
};

export type ResourceRequestSkillsProficiencyInput = {
  proficiencyLevel?: Maybe<SkillProficiencyLevel>;
  resourceRequest?: Maybe<ResourceRequestInput>;
  skill?: Maybe<SkillInput>;
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

export type GetAllInvitationsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllInvitationsQuery = { invitation?: Maybe<Array<Maybe<Pick<Invitation, 'emailId' | 'status' | 'id'>>>> };

export type GetInvitationByIdQueryVariables = Exact<{
  id: Scalars['BigInteger'];
}>;


export type GetInvitationByIdQuery = { getInvitationById?: Maybe<Pick<Invitation, 'token' | 'createdAt' | 'emailId' | 'status' | 'id'>> };

export type CreateInvitationMutationVariables = Exact<{
  invitation?: Maybe<InvitationInput>;
}>;


export type CreateInvitationMutation = { createInvitationToken?: Maybe<Pick<InvitationResponse, 'token' | 'responseStatus' | 'responseText'>> };

export type VerifyInvitationMutationVariables = Exact<{
  emailId?: Maybe<Scalars['String']>;
  token?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
}>;


export type VerifyInvitationMutation = { verifyInvitation?: Maybe<Pick<InvitationResponse, 'responseStatus' | 'responseText'>> };

export type VerifyDesignationMutationVariables = Exact<{
  designation?: Maybe<Scalars['String']>;
}>;


export type VerifyDesignationMutation = { verifyDesignation?: Maybe<Pick<AllowedDesignationResponse, 'isgranted' | 'designationName'>> };

export type AccessrequestMutationVariables = Exact<{
  accessRequest?: Maybe<AccessRequestInput>;
}>;


export type AccessrequestMutation = { createAccessRequest?: Maybe<Pick<AccessRequest, 'id'>> };

export type GetAllAccessRequestsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllAccessRequestsQuery = { accessRequest?: Maybe<Array<Maybe<Pick<AccessRequest, 'id' | 'status' | 'reason' | 'emailId'>>>> };

export type GetResourceRequestsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetResourceRequestsQuery = { sharedResourceRequest?: Maybe<Array<Maybe<(
    Pick<ResourceRequest, 'project' | 'pillar' | 'startDate' | 'endDate' | 'status' | 'id'>
    & { requester?: Maybe<Pick<Employee, 'firstName'>> }
  )>>> };

export type GetSkillsByRequestIdQueryVariables = Exact<{
  id: Scalars['BigInteger'];
}>;


export type GetSkillsByRequestIdQuery = { getSkillsByRequestId?: Maybe<Array<Maybe<(
    Pick<ResourceRequestSkillsProficiency, 'id' | 'proficiencyLevel'>
    & { skill?: Maybe<Pick<Skill, 'id' | 'name'>> }
  )>>> };

export type GetResourceRequestByIdQueryVariables = Exact<{
  id: Scalars['BigInteger'];
}>;


export type GetResourceRequestByIdQuery = { sharedResourceRequestById?: Maybe<(
    Pick<ResourceRequest, 'createdAt' | 'taskDetails' | 'project' | 'pillar' | 'startDate' | 'endDate' | 'status' | 'id'>
    & { requester?: Maybe<Pick<Employee, 'firstName'>> }
  )> };

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


export const GetAllInvitationsDocument = gql`
    query getAllInvitations {
  invitation {
    emailId
    status
    id
  }
}
    `;

/**
 * __useGetAllInvitationsQuery__
 *
 * To run a query within a React component, call `useGetAllInvitationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllInvitationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllInvitationsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllInvitationsQuery(baseOptions?: Apollo.QueryHookOptions<GetAllInvitationsQuery, GetAllInvitationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllInvitationsQuery, GetAllInvitationsQueryVariables>(GetAllInvitationsDocument, options);
      }
export function useGetAllInvitationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllInvitationsQuery, GetAllInvitationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllInvitationsQuery, GetAllInvitationsQueryVariables>(GetAllInvitationsDocument, options);
        }
export type GetAllInvitationsQueryHookResult = ReturnType<typeof useGetAllInvitationsQuery>;
export type GetAllInvitationsLazyQueryHookResult = ReturnType<typeof useGetAllInvitationsLazyQuery>;
export type GetAllInvitationsQueryResult = Apollo.QueryResult<GetAllInvitationsQuery, GetAllInvitationsQueryVariables>;
export const GetInvitationByIdDocument = gql`
    query getInvitationById($id: BigInteger!) {
  getInvitationById(id: $id) {
    token
    createdAt
    emailId
    status
    id
  }
}
    `;

/**
 * __useGetInvitationByIdQuery__
 *
 * To run a query within a React component, call `useGetInvitationByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetInvitationByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetInvitationByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetInvitationByIdQuery(baseOptions: Apollo.QueryHookOptions<GetInvitationByIdQuery, GetInvitationByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetInvitationByIdQuery, GetInvitationByIdQueryVariables>(GetInvitationByIdDocument, options);
      }
export function useGetInvitationByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetInvitationByIdQuery, GetInvitationByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetInvitationByIdQuery, GetInvitationByIdQueryVariables>(GetInvitationByIdDocument, options);
        }
export type GetInvitationByIdQueryHookResult = ReturnType<typeof useGetInvitationByIdQuery>;
export type GetInvitationByIdLazyQueryHookResult = ReturnType<typeof useGetInvitationByIdLazyQuery>;
export type GetInvitationByIdQueryResult = Apollo.QueryResult<GetInvitationByIdQuery, GetInvitationByIdQueryVariables>;
export const CreateInvitationDocument = gql`
    mutation createInvitation($invitation: InvitationInput) {
  createInvitationToken(invitation: $invitation) {
    token
    responseStatus
    responseText
  }
}
    `;
export type CreateInvitationMutationFn = Apollo.MutationFunction<CreateInvitationMutation, CreateInvitationMutationVariables>;

/**
 * __useCreateInvitationMutation__
 *
 * To run a mutation, you first call `useCreateInvitationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateInvitationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createInvitationMutation, { data, loading, error }] = useCreateInvitationMutation({
 *   variables: {
 *      invitation: // value for 'invitation'
 *   },
 * });
 */
export function useCreateInvitationMutation(baseOptions?: Apollo.MutationHookOptions<CreateInvitationMutation, CreateInvitationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateInvitationMutation, CreateInvitationMutationVariables>(CreateInvitationDocument, options);
      }
export type CreateInvitationMutationHookResult = ReturnType<typeof useCreateInvitationMutation>;
export type CreateInvitationMutationResult = Apollo.MutationResult<CreateInvitationMutation>;
export type CreateInvitationMutationOptions = Apollo.BaseMutationOptions<CreateInvitationMutation, CreateInvitationMutationVariables>;
export const VerifyInvitationDocument = gql`
    mutation verifyInvitation($emailId: String, $token: String, $name: String) {
  verifyInvitation(emailId: $emailId, token: $token, name: $name) {
    responseStatus
    responseText
  }
}
    `;
export type VerifyInvitationMutationFn = Apollo.MutationFunction<VerifyInvitationMutation, VerifyInvitationMutationVariables>;

/**
 * __useVerifyInvitationMutation__
 *
 * To run a mutation, you first call `useVerifyInvitationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVerifyInvitationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [verifyInvitationMutation, { data, loading, error }] = useVerifyInvitationMutation({
 *   variables: {
 *      emailId: // value for 'emailId'
 *      token: // value for 'token'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useVerifyInvitationMutation(baseOptions?: Apollo.MutationHookOptions<VerifyInvitationMutation, VerifyInvitationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<VerifyInvitationMutation, VerifyInvitationMutationVariables>(VerifyInvitationDocument, options);
      }
export type VerifyInvitationMutationHookResult = ReturnType<typeof useVerifyInvitationMutation>;
export type VerifyInvitationMutationResult = Apollo.MutationResult<VerifyInvitationMutation>;
export type VerifyInvitationMutationOptions = Apollo.BaseMutationOptions<VerifyInvitationMutation, VerifyInvitationMutationVariables>;
export const VerifyDesignationDocument = gql`
    mutation verifyDesignation($designation: String) {
  verifyDesignation(designation: $designation) {
    isgranted
    designationName
  }
}
    `;
export type VerifyDesignationMutationFn = Apollo.MutationFunction<VerifyDesignationMutation, VerifyDesignationMutationVariables>;

/**
 * __useVerifyDesignationMutation__
 *
 * To run a mutation, you first call `useVerifyDesignationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVerifyDesignationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [verifyDesignationMutation, { data, loading, error }] = useVerifyDesignationMutation({
 *   variables: {
 *      designation: // value for 'designation'
 *   },
 * });
 */
export function useVerifyDesignationMutation(baseOptions?: Apollo.MutationHookOptions<VerifyDesignationMutation, VerifyDesignationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<VerifyDesignationMutation, VerifyDesignationMutationVariables>(VerifyDesignationDocument, options);
      }
export type VerifyDesignationMutationHookResult = ReturnType<typeof useVerifyDesignationMutation>;
export type VerifyDesignationMutationResult = Apollo.MutationResult<VerifyDesignationMutation>;
export type VerifyDesignationMutationOptions = Apollo.BaseMutationOptions<VerifyDesignationMutation, VerifyDesignationMutationVariables>;
export const AccessrequestDocument = gql`
    mutation accessrequest($accessRequest: AccessRequestInput) {
  createAccessRequest(accessRequest: $accessRequest) {
    id
  }
}
    `;
export type AccessrequestMutationFn = Apollo.MutationFunction<AccessrequestMutation, AccessrequestMutationVariables>;

/**
 * __useAccessrequestMutation__
 *
 * To run a mutation, you first call `useAccessrequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAccessrequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [accessrequestMutation, { data, loading, error }] = useAccessrequestMutation({
 *   variables: {
 *      accessRequest: // value for 'accessRequest'
 *   },
 * });
 */
export function useAccessrequestMutation(baseOptions?: Apollo.MutationHookOptions<AccessrequestMutation, AccessrequestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AccessrequestMutation, AccessrequestMutationVariables>(AccessrequestDocument, options);
      }
export type AccessrequestMutationHookResult = ReturnType<typeof useAccessrequestMutation>;
export type AccessrequestMutationResult = Apollo.MutationResult<AccessrequestMutation>;
export type AccessrequestMutationOptions = Apollo.BaseMutationOptions<AccessrequestMutation, AccessrequestMutationVariables>;
export const GetAllAccessRequestsDocument = gql`
    query getAllAccessRequests {
  accessRequest {
    id
    status
    reason
    emailId
  }
}
    `;

/**
 * __useGetAllAccessRequestsQuery__
 *
 * To run a query within a React component, call `useGetAllAccessRequestsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllAccessRequestsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllAccessRequestsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllAccessRequestsQuery(baseOptions?: Apollo.QueryHookOptions<GetAllAccessRequestsQuery, GetAllAccessRequestsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllAccessRequestsQuery, GetAllAccessRequestsQueryVariables>(GetAllAccessRequestsDocument, options);
      }
export function useGetAllAccessRequestsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllAccessRequestsQuery, GetAllAccessRequestsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllAccessRequestsQuery, GetAllAccessRequestsQueryVariables>(GetAllAccessRequestsDocument, options);
        }
export type GetAllAccessRequestsQueryHookResult = ReturnType<typeof useGetAllAccessRequestsQuery>;
export type GetAllAccessRequestsLazyQueryHookResult = ReturnType<typeof useGetAllAccessRequestsLazyQuery>;
export type GetAllAccessRequestsQueryResult = Apollo.QueryResult<GetAllAccessRequestsQuery, GetAllAccessRequestsQueryVariables>;
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
export const GetSkillsByRequestIdDocument = gql`
    query getSkillsByRequestId($id: BigInteger!) {
  getSkillsByRequestId(id: $id) {
    id
    proficiencyLevel
    skill {
      id
      name
    }
  }
}
    `;

/**
 * __useGetSkillsByRequestIdQuery__
 *
 * To run a query within a React component, call `useGetSkillsByRequestIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSkillsByRequestIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSkillsByRequestIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetSkillsByRequestIdQuery(baseOptions: Apollo.QueryHookOptions<GetSkillsByRequestIdQuery, GetSkillsByRequestIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSkillsByRequestIdQuery, GetSkillsByRequestIdQueryVariables>(GetSkillsByRequestIdDocument, options);
      }
export function useGetSkillsByRequestIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSkillsByRequestIdQuery, GetSkillsByRequestIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSkillsByRequestIdQuery, GetSkillsByRequestIdQueryVariables>(GetSkillsByRequestIdDocument, options);
        }
export type GetSkillsByRequestIdQueryHookResult = ReturnType<typeof useGetSkillsByRequestIdQuery>;
export type GetSkillsByRequestIdLazyQueryHookResult = ReturnType<typeof useGetSkillsByRequestIdLazyQuery>;
export type GetSkillsByRequestIdQueryResult = Apollo.QueryResult<GetSkillsByRequestIdQuery, GetSkillsByRequestIdQueryVariables>;
export const GetResourceRequestByIdDocument = gql`
    query getResourceRequestById($id: BigInteger!) {
  sharedResourceRequestById(id: $id) {
    requester {
      firstName
    }
    createdAt
    taskDetails
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
 * __useGetResourceRequestByIdQuery__
 *
 * To run a query within a React component, call `useGetResourceRequestByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetResourceRequestByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetResourceRequestByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetResourceRequestByIdQuery(baseOptions: Apollo.QueryHookOptions<GetResourceRequestByIdQuery, GetResourceRequestByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetResourceRequestByIdQuery, GetResourceRequestByIdQueryVariables>(GetResourceRequestByIdDocument, options);
      }
export function useGetResourceRequestByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetResourceRequestByIdQuery, GetResourceRequestByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetResourceRequestByIdQuery, GetResourceRequestByIdQueryVariables>(GetResourceRequestByIdDocument, options);
        }
export type GetResourceRequestByIdQueryHookResult = ReturnType<typeof useGetResourceRequestByIdQuery>;
export type GetResourceRequestByIdLazyQueryHookResult = ReturnType<typeof useGetResourceRequestByIdLazyQuery>;
export type GetResourceRequestByIdQueryResult = Apollo.QueryResult<GetResourceRequestByIdQuery, GetResourceRequestByIdQueryVariables>;
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