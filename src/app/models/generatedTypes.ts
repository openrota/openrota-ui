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


export type DashboardDto = {
  requestDashboard?: Maybe<ResourceRequestDashboard>;
  sharedResourceDashboard?: Maybe<SharedResourceDashboard>;
};



export type Employee = {
  designation?: Maybe<Scalars['String']>;
  emailId?: Maybe<Scalars['String']>;
  employeeId?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  roles?: Maybe<Array<Maybe<Role>>>;
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
  roles?: Maybe<Array<Maybe<RoleInput>>>;
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

export enum FieldType {
  Select = 'SELECT',
  Text = 'TEXT'
}

export type FilterFieldInput = {
  operator?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

export type Invitation = {
  /** ISO-8601 */
  createdAt?: Maybe<Scalars['DateTime']>;
  emailId?: Maybe<Scalars['String']>;
  invitationLinkParams?: Maybe<Scalars['String']>;
  role?: Maybe<Role>;
  status?: Maybe<InvitationStatus>;
  token?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['BigInteger']>;
};

export type InvitationInput = {
  /** ISO-8601 */
  createdAt?: Maybe<Scalars['DateTime']>;
  emailId?: Maybe<Scalars['String']>;
  invitationLinkParams?: Maybe<Scalars['String']>;
  role?: Maybe<RoleInput>;
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
  Pending = 'PENDING',
  Rejected = 'REJECTED'
}

/** Mutation root */
export type Mutation = {
  /** Check whether designation is whitelisted */
  verifyDesignation?: Maybe<AllowedDesignationResponse>;
  /** complete project */
  completeProject?: Maybe<Project>;
  /** Create or Update Project */
  createOrUpdateProject?: Maybe<Project>;
  /** Add a new process */
  createProcess?: Maybe<Process>;
  /** resource request actions */
  handleResourceRequestActions?: Maybe<ResourceRequest>;
  /** handle access request actions */
  handleAccessRequestActions?: Maybe<AccessRequest>;
  /** Create a new token */
  createInvitationToken?: Maybe<InvitationResponse>;
  /** Update skill of SR */
  updateSkillOfSR?: Maybe<EmployeeSkillProficiency>;
  /** Delete skills of SR */
  deleteSkillForSR?: Maybe<EmployeeSkillProficiency>;
  /** Delete SR */
  deleteSharedResource?: Maybe<SharedResource>;
  /** Create a new Employee */
  createEmployee?: Maybe<Employee>;
  /** Create a new SR */
  createOrUpdateSharedResource?: Maybe<SharedResource>;
  /** Add a new skill */
  createSkill?: Maybe<Skill>;
  /** Add skills to SR */
  addSkillsToSR?: Maybe<SharedResource>;
  /** Refresh token */
  resendInvitation?: Maybe<Invitation>;
  /** process handler */
  processActionHandler?: Maybe<Process>;
  /** Verify Invitation */
  verifyInvitation?: Maybe<InvitationResponse>;
  /** Create a new access request */
  createAccessRequest?: Maybe<AccessRequest>;
  /** Add roles to Employee */
  addRoleToEmployee?: Maybe<Employee>;
  /** Create a new resource request */
  createOrUpdateResourceRequest?: Maybe<ResourceRequest>;
};


/** Mutation root */
export type MutationVerifyDesignationArgs = {
  designation?: Maybe<Scalars['String']>;
};


/** Mutation root */
export type MutationCompleteProjectArgs = {
  projectId: Scalars['BigInteger'];
  comments?: Maybe<Scalars['String']>;
};


/** Mutation root */
export type MutationCreateOrUpdateProjectArgs = {
  project?: Maybe<ProjectInput>;
};


/** Mutation root */
export type MutationCreateProcessArgs = {
  process?: Maybe<ProcessInput>;
};


/** Mutation root */
export type MutationHandleResourceRequestActionsArgs = {
  action?: Maybe<RowAction>;
  resourceRequest?: Maybe<ResourceRequestInput>;
};


/** Mutation root */
export type MutationHandleAccessRequestActionsArgs = {
  actionName?: Maybe<RowAction>;
  accessRequest?: Maybe<AccessRequestInput>;
};


/** Mutation root */
export type MutationCreateInvitationTokenArgs = {
  invitation?: Maybe<InvitationInput>;
};


/** Mutation root */
export type MutationUpdateSkillOfSrArgs = {
  id?: Maybe<Scalars['BigInteger']>;
  employeeSkillProficiency?: Maybe<EmployeeSkillProficiencyInput>;
};


/** Mutation root */
export type MutationDeleteSkillForSrArgs = {
  id?: Maybe<Scalars['BigInteger']>;
  employeeSkillProficiency?: Maybe<EmployeeSkillProficiencyInput>;
};


/** Mutation root */
export type MutationDeleteSharedResourceArgs = {
  id?: Maybe<Scalars['BigInteger']>;
};


/** Mutation root */
export type MutationCreateEmployeeArgs = {
  employee?: Maybe<EmployeeInput>;
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
export type MutationAddSkillsToSrArgs = {
  id?: Maybe<Scalars['BigInteger']>;
  employeeSkillProficiencies?: Maybe<Array<Maybe<EmployeeSkillProficiencyInput>>>;
};


/** Mutation root */
export type MutationResendInvitationArgs = {
  id?: Maybe<Scalars['BigInteger']>;
};


/** Mutation root */
export type MutationProcessActionHandlerArgs = {
  processActionId?: Maybe<Scalars['BigInteger']>;
  recordId?: Maybe<Scalars['BigInteger']>;
};


/** Mutation root */
export type MutationVerifyInvitationArgs = {
  emailId?: Maybe<Scalars['String']>;
  token?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};


/** Mutation root */
export type MutationCreateAccessRequestArgs = {
  accessRequest?: Maybe<AccessRequestInput>;
};


/** Mutation root */
export type MutationAddRoleToEmployeeArgs = {
  employeeId?: Maybe<Scalars['BigInteger']>;
  roles?: Maybe<Array<Maybe<RoleInput>>>;
};


/** Mutation root */
export type MutationCreateOrUpdateResourceRequestArgs = {
  resourceRequest?: Maybe<ResourceRequestInput>;
};

export type Process = {
  processActions?: Maybe<Array<Maybe<ProcessAction>>>;
  processFields?: Maybe<Array<Maybe<ProcessField>>>;
  processName?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['BigInteger']>;
};

export type ProcessAction = {
  actionName?: Maybe<Scalars['String']>;
  process?: Maybe<Process>;
  id?: Maybe<Scalars['BigInteger']>;
};

export type ProcessActionInput = {
  actionName?: Maybe<Scalars['String']>;
  process?: Maybe<ProcessInput>;
  id?: Maybe<Scalars['BigInteger']>;
};

export type ProcessField = {
  fieldName?: Maybe<Scalars['String']>;
  fieldType?: Maybe<FieldType>;
  process?: Maybe<Process>;
  id?: Maybe<Scalars['BigInteger']>;
};

export type ProcessFieldInput = {
  fieldName?: Maybe<Scalars['String']>;
  fieldType?: Maybe<FieldType>;
  process?: Maybe<ProcessInput>;
  id?: Maybe<Scalars['BigInteger']>;
};

export type ProcessInput = {
  processActions?: Maybe<Array<Maybe<ProcessActionInput>>>;
  processFields?: Maybe<Array<Maybe<ProcessFieldInput>>>;
  processName?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['BigInteger']>;
};

export type Project = {
  businessUnit: Scalars['String'];
  /** ISO-8601 */
  createdAt?: Maybe<Scalars['DateTime']>;
  employee?: Maybe<SharedResource>;
  projectManager?: Maybe<Employee>;
  projectName: Scalars['String'];
  resourcerequest?: Maybe<ResourceRequest>;
  skillSet?: Maybe<Array<Maybe<Scalars['String']>>>;
  slot?: Maybe<Slot>;
  status?: Maybe<ProjectStatus>;
  id?: Maybe<Scalars['BigInteger']>;
};

export type ProjectInput = {
  businessUnit: Scalars['String'];
  /** ISO-8601 */
  createdAt?: Maybe<Scalars['DateTime']>;
  employee?: Maybe<SharedResourceInput>;
  projectManager?: Maybe<EmployeeInput>;
  projectName: Scalars['String'];
  resourcerequest?: Maybe<ResourceRequestInput>;
  skillSet?: Maybe<Array<Maybe<Scalars['String']>>>;
  slot?: Maybe<SlotInput>;
  status?: Maybe<ProjectStatus>;
  id?: Maybe<Scalars['BigInteger']>;
};

export enum ProjectStatus {
  Assigned = 'ASSIGNED',
  Cancelled = 'CANCELLED',
  Completed = 'COMPLETED',
  ExtensionApproved = 'EXTENSION_APPROVED',
  ExtensionDenied = 'EXTENSION_DENIED',
  ExtensionRequested = 'EXTENSION_REQUESTED',
  Inprogress = 'INPROGRESS',
  Pending = 'PENDING',
  YetToStart = 'YET_TO_START'
}

/** Query root */
export type Query = {
  /** Get all resources using the filters eq, lt,le,gt,ge */
  sharedResourceWithFilters?: Maybe<Array<Maybe<Employee>>>;
  /** Get invitations by Id */
  getInvitationById?: Maybe<Invitation>;
  /** Get an SR by emailId */
  sharedResourceByEmailId?: Maybe<SharedResource>;
  /** Get project by id */
  getProjectById?: Maybe<Project>;
  /** Get an employee by emailId */
  employeeByEmailId?: Maybe<Employee>;
  /** Get all roles */
  roles?: Maybe<Array<Maybe<Role>>>;
  /** Get all resources request */
  sharedResourceRequest?: Maybe<Array<Maybe<ResourceRequest>>>;
  /** Get all Employees */
  employee?: Maybe<Array<Maybe<Employee>>>;
  /** Get an employee by id */
  employeeById?: Maybe<Employee>;
  /** Get an SR by id */
  sharedResourceById?: Maybe<SharedResource>;
  /** Get all projects */
  project?: Maybe<Array<Maybe<Project>>>;
  /** Get all Employees using the filters eq, lt,le,gt,ge */
  employeesWithFilter?: Maybe<Array<Maybe<Employee>>>;
  /** Get all processes */
  process?: Maybe<Array<Maybe<Process>>>;
  /** Get access request by Id */
  accessRequestbyId?: Maybe<AccessRequest>;
  /** Get roles by employee */
  roleByEmployeeId?: Maybe<Array<Maybe<Role>>>;
  /** Get projects by resource */
  projectsByResource?: Maybe<Array<Maybe<Project>>>;
  /** Get all skills */
  skill?: Maybe<Array<Maybe<Skill>>>;
  /** Get all access requests */
  accessRequest?: Maybe<Array<Maybe<AccessRequest>>>;
  /** Get projects by requestor */
  projectsByRequestor?: Maybe<Array<Maybe<Project>>>;
  /** Get dashboard data */
  dashboard?: Maybe<DashboardDto>;
  /** Get all resources request by requestor */
  sharedResourceRequestByRequestorId?: Maybe<Array<Maybe<ResourceRequest>>>;
  /** Get all processes action */
  processAction?: Maybe<Array<Maybe<ProcessAction>>>;
  /** isResourceAccessAllowed */
  isResourceAccessAllowed?: Maybe<AllowedDesignationResponse>;
  /** Get resources request by id */
  sharedResourceRequestById?: Maybe<ResourceRequest>;
  /** Get all resources */
  sharedResource?: Maybe<Array<Maybe<SharedResource>>>;
  /** Get all invitations */
  invitation?: Maybe<Array<Maybe<Invitation>>>;
};


/** Query root */
export type QuerySharedResourceWithFiltersArgs = {
  filter?: Maybe<EmployeeFilterInput>;
};


/** Query root */
export type QueryGetInvitationByIdArgs = {
  id: Scalars['BigInteger'];
};


/** Query root */
export type QuerySharedResourceByEmailIdArgs = {
  emailId?: Maybe<Scalars['String']>;
};


/** Query root */
export type QueryGetProjectByIdArgs = {
  id: Scalars['BigInteger'];
};


/** Query root */
export type QueryEmployeeByEmailIdArgs = {
  emailId?: Maybe<Scalars['String']>;
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
export type QueryEmployeesWithFilterArgs = {
  filter?: Maybe<EmployeeFilterInput>;
};


/** Query root */
export type QueryAccessRequestbyIdArgs = {
  id?: Maybe<Scalars['BigInteger']>;
};


/** Query root */
export type QueryRoleByEmployeeIdArgs = {
  employeeId?: Maybe<Scalars['BigInteger']>;
};


/** Query root */
export type QueryProjectsByResourceArgs = {
  id: Scalars['BigInteger'];
};


/** Query root */
export type QueryProjectsByRequestorArgs = {
  id: Scalars['BigInteger'];
};


/** Query root */
export type QuerySharedResourceRequestByRequestorIdArgs = {
  id: Scalars['BigInteger'];
};


/** Query root */
export type QueryProcessActionArgs = {
  processId?: Maybe<Scalars['BigInteger']>;
};


/** Query root */
export type QueryIsResourceAccessAllowedArgs = {
  email?: Maybe<Scalars['String']>;
};


/** Query root */
export type QuerySharedResourceRequestByIdArgs = {
  id: Scalars['BigInteger'];
};

export enum ResourceAvailabilityStatus {
  Available = 'AVAILABLE',
  Unavailable = 'UNAVAILABLE'
}

export type ResourceRequest = {
  businessUnit?: Maybe<Scalars['String']>;
  /** ISO-8601 */
  createdAt?: Maybe<Scalars['DateTime']>;
  endDate?: Maybe<Scalars['String']>;
  /** ISO-8601 */
  endLocalDate?: Maybe<Scalars['Date']>;
  project?: Maybe<Scalars['String']>;
  requester?: Maybe<Employee>;
  resource?: Maybe<SharedResource>;
  skillSet?: Maybe<Array<Maybe<Scalars['String']>>>;
  startDate?: Maybe<Scalars['String']>;
  /** ISO-8601 */
  startLocalDate?: Maybe<Scalars['Date']>;
  status?: Maybe<ResourceRequestStatus>;
  suggestedResource?: Maybe<SharedResource>;
  taskDetails?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['BigInteger']>;
};

export type ResourceRequestDashboard = {
  canceledRequests: Scalars['Int'];
  completedRequests: Scalars['Int'];
  data?: Maybe<ResourceRequestDashboard>;
  pendingRequests: Scalars['Int'];
  totalRequests: Scalars['Int'];
};

export type ResourceRequestInput = {
  businessUnit?: Maybe<Scalars['String']>;
  /** ISO-8601 */
  createdAt?: Maybe<Scalars['DateTime']>;
  endDate?: Maybe<Scalars['String']>;
  project?: Maybe<Scalars['String']>;
  requester?: Maybe<EmployeeInput>;
  resource?: Maybe<SharedResourceInput>;
  skillSet?: Maybe<Array<Maybe<Scalars['String']>>>;
  startDate?: Maybe<Scalars['String']>;
  status?: Maybe<ResourceRequestStatus>;
  suggestedResource?: Maybe<SharedResourceInput>;
  taskDetails?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['BigInteger']>;
};

export enum ResourceRequestStatus {
  Assigned = 'ASSIGNED',
  Cancelled = 'CANCELLED',
  Completed = 'COMPLETED',
  Inprogress = 'INPROGRESS',
  Pending = 'PENDING'
}

export type Role = {
  description?: Maybe<Scalars['String']>;
  roleName?: Maybe<RoleType>;
  id?: Maybe<Scalars['BigInteger']>;
};

export type RoleInput = {
  description?: Maybe<Scalars['String']>;
  roleName?: Maybe<RoleType>;
  id?: Maybe<Scalars['BigInteger']>;
};

export enum RoleType {
  Admin = 'ADMIN',
  Manager = 'MANAGER',
  Requestor = 'REQUESTOR',
  Resource = 'RESOURCE'
}

export enum RowAction {
  Approve = 'APPROVE',
  Complete = 'COMPLETE',
  Reject = 'REJECT'
}

export type SharedResource = {
  projects?: Maybe<Array<Maybe<ResourceRequest>>>;
  skillSet?: Maybe<Array<Maybe<Scalars['String']>>>;
  status?: Maybe<ResourceAvailabilityStatus>;
  totalExperience?: Maybe<Scalars['String']>;
  designation?: Maybe<Scalars['String']>;
  emailId?: Maybe<Scalars['String']>;
  employeeId?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  roles?: Maybe<Array<Maybe<Role>>>;
  id?: Maybe<Scalars['BigInteger']>;
};

export type SharedResourceDashboard = {
  availableSharedResources: Scalars['Int'];
  data?: Maybe<SharedResourceDashboard>;
  totalSharedResources: Scalars['Int'];
  unavailableSharedResources: Scalars['Int'];
};

export type SharedResourceInput = {
  projects?: Maybe<Array<Maybe<ResourceRequestInput>>>;
  skillSet?: Maybe<Array<Maybe<Scalars['String']>>>;
  status?: Maybe<ResourceAvailabilityStatus>;
  totalExperience?: Maybe<Scalars['String']>;
  designation?: Maybe<Scalars['String']>;
  emailId?: Maybe<Scalars['String']>;
  employeeId?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  roles?: Maybe<Array<Maybe<RoleInput>>>;
  id?: Maybe<Scalars['BigInteger']>;
};

export type Skill = {
  name?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['BigInteger']>;
};

export type SkillInput = {
  name?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['BigInteger']>;
};

export enum SkillProficiencyLevel {
  Advanced = 'ADVANCED',
  Beginner = 'BEGINNER',
  Intermediate = 'INTERMEDIATE'
}

export type Slot = {
  endDate?: Maybe<Scalars['String']>;
  startDate?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['BigInteger']>;
};

export type SlotInput = {
  endDate?: Maybe<Scalars['String']>;
  startDate?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['BigInteger']>;
};

export type GetDashboardDataQueryVariables = Exact<{ [key: string]: never; }>;


export type GetDashboardDataQuery = { dashboard?: Maybe<{ requestDashboard?: Maybe<Pick<ResourceRequestDashboard, 'totalRequests' | 'pendingRequests' | 'completedRequests' | 'canceledRequests'>>, sharedResourceDashboard?: Maybe<Pick<SharedResourceDashboard, 'totalSharedResources' | 'availableSharedResources' | 'unavailableSharedResources'>> }> };

export type GetEmployeesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetEmployeesQuery = { employee?: Maybe<Array<Maybe<(
    Pick<Employee, 'id' | 'emailId' | 'lastName' | 'firstName'>
    & { roles?: Maybe<Array<Maybe<Pick<Role, 'roleName'>>>> }
  )>>> };

export type GetEmployeeByIdQueryVariables = Exact<{
  id?: Maybe<Scalars['BigInteger']>;
}>;


export type GetEmployeeByIdQuery = { employeeById?: Maybe<(
    Pick<Employee, 'id' | 'emailId' | 'lastName' | 'firstName'>
    & { roles?: Maybe<Array<Maybe<Pick<Role, 'roleName'>>>> }
  )> };

export type GetEmployeeByEmailIdQueryVariables = Exact<{
  emailId?: Maybe<Scalars['String']>;
}>;


export type GetEmployeeByEmailIdQuery = { employeeByEmailId?: Maybe<(
    Pick<Employee, 'id' | 'emailId' | 'lastName' | 'firstName'>
    & { roles?: Maybe<Array<Maybe<Pick<Role, 'roleName'>>>> }
  )> };

export type GetRoleByEmployeeIdQueryVariables = Exact<{
  employeeId?: Maybe<Scalars['BigInteger']>;
}>;


export type GetRoleByEmployeeIdQuery = { roleByEmployeeId?: Maybe<Array<Maybe<Pick<Role, 'roleName' | 'id'>>>> };

export type GetAllRolesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllRolesQuery = { roles?: Maybe<Array<Maybe<Pick<Role, 'roleName' | 'id'>>>> };

export type AddRolesToEmployeeMutationVariables = Exact<{
  employeeId?: Maybe<Scalars['BigInteger']>;
  roles?: Maybe<Array<Maybe<RoleInput>> | Maybe<RoleInput>>;
}>;


export type AddRolesToEmployeeMutation = { addRoleToEmployee?: Maybe<Pick<Employee, 'id'>> };

export type GetAllInvitationsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllInvitationsQuery = { invitation?: Maybe<Array<Maybe<Pick<Invitation, 'emailId' | 'status' | 'id'>>>> };

export type GetInvitationByIdQueryVariables = Exact<{
  id: Scalars['BigInteger'];
}>;


export type GetInvitationByIdQuery = { getInvitationById?: Maybe<Pick<Invitation, 'token' | 'createdAt' | 'emailId' | 'status' | 'invitationLinkParams' | 'id'>> };

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

export type ResendInvitationMutationVariables = Exact<{
  id: Scalars['BigInteger'];
}>;


export type ResendInvitationMutation = { resendInvitation?: Maybe<Pick<Invitation, 'emailId' | 'status' | 'id'>> };

export type VerifyDesignationMutationVariables = Exact<{
  designation?: Maybe<Scalars['String']>;
}>;


export type VerifyDesignationMutation = { verifyDesignation?: Maybe<Pick<AllowedDesignationResponse, 'isgranted' | 'designationName'>> };

export type IsResourceAccessAllowedQueryVariables = Exact<{
  email?: Maybe<Scalars['String']>;
}>;


export type IsResourceAccessAllowedQuery = { isResourceAccessAllowed?: Maybe<Pick<AllowedDesignationResponse, 'designationName' | 'isgranted'>> };

export type AccessrequestMutationVariables = Exact<{
  accessRequest?: Maybe<AccessRequestInput>;
}>;


export type AccessrequestMutation = { createAccessRequest?: Maybe<Pick<AccessRequest, 'id'>> };

export type HandleAccessRequestActionsMutationVariables = Exact<{
  actionName?: Maybe<RowAction>;
  accessRequest?: Maybe<AccessRequestInput>;
}>;


export type HandleAccessRequestActionsMutation = { handleAccessRequestActions?: Maybe<Pick<AccessRequest, 'id' | 'status'>> };

export type GetAllAccessRequestsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllAccessRequestsQuery = { accessRequest?: Maybe<Array<Maybe<Pick<AccessRequest, 'id' | 'status' | 'reason' | 'emailId'>>>> };

export type GetAccessRequestByIdQueryVariables = Exact<{
  id?: Maybe<Scalars['BigInteger']>;
}>;


export type GetAccessRequestByIdQuery = { accessRequestbyId?: Maybe<Pick<AccessRequest, 'id' | 'status' | 'reason' | 'emailId'>> };

export type GetProjectsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetProjectsQuery = { project?: Maybe<Array<Maybe<(
    Pick<Project, 'projectName' | 'businessUnit' | 'status' | 'createdAt' | 'id'>
    & { resourcerequest?: Maybe<{ resource?: Maybe<Pick<SharedResource, 'firstName' | 'employeeId'>> }>, slot?: Maybe<Pick<Slot, 'startDate' | 'endDate'>>, projectManager?: Maybe<Pick<Employee, 'firstName'>> }
  )>>> };

export type GetProjectByIdQueryVariables = Exact<{
  id: Scalars['BigInteger'];
}>;


export type GetProjectByIdQuery = { getProjectById?: Maybe<(
    Pick<Project, 'createdAt' | 'projectName' | 'businessUnit' | 'status' | 'id'>
    & { resourcerequest?: Maybe<(
      Pick<ResourceRequest, 'skillSet'>
      & { resource?: Maybe<Pick<SharedResource, 'firstName'>> }
    )>, slot?: Maybe<Pick<Slot, 'startDate' | 'endDate'>>, projectManager?: Maybe<Pick<Employee, 'firstName'>> }
  )> };

export type GetProjectsByRequestorQueryVariables = Exact<{
  id: Scalars['BigInteger'];
}>;


export type GetProjectsByRequestorQuery = { projectsByRequestor?: Maybe<Array<Maybe<(
    Pick<Project, 'createdAt' | 'projectName' | 'businessUnit' | 'status' | 'id'>
    & { resourcerequest?: Maybe<(
      Pick<ResourceRequest, 'skillSet'>
      & { resource?: Maybe<Pick<SharedResource, 'firstName'>> }
    )>, slot?: Maybe<Pick<Slot, 'startDate' | 'endDate'>>, projectManager?: Maybe<Pick<Employee, 'firstName'>> }
  )>>> };

export type ProjectsByResourceQueryVariables = Exact<{
  id: Scalars['BigInteger'];
}>;


export type ProjectsByResourceQuery = { projectsByResource?: Maybe<Array<Maybe<(
    Pick<Project, 'createdAt' | 'projectName' | 'businessUnit' | 'status' | 'id'>
    & { resourcerequest?: Maybe<(
      Pick<ResourceRequest, 'skillSet'>
      & { resource?: Maybe<Pick<SharedResource, 'firstName' | 'employeeId'>> }
    )>, slot?: Maybe<Pick<Slot, 'startDate' | 'endDate'>>, projectManager?: Maybe<Pick<Employee, 'firstName'>> }
  )>>> };

export type CreateProjectMutationVariables = Exact<{
  project: ProjectInput;
}>;


export type CreateProjectMutation = { createOrUpdateProject?: Maybe<Pick<Project, 'id'>> };

export type CompleteProjectMutationVariables = Exact<{
  projectId: Scalars['BigInteger'];
  comments: Scalars['String'];
}>;


export type CompleteProjectMutation = { completeProject?: Maybe<Pick<Project, 'id' | 'status'>> };

export type GetResourceRequestsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetResourceRequestsQuery = { sharedResourceRequest?: Maybe<Array<Maybe<(
    Pick<ResourceRequest, 'project' | 'businessUnit' | 'startDate' | 'endDate' | 'status' | 'id'>
    & { requester?: Maybe<Pick<Employee, 'firstName'>>, resource?: Maybe<Pick<SharedResource, 'id' | 'firstName'>>, suggestedResource?: Maybe<Pick<SharedResource, 'id' | 'firstName'>> }
  )>>> };

export type GetResourceRequestsByRequestorQueryVariables = Exact<{
  id: Scalars['BigInteger'];
}>;


export type GetResourceRequestsByRequestorQuery = { sharedResourceRequestByRequestorId?: Maybe<Array<Maybe<(
    Pick<ResourceRequest, 'skillSet' | 'project' | 'businessUnit' | 'startDate' | 'endDate' | 'status' | 'id'>
    & { requester?: Maybe<Pick<Employee, 'firstName'>>, resource?: Maybe<Pick<SharedResource, 'id' | 'firstName'>> }
  )>>> };

export type GetResourceRequestByIdQueryVariables = Exact<{
  id: Scalars['BigInteger'];
}>;


export type GetResourceRequestByIdQuery = { sharedResourceRequestById?: Maybe<(
    Pick<ResourceRequest, 'skillSet' | 'createdAt' | 'taskDetails' | 'project' | 'businessUnit' | 'startDate' | 'endDate' | 'status' | 'id'>
    & { requester?: Maybe<Pick<Employee, 'firstName'>>, suggestedResource?: Maybe<Pick<SharedResource, 'id' | 'firstName'>> }
  )> };

export type CreateResourceRequestMutationVariables = Exact<{
  resourceRequest?: Maybe<ResourceRequestInput>;
}>;


export type CreateResourceRequestMutation = { createOrUpdateResourceRequest?: Maybe<Pick<ResourceRequest, 'id'>> };

export type HandleResourceRequestActionsMutationVariables = Exact<{
  action?: Maybe<RowAction>;
  resourceRequest?: Maybe<ResourceRequestInput>;
}>;


export type HandleResourceRequestActionsMutation = { handleResourceRequestActions?: Maybe<(
    Pick<ResourceRequest, 'id' | 'status'>
    & { resource?: Maybe<Pick<SharedResource, 'firstName'>> }
  )> };

export type GetAllSharedResourceQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllSharedResourceQuery = { sharedResource?: Maybe<Array<Maybe<Pick<SharedResource, 'totalExperience' | 'lastName' | 'status' | 'firstName' | 'designation' | 'emailId' | 'employeeId' | 'id' | 'skillSet'>>>> };

export type GetSrByIdQueryVariables = Exact<{
  id?: Maybe<Scalars['BigInteger']>;
}>;


export type GetSrByIdQuery = { sharedResourceById?: Maybe<Pick<SharedResource, 'status' | 'skillSet' | 'designation' | 'firstName' | 'lastName' | 'emailId' | 'totalExperience' | 'employeeId' | 'id'>> };

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


export const GetDashboardDataDocument = gql`
    query getDashboardData {
  dashboard {
    requestDashboard {
      totalRequests
      pendingRequests
      completedRequests
      canceledRequests
    }
    sharedResourceDashboard {
      totalSharedResources
      availableSharedResources
      unavailableSharedResources
    }
  }
}
    `;

/**
 * __useGetDashboardDataQuery__
 *
 * To run a query within a React component, call `useGetDashboardDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDashboardDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDashboardDataQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetDashboardDataQuery(baseOptions?: Apollo.QueryHookOptions<GetDashboardDataQuery, GetDashboardDataQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetDashboardDataQuery, GetDashboardDataQueryVariables>(GetDashboardDataDocument, options);
      }
export function useGetDashboardDataLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetDashboardDataQuery, GetDashboardDataQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetDashboardDataQuery, GetDashboardDataQueryVariables>(GetDashboardDataDocument, options);
        }
export type GetDashboardDataQueryHookResult = ReturnType<typeof useGetDashboardDataQuery>;
export type GetDashboardDataLazyQueryHookResult = ReturnType<typeof useGetDashboardDataLazyQuery>;
export type GetDashboardDataQueryResult = Apollo.QueryResult<GetDashboardDataQuery, GetDashboardDataQueryVariables>;
export const GetEmployeesDocument = gql`
    query getEmployees {
  employee {
    id
    emailId
    lastName
    firstName
    roles {
      roleName
    }
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
export const GetEmployeeByIdDocument = gql`
    query getEmployeeById($id: BigInteger) {
  employeeById(id: $id) {
    id
    emailId
    lastName
    firstName
    roles {
      roleName
    }
  }
}
    `;

/**
 * __useGetEmployeeByIdQuery__
 *
 * To run a query within a React component, call `useGetEmployeeByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetEmployeeByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetEmployeeByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetEmployeeByIdQuery(baseOptions?: Apollo.QueryHookOptions<GetEmployeeByIdQuery, GetEmployeeByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetEmployeeByIdQuery, GetEmployeeByIdQueryVariables>(GetEmployeeByIdDocument, options);
      }
export function useGetEmployeeByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetEmployeeByIdQuery, GetEmployeeByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetEmployeeByIdQuery, GetEmployeeByIdQueryVariables>(GetEmployeeByIdDocument, options);
        }
export type GetEmployeeByIdQueryHookResult = ReturnType<typeof useGetEmployeeByIdQuery>;
export type GetEmployeeByIdLazyQueryHookResult = ReturnType<typeof useGetEmployeeByIdLazyQuery>;
export type GetEmployeeByIdQueryResult = Apollo.QueryResult<GetEmployeeByIdQuery, GetEmployeeByIdQueryVariables>;
export const GetEmployeeByEmailIdDocument = gql`
    query getEmployeeByEmailId($emailId: String) {
  employeeByEmailId(emailId: $emailId) {
    id
    emailId
    lastName
    firstName
    roles {
      roleName
    }
  }
}
    `;

/**
 * __useGetEmployeeByEmailIdQuery__
 *
 * To run a query within a React component, call `useGetEmployeeByEmailIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetEmployeeByEmailIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetEmployeeByEmailIdQuery({
 *   variables: {
 *      emailId: // value for 'emailId'
 *   },
 * });
 */
export function useGetEmployeeByEmailIdQuery(baseOptions?: Apollo.QueryHookOptions<GetEmployeeByEmailIdQuery, GetEmployeeByEmailIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetEmployeeByEmailIdQuery, GetEmployeeByEmailIdQueryVariables>(GetEmployeeByEmailIdDocument, options);
      }
export function useGetEmployeeByEmailIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetEmployeeByEmailIdQuery, GetEmployeeByEmailIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetEmployeeByEmailIdQuery, GetEmployeeByEmailIdQueryVariables>(GetEmployeeByEmailIdDocument, options);
        }
export type GetEmployeeByEmailIdQueryHookResult = ReturnType<typeof useGetEmployeeByEmailIdQuery>;
export type GetEmployeeByEmailIdLazyQueryHookResult = ReturnType<typeof useGetEmployeeByEmailIdLazyQuery>;
export type GetEmployeeByEmailIdQueryResult = Apollo.QueryResult<GetEmployeeByEmailIdQuery, GetEmployeeByEmailIdQueryVariables>;
export const GetRoleByEmployeeIdDocument = gql`
    query getRoleByEmployeeId($employeeId: BigInteger) {
  roleByEmployeeId(employeeId: $employeeId) {
    roleName
    id
  }
}
    `;

/**
 * __useGetRoleByEmployeeIdQuery__
 *
 * To run a query within a React component, call `useGetRoleByEmployeeIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRoleByEmployeeIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRoleByEmployeeIdQuery({
 *   variables: {
 *      employeeId: // value for 'employeeId'
 *   },
 * });
 */
export function useGetRoleByEmployeeIdQuery(baseOptions?: Apollo.QueryHookOptions<GetRoleByEmployeeIdQuery, GetRoleByEmployeeIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetRoleByEmployeeIdQuery, GetRoleByEmployeeIdQueryVariables>(GetRoleByEmployeeIdDocument, options);
      }
export function useGetRoleByEmployeeIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetRoleByEmployeeIdQuery, GetRoleByEmployeeIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetRoleByEmployeeIdQuery, GetRoleByEmployeeIdQueryVariables>(GetRoleByEmployeeIdDocument, options);
        }
export type GetRoleByEmployeeIdQueryHookResult = ReturnType<typeof useGetRoleByEmployeeIdQuery>;
export type GetRoleByEmployeeIdLazyQueryHookResult = ReturnType<typeof useGetRoleByEmployeeIdLazyQuery>;
export type GetRoleByEmployeeIdQueryResult = Apollo.QueryResult<GetRoleByEmployeeIdQuery, GetRoleByEmployeeIdQueryVariables>;
export const GetAllRolesDocument = gql`
    query getAllRoles {
  roles {
    roleName
    id
  }
}
    `;

/**
 * __useGetAllRolesQuery__
 *
 * To run a query within a React component, call `useGetAllRolesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllRolesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllRolesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllRolesQuery(baseOptions?: Apollo.QueryHookOptions<GetAllRolesQuery, GetAllRolesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllRolesQuery, GetAllRolesQueryVariables>(GetAllRolesDocument, options);
      }
export function useGetAllRolesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllRolesQuery, GetAllRolesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllRolesQuery, GetAllRolesQueryVariables>(GetAllRolesDocument, options);
        }
export type GetAllRolesQueryHookResult = ReturnType<typeof useGetAllRolesQuery>;
export type GetAllRolesLazyQueryHookResult = ReturnType<typeof useGetAllRolesLazyQuery>;
export type GetAllRolesQueryResult = Apollo.QueryResult<GetAllRolesQuery, GetAllRolesQueryVariables>;
export const AddRolesToEmployeeDocument = gql`
    mutation addRolesToEmployee($employeeId: BigInteger, $roles: [RoleInput]) {
  addRoleToEmployee(employeeId: $employeeId, roles: $roles) {
    id
  }
}
    `;
export type AddRolesToEmployeeMutationFn = Apollo.MutationFunction<AddRolesToEmployeeMutation, AddRolesToEmployeeMutationVariables>;

/**
 * __useAddRolesToEmployeeMutation__
 *
 * To run a mutation, you first call `useAddRolesToEmployeeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddRolesToEmployeeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addRolesToEmployeeMutation, { data, loading, error }] = useAddRolesToEmployeeMutation({
 *   variables: {
 *      employeeId: // value for 'employeeId'
 *      roles: // value for 'roles'
 *   },
 * });
 */
export function useAddRolesToEmployeeMutation(baseOptions?: Apollo.MutationHookOptions<AddRolesToEmployeeMutation, AddRolesToEmployeeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddRolesToEmployeeMutation, AddRolesToEmployeeMutationVariables>(AddRolesToEmployeeDocument, options);
      }
export type AddRolesToEmployeeMutationHookResult = ReturnType<typeof useAddRolesToEmployeeMutation>;
export type AddRolesToEmployeeMutationResult = Apollo.MutationResult<AddRolesToEmployeeMutation>;
export type AddRolesToEmployeeMutationOptions = Apollo.BaseMutationOptions<AddRolesToEmployeeMutation, AddRolesToEmployeeMutationVariables>;
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
    invitationLinkParams
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
export const ResendInvitationDocument = gql`
    mutation resendInvitation($id: BigInteger!) {
  resendInvitation(id: $id) {
    emailId
    status
    id
  }
}
    `;
export type ResendInvitationMutationFn = Apollo.MutationFunction<ResendInvitationMutation, ResendInvitationMutationVariables>;

/**
 * __useResendInvitationMutation__
 *
 * To run a mutation, you first call `useResendInvitationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResendInvitationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resendInvitationMutation, { data, loading, error }] = useResendInvitationMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useResendInvitationMutation(baseOptions?: Apollo.MutationHookOptions<ResendInvitationMutation, ResendInvitationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ResendInvitationMutation, ResendInvitationMutationVariables>(ResendInvitationDocument, options);
      }
export type ResendInvitationMutationHookResult = ReturnType<typeof useResendInvitationMutation>;
export type ResendInvitationMutationResult = Apollo.MutationResult<ResendInvitationMutation>;
export type ResendInvitationMutationOptions = Apollo.BaseMutationOptions<ResendInvitationMutation, ResendInvitationMutationVariables>;
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
export const IsResourceAccessAllowedDocument = gql`
    query isResourceAccessAllowed($email: String) {
  isResourceAccessAllowed(email: $email) {
    designationName
    isgranted
  }
}
    `;

/**
 * __useIsResourceAccessAllowedQuery__
 *
 * To run a query within a React component, call `useIsResourceAccessAllowedQuery` and pass it any options that fit your needs.
 * When your component renders, `useIsResourceAccessAllowedQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useIsResourceAccessAllowedQuery({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useIsResourceAccessAllowedQuery(baseOptions?: Apollo.QueryHookOptions<IsResourceAccessAllowedQuery, IsResourceAccessAllowedQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<IsResourceAccessAllowedQuery, IsResourceAccessAllowedQueryVariables>(IsResourceAccessAllowedDocument, options);
      }
export function useIsResourceAccessAllowedLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<IsResourceAccessAllowedQuery, IsResourceAccessAllowedQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<IsResourceAccessAllowedQuery, IsResourceAccessAllowedQueryVariables>(IsResourceAccessAllowedDocument, options);
        }
export type IsResourceAccessAllowedQueryHookResult = ReturnType<typeof useIsResourceAccessAllowedQuery>;
export type IsResourceAccessAllowedLazyQueryHookResult = ReturnType<typeof useIsResourceAccessAllowedLazyQuery>;
export type IsResourceAccessAllowedQueryResult = Apollo.QueryResult<IsResourceAccessAllowedQuery, IsResourceAccessAllowedQueryVariables>;
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
export const HandleAccessRequestActionsDocument = gql`
    mutation handleAccessRequestActions($actionName: RowAction, $accessRequest: AccessRequestInput) {
  handleAccessRequestActions(
    actionName: $actionName
    accessRequest: $accessRequest
  ) {
    id
    status
  }
}
    `;
export type HandleAccessRequestActionsMutationFn = Apollo.MutationFunction<HandleAccessRequestActionsMutation, HandleAccessRequestActionsMutationVariables>;

/**
 * __useHandleAccessRequestActionsMutation__
 *
 * To run a mutation, you first call `useHandleAccessRequestActionsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useHandleAccessRequestActionsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [handleAccessRequestActionsMutation, { data, loading, error }] = useHandleAccessRequestActionsMutation({
 *   variables: {
 *      actionName: // value for 'actionName'
 *      accessRequest: // value for 'accessRequest'
 *   },
 * });
 */
export function useHandleAccessRequestActionsMutation(baseOptions?: Apollo.MutationHookOptions<HandleAccessRequestActionsMutation, HandleAccessRequestActionsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<HandleAccessRequestActionsMutation, HandleAccessRequestActionsMutationVariables>(HandleAccessRequestActionsDocument, options);
      }
export type HandleAccessRequestActionsMutationHookResult = ReturnType<typeof useHandleAccessRequestActionsMutation>;
export type HandleAccessRequestActionsMutationResult = Apollo.MutationResult<HandleAccessRequestActionsMutation>;
export type HandleAccessRequestActionsMutationOptions = Apollo.BaseMutationOptions<HandleAccessRequestActionsMutation, HandleAccessRequestActionsMutationVariables>;
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
export const GetAccessRequestByIdDocument = gql`
    query getAccessRequestById($id: BigInteger) {
  accessRequestbyId(id: $id) {
    id
    status
    reason
    emailId
  }
}
    `;

/**
 * __useGetAccessRequestByIdQuery__
 *
 * To run a query within a React component, call `useGetAccessRequestByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAccessRequestByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAccessRequestByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetAccessRequestByIdQuery(baseOptions?: Apollo.QueryHookOptions<GetAccessRequestByIdQuery, GetAccessRequestByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAccessRequestByIdQuery, GetAccessRequestByIdQueryVariables>(GetAccessRequestByIdDocument, options);
      }
export function useGetAccessRequestByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAccessRequestByIdQuery, GetAccessRequestByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAccessRequestByIdQuery, GetAccessRequestByIdQueryVariables>(GetAccessRequestByIdDocument, options);
        }
export type GetAccessRequestByIdQueryHookResult = ReturnType<typeof useGetAccessRequestByIdQuery>;
export type GetAccessRequestByIdLazyQueryHookResult = ReturnType<typeof useGetAccessRequestByIdLazyQuery>;
export type GetAccessRequestByIdQueryResult = Apollo.QueryResult<GetAccessRequestByIdQuery, GetAccessRequestByIdQueryVariables>;
export const GetProjectsDocument = gql`
    query getProjects {
  project {
    resourcerequest {
      resource {
        firstName
        employeeId
      }
    }
    slot {
      startDate
      endDate
    }
    projectName
    businessUnit
    projectManager {
      firstName
    }
    status
    createdAt
    id
  }
}
    `;

/**
 * __useGetProjectsQuery__
 *
 * To run a query within a React component, call `useGetProjectsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProjectsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProjectsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetProjectsQuery(baseOptions?: Apollo.QueryHookOptions<GetProjectsQuery, GetProjectsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProjectsQuery, GetProjectsQueryVariables>(GetProjectsDocument, options);
      }
export function useGetProjectsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProjectsQuery, GetProjectsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProjectsQuery, GetProjectsQueryVariables>(GetProjectsDocument, options);
        }
export type GetProjectsQueryHookResult = ReturnType<typeof useGetProjectsQuery>;
export type GetProjectsLazyQueryHookResult = ReturnType<typeof useGetProjectsLazyQuery>;
export type GetProjectsQueryResult = Apollo.QueryResult<GetProjectsQuery, GetProjectsQueryVariables>;
export const GetProjectByIdDocument = gql`
    query getProjectById($id: BigInteger!) {
  getProjectById(id: $id) {
    createdAt
    resourcerequest {
      resource {
        firstName
      }
      skillSet
    }
    slot {
      startDate
      endDate
    }
    projectName
    projectManager {
      firstName
    }
    businessUnit
    status
    id
  }
}
    `;

/**
 * __useGetProjectByIdQuery__
 *
 * To run a query within a React component, call `useGetProjectByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProjectByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProjectByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetProjectByIdQuery(baseOptions: Apollo.QueryHookOptions<GetProjectByIdQuery, GetProjectByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProjectByIdQuery, GetProjectByIdQueryVariables>(GetProjectByIdDocument, options);
      }
export function useGetProjectByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProjectByIdQuery, GetProjectByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProjectByIdQuery, GetProjectByIdQueryVariables>(GetProjectByIdDocument, options);
        }
export type GetProjectByIdQueryHookResult = ReturnType<typeof useGetProjectByIdQuery>;
export type GetProjectByIdLazyQueryHookResult = ReturnType<typeof useGetProjectByIdLazyQuery>;
export type GetProjectByIdQueryResult = Apollo.QueryResult<GetProjectByIdQuery, GetProjectByIdQueryVariables>;
export const GetProjectsByRequestorDocument = gql`
    query getProjectsByRequestor($id: BigInteger!) {
  projectsByRequestor(id: $id) {
    createdAt
    resourcerequest {
      resource {
        firstName
      }
      skillSet
    }
    slot {
      startDate
      endDate
    }
    projectName
    projectManager {
      firstName
    }
    businessUnit
    status
    id
  }
}
    `;

/**
 * __useGetProjectsByRequestorQuery__
 *
 * To run a query within a React component, call `useGetProjectsByRequestorQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProjectsByRequestorQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProjectsByRequestorQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetProjectsByRequestorQuery(baseOptions: Apollo.QueryHookOptions<GetProjectsByRequestorQuery, GetProjectsByRequestorQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProjectsByRequestorQuery, GetProjectsByRequestorQueryVariables>(GetProjectsByRequestorDocument, options);
      }
export function useGetProjectsByRequestorLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProjectsByRequestorQuery, GetProjectsByRequestorQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProjectsByRequestorQuery, GetProjectsByRequestorQueryVariables>(GetProjectsByRequestorDocument, options);
        }
export type GetProjectsByRequestorQueryHookResult = ReturnType<typeof useGetProjectsByRequestorQuery>;
export type GetProjectsByRequestorLazyQueryHookResult = ReturnType<typeof useGetProjectsByRequestorLazyQuery>;
export type GetProjectsByRequestorQueryResult = Apollo.QueryResult<GetProjectsByRequestorQuery, GetProjectsByRequestorQueryVariables>;
export const ProjectsByResourceDocument = gql`
    query projectsByResource($id: BigInteger!) {
  projectsByResource(id: $id) {
    createdAt
    resourcerequest {
      resource {
        firstName
        employeeId
      }
      skillSet
    }
    slot {
      startDate
      endDate
    }
    projectName
    projectManager {
      firstName
    }
    businessUnit
    status
    id
  }
}
    `;

/**
 * __useProjectsByResourceQuery__
 *
 * To run a query within a React component, call `useProjectsByResourceQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectsByResourceQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectsByResourceQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useProjectsByResourceQuery(baseOptions: Apollo.QueryHookOptions<ProjectsByResourceQuery, ProjectsByResourceQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProjectsByResourceQuery, ProjectsByResourceQueryVariables>(ProjectsByResourceDocument, options);
      }
export function useProjectsByResourceLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProjectsByResourceQuery, ProjectsByResourceQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProjectsByResourceQuery, ProjectsByResourceQueryVariables>(ProjectsByResourceDocument, options);
        }
export type ProjectsByResourceQueryHookResult = ReturnType<typeof useProjectsByResourceQuery>;
export type ProjectsByResourceLazyQueryHookResult = ReturnType<typeof useProjectsByResourceLazyQuery>;
export type ProjectsByResourceQueryResult = Apollo.QueryResult<ProjectsByResourceQuery, ProjectsByResourceQueryVariables>;
export const CreateProjectDocument = gql`
    mutation createProject($project: ProjectInput!) {
  createOrUpdateProject(project: $project) {
    id
  }
}
    `;
export type CreateProjectMutationFn = Apollo.MutationFunction<CreateProjectMutation, CreateProjectMutationVariables>;

/**
 * __useCreateProjectMutation__
 *
 * To run a mutation, you first call `useCreateProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProjectMutation, { data, loading, error }] = useCreateProjectMutation({
 *   variables: {
 *      project: // value for 'project'
 *   },
 * });
 */
export function useCreateProjectMutation(baseOptions?: Apollo.MutationHookOptions<CreateProjectMutation, CreateProjectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateProjectMutation, CreateProjectMutationVariables>(CreateProjectDocument, options);
      }
export type CreateProjectMutationHookResult = ReturnType<typeof useCreateProjectMutation>;
export type CreateProjectMutationResult = Apollo.MutationResult<CreateProjectMutation>;
export type CreateProjectMutationOptions = Apollo.BaseMutationOptions<CreateProjectMutation, CreateProjectMutationVariables>;
export const CompleteProjectDocument = gql`
    mutation completeProject($projectId: BigInteger!, $comments: String!) {
  completeProject(projectId: $projectId, comments: $comments) {
    id
    status
  }
}
    `;
export type CompleteProjectMutationFn = Apollo.MutationFunction<CompleteProjectMutation, CompleteProjectMutationVariables>;

/**
 * __useCompleteProjectMutation__
 *
 * To run a mutation, you first call `useCompleteProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCompleteProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [completeProjectMutation, { data, loading, error }] = useCompleteProjectMutation({
 *   variables: {
 *      projectId: // value for 'projectId'
 *      comments: // value for 'comments'
 *   },
 * });
 */
export function useCompleteProjectMutation(baseOptions?: Apollo.MutationHookOptions<CompleteProjectMutation, CompleteProjectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CompleteProjectMutation, CompleteProjectMutationVariables>(CompleteProjectDocument, options);
      }
export type CompleteProjectMutationHookResult = ReturnType<typeof useCompleteProjectMutation>;
export type CompleteProjectMutationResult = Apollo.MutationResult<CompleteProjectMutation>;
export type CompleteProjectMutationOptions = Apollo.BaseMutationOptions<CompleteProjectMutation, CompleteProjectMutationVariables>;
export const GetResourceRequestsDocument = gql`
    query getResourceRequests {
  sharedResourceRequest {
    requester {
      firstName
    }
    resource {
      id
      firstName
    }
    suggestedResource {
      id
      firstName
    }
    project
    businessUnit
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
export const GetResourceRequestsByRequestorDocument = gql`
    query getResourceRequestsByRequestor($id: BigInteger!) {
  sharedResourceRequestByRequestorId(id: $id) {
    requester {
      firstName
    }
    resource {
      id
      firstName
    }
    skillSet
    project
    businessUnit
    startDate
    endDate
    status
    id
  }
}
    `;

/**
 * __useGetResourceRequestsByRequestorQuery__
 *
 * To run a query within a React component, call `useGetResourceRequestsByRequestorQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetResourceRequestsByRequestorQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetResourceRequestsByRequestorQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetResourceRequestsByRequestorQuery(baseOptions: Apollo.QueryHookOptions<GetResourceRequestsByRequestorQuery, GetResourceRequestsByRequestorQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetResourceRequestsByRequestorQuery, GetResourceRequestsByRequestorQueryVariables>(GetResourceRequestsByRequestorDocument, options);
      }
export function useGetResourceRequestsByRequestorLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetResourceRequestsByRequestorQuery, GetResourceRequestsByRequestorQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetResourceRequestsByRequestorQuery, GetResourceRequestsByRequestorQueryVariables>(GetResourceRequestsByRequestorDocument, options);
        }
export type GetResourceRequestsByRequestorQueryHookResult = ReturnType<typeof useGetResourceRequestsByRequestorQuery>;
export type GetResourceRequestsByRequestorLazyQueryHookResult = ReturnType<typeof useGetResourceRequestsByRequestorLazyQuery>;
export type GetResourceRequestsByRequestorQueryResult = Apollo.QueryResult<GetResourceRequestsByRequestorQuery, GetResourceRequestsByRequestorQueryVariables>;
export const GetResourceRequestByIdDocument = gql`
    query getResourceRequestById($id: BigInteger!) {
  sharedResourceRequestById(id: $id) {
    requester {
      firstName
    }
    suggestedResource {
      id
      firstName
    }
    skillSet
    createdAt
    taskDetails
    project
    businessUnit
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
export const HandleResourceRequestActionsDocument = gql`
    mutation handleResourceRequestActions($action: RowAction, $resourceRequest: ResourceRequestInput) {
  handleResourceRequestActions(action: $action, resourceRequest: $resourceRequest) {
    id
    status
    resource {
      firstName
    }
  }
}
    `;
export type HandleResourceRequestActionsMutationFn = Apollo.MutationFunction<HandleResourceRequestActionsMutation, HandleResourceRequestActionsMutationVariables>;

/**
 * __useHandleResourceRequestActionsMutation__
 *
 * To run a mutation, you first call `useHandleResourceRequestActionsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useHandleResourceRequestActionsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [handleResourceRequestActionsMutation, { data, loading, error }] = useHandleResourceRequestActionsMutation({
 *   variables: {
 *      action: // value for 'action'
 *      resourceRequest: // value for 'resourceRequest'
 *   },
 * });
 */
export function useHandleResourceRequestActionsMutation(baseOptions?: Apollo.MutationHookOptions<HandleResourceRequestActionsMutation, HandleResourceRequestActionsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<HandleResourceRequestActionsMutation, HandleResourceRequestActionsMutationVariables>(HandleResourceRequestActionsDocument, options);
      }
export type HandleResourceRequestActionsMutationHookResult = ReturnType<typeof useHandleResourceRequestActionsMutation>;
export type HandleResourceRequestActionsMutationResult = Apollo.MutationResult<HandleResourceRequestActionsMutation>;
export type HandleResourceRequestActionsMutationOptions = Apollo.BaseMutationOptions<HandleResourceRequestActionsMutation, HandleResourceRequestActionsMutationVariables>;
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
    skillSet
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
    status
    skillSet
    designation
    firstName
    lastName
    emailId
    totalExperience
    designation
    employeeId
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