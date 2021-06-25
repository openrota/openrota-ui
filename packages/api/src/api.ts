/* tslint:disable */
/* eslint-disable */

import { Configuration } from "./configuration";
import globalAxios, { AxiosPromise, AxiosInstance } from "axios";
// Some imports not used depending on template conditions
// @ts-ignore
import {
  DUMMY_BASE_URL,
  assertParamExists,
  setBearerAuthToObject,
  setSearchParams,
  serializeDataIfNeeded,
  toPathString,
  createRequestFunction,
} from "./common";
// @ts-ignore
import { BASE_PATH, RequestArgs, BaseAPI } from "./base";

/**
 * Description of a skill of a Candidate.
 * @export
 * @interface CandidateSkills
 */
export interface CandidateSkills {
  /**
   *
   * @type {string}
   * @memberof CandidateSkills
   */
  id?: string;
  /**
   *
   * @type {string}
   * @memberof CandidateSkills
   */
  name?: string;
  /**
   *
   * @type {string}
   * @memberof CandidateSkills
   */
  status?: string;
}

/**
 * @export
 * @enum {string}
 */
export enum CandidateSkillsEnum {
  Beginner = "beginner",
  Intermediate = "intermediate",
  Advanced = "advanced",
}

/**
 * A Candidate configuration.
 * @export
 * @interface Candidate
 */
export interface Candidate {
  /**
   *
   * @type {string}
   * @memberof Candidate
   */
  id?: string;
  /**
   *
   * @type {string}
   * @memberof Candidate
   */
  RedhatEmployeeId?: number;
  /**
   *
   * @type {string}
   * @memberof Candidate
   */
  RedhatEmailId?: string;
  /**
   *
   * @type {string}
   * @memberof Candidate
   */
  name?: string;
  /**
   *
   * @type {string}
   * @memberof Candidate
   */
  experience?: string;
  /**
   *
   * @type {string}
   * @memberof Candidate
   */
  DateOfAvailability: string;
  /**
   *
   * @type {string}
   * @memberof Candidate
   */
  items?: Array<CandidateSkillsEnum>;
  /**
   *
   * @type {string}
   * @memberof Candidate
   */
  status?: string;
}

/**
 *
 * @export
 * @interface CandidateList
 */
export interface CandidateList {
  /**
   *
   * @type {string}
   * @memberof CandidateList
   */
  kind: string;
  /**
   *
   * @type {number}
   * @memberof CandidateList
   */
  page: number;
  /**
   *
   * @type {number}
   * @memberof CandidateList
   */
  size: number;
  /**
   *
   * @type {number}
   * @memberof CandidateList
   */
  total: number;
  /**
   *
   * @type {Array<Candidate>}
   * @memberof CandidateList
   */
  items: Array<Candidate>;
}

/**
 * CandidatesApi - axios parameter creator
 * @export
 */
export const CandidatesApiAxiosParamCreator = function(
  configuration?: Configuration
) {
  return {
    /**
     *
     * @summary Create a new Candidate
     * @param {boolean} async Perform the action in an asynchronous manner
     * @param {Candidate} Candidate Candidate data
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    createCandidate: async (
      async: boolean,
      candidate: Candidate,
      options: any = {}
    ): Promise<RequestArgs> => {
      // verify required parameter 'async' is not null or undefined
      assertParamExists("createCandidate", "async", async);
      // verify required parameter 'Candidate' is not null or undefined
      assertParamExists("createCandidate", "Candidate", candidate);
      const localVarPath = `/api/candidate`;
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);

      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }

      const localVarRequestOptions = {
        method: "POST",
        ...baseOptions,
        ...options,
      };

      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      // authentication Bearer required
      // http bearer authentication required
      await setBearerAuthToObject(localVarHeaderParameter, configuration);

      if (async !== undefined) {
        localVarQueryParameter["async"] = async;
      }

      localVarHeaderParameter["Content-Type"] = "application/json";

      setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
      let headersFromBaseOptions =
        baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = {
        ...localVarHeaderParameter,
        ...headersFromBaseOptions,
        ...options.headers,
      };
      localVarRequestOptions.data = serializeDataIfNeeded(
        candidate,
        localVarRequestOptions,
        configuration
      );

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
    /**
     *
     * @summary Delete a Candidate
     * @param {string} CandidateId The id of the Candidate
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    deleteCandidate: async (
      CandidateId: string,
      options: any = {}
    ): Promise<RequestArgs> => {
      // verify required parameter 'CandidateId' is not null or undefined
      assertParamExists("deleteCandidate", "CandidateId", CandidateId);
      const localVarPath = `/api/candidates/{candidate_id}`.replace(
        `{${"candidate_id"}}`,
        encodeURIComponent(String(CandidateId))
      );
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }

      const localVarRequestOptions = {
        method: "DELETE",
        ...baseOptions,
        ...options,
      };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      // authentication Bearer required
      // http bearer authentication required
      await setBearerAuthToObject(localVarHeaderParameter, configuration);

      setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
      let headersFromBaseOptions =
        baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = {
        ...localVarHeaderParameter,
        ...headersFromBaseOptions,
        ...options.headers,
      };

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
    /**
     *
     * @summary Get a Candidate
     * @param {string} candidateId The id of the Candidate
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    getCandidate: async (
      candidateId: string,
      options: any = {}
    ): Promise<RequestArgs> => {
      // verify required parameter 'candidateId' is not null or undefined
      assertParamExists("getCandidate", "candidateId", candidateId);
      const localVarPath = `/api/candidates/{candidate_id}`.replace(
        `{${"candidate_id"}}`,
        encodeURIComponent(String(candidateId))
      );
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }

      const localVarRequestOptions = {
        method: "GET",
        ...baseOptions,
        ...options,
      };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      // authentication Bearer required
      // http bearer authentication required
      await setBearerAuthToObject(localVarHeaderParameter, configuration);

      setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
      let headersFromBaseOptions =
        baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = {
        ...localVarHeaderParameter,
        ...headersFromBaseOptions,
        ...options.headers,
      };

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
    /**
     *
     * @summary Returns a list of Candidate types
     * @param {string} [page] Page index
     * @param {string} [size] Number of items in each page
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    listCandidates: async (
      page?: string,
      size?: string,
      options: any = {}
    ): Promise<RequestArgs> => {
      const localVarPath = `/api/candidates`;
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }

      const localVarRequestOptions = {
        method: "GET",
        ...baseOptions,
        ...options,
      };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      // authentication Bearer required
      // http bearer authentication required
      await setBearerAuthToObject(localVarHeaderParameter, configuration);

      if (page !== undefined) {
        localVarQueryParameter["page"] = page;
      }

      if (size !== undefined) {
        localVarQueryParameter["size"] = size;
      }

      setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
      let headersFromBaseOptions =
        baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = {
        ...localVarHeaderParameter,
        ...headersFromBaseOptions,
        ...options.headers,
      };

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
    /**
     *
     * @summary patch a Candidate
     * @param {string} CandidateId The id of the Candidate
     * @param {object} body Data to patch the Candidate with
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    patchCandidate: async (
      CandidateId: string,
      body: object,
      options: any = {}
    ): Promise<RequestArgs> => {
      // verify required parameter 'CandidateId' is not null or undefined
      assertParamExists("patchCandidate", "CandidateId", CandidateId);
      // verify required parameter 'body' is not null or undefined
      assertParamExists("patchCandidate", "body", body);
      const localVarPath = `/api/{candidate_id}`.replace(
        `{${"candidate_id"}}`,
        encodeURIComponent(String(CandidateId))
      );
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }

      const localVarRequestOptions = {
        method: "PATCH",
        ...baseOptions,
        ...options,
      };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      // authentication Bearer required
      // http bearer authentication required
      await setBearerAuthToObject(localVarHeaderParameter, configuration);

      localVarHeaderParameter["Content-Type"] = "application/json-patch+json";

      setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
      let headersFromBaseOptions =
        baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = {
        ...localVarHeaderParameter,
        ...headersFromBaseOptions,
        ...options.headers,
      };
      localVarRequestOptions.data = serializeDataIfNeeded(
        body,
        localVarRequestOptions,
        configuration
      );

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
  };
};

/**
 * CandidatesApi - functional programming interface
 * @export
 */
export const CandidatesApiFp = function(configuration?: Configuration) {
  const localVarAxiosParamCreator = CandidatesApiAxiosParamCreator(
    configuration
  );
  return {
    /**
     *
     * @summary Create a new Candidate
     * @param {boolean} async Perform the action in an asynchronous manner
     * @param {Candidate} Candidate Candidate data
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async createCandidate(
      async: boolean,
      candidate: Candidate,
      options?: any
    ): Promise<
      (axios?: AxiosInstance, basePath?: string) => AxiosPromise<Candidate>
    > {
      const localVarAxiosArgs = await localVarAxiosParamCreator.createCandidate(
        async,
        candidate,
        options
      );
      return createRequestFunction(
        localVarAxiosArgs,
        globalAxios,
        BASE_PATH,
        configuration
      );
    },
    /**
     *
     * @summary Delete a Candidate
     * @param {string} CandidateId The id of the Candidate
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async deleteCandidate(
      candidateId: string,
      options?: any
    ): Promise<
      (axios?: AxiosInstance, basePath?: string) => AxiosPromise<Error>
    > {
      const localVarAxiosArgs = await localVarAxiosParamCreator.deleteCandidate(
        candidateId,
        options
      );
      return createRequestFunction(
        localVarAxiosArgs,
        globalAxios,
        BASE_PATH,
        configuration
      );
    },
    /**
     *
     * @summary Get a Candidate
     * @param {string} CandidateId The id of the Candidate
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async getCandidate(
      candidateId: string,
      options?: any
    ): Promise<
      (axios?: AxiosInstance, basePath?: string) => AxiosPromise<Candidate>
    > {
      const localVarAxiosArgs = await localVarAxiosParamCreator.getCandidate(
        candidateId,
        options
      );
      return createRequestFunction(
        localVarAxiosArgs,
        globalAxios,
        BASE_PATH,
        configuration
      );
    },
    /**
     *
     * @summary Returns a list of Candidate types
     * @param {string} [page] Page index
     * @param {string} [size] Number of items in each page
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async listCandidates(
      page?: string,
      size?: string,
      options?: any
    ): Promise<
      (axios?: AxiosInstance, basePath?: string) => AxiosPromise<CandidateList>
    > {
      const localVarAxiosArgs = await localVarAxiosParamCreator.listCandidates(
        page,
        size,
        options
      );
      return createRequestFunction(
        localVarAxiosArgs,
        globalAxios,
        BASE_PATH,
        configuration
      );
    },
    /**
     *
     * @summary patch a Candidate
     * @param {string} CandidateId The id of the Candidate
     * @param {object} body Data to patch the Candidate with
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async patchCandidate(
      CandidateId: string,
      body: object,
      options?: any
    ): Promise<
      (axios?: AxiosInstance, basePath?: string) => AxiosPromise<Candidate>
    > {
      const localVarAxiosArgs = await localVarAxiosParamCreator.patchCandidate(
        CandidateId,
        body,
        options
      );
      return createRequestFunction(
        localVarAxiosArgs,
        globalAxios,
        BASE_PATH,
        configuration
      );
    },
  };
};

/**
 * CandidatesApi - factory interface
 * @export
 */
export const CandidatesApiFactory = function(
  configuration?: Configuration,
  basePath?: string,
  axios?: AxiosInstance
) {
  const localVarFp = CandidatesApiFp(configuration);
  return {
    /**
     *
     * @summary Create a new Candidate
     * @param {boolean} async Perform the action in an asynchronous manner
     * @param {Candidate} Candidate Candidate data
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    createCandidate(
      async: boolean,
      candidate: Candidate,
      options?: any
    ): AxiosPromise<Candidate> {
      return localVarFp
        .createCandidate(async, candidate, options)
        .then((request) => request(axios, basePath));
    },
    /**
     *
     * @summary Delete a Candidate
     * @param {string} candidateId The id of the Candidate
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    deleteCandidate(candidateId: string, options?: any): AxiosPromise<Error> {
      return localVarFp
        .deleteCandidate(candidateId, options)
        .then((request) => request(axios, basePath));
    },
    /**
     *
     * @summary Get a Candidate
     * @param {string} candidateId The id of the Candidate
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    getCandidate(candidateId: string, options?: any): AxiosPromise<Candidate> {
      return localVarFp
        .getCandidate(candidateId, options)
        .then((request) => request(axios, basePath));
    },
    /**
     *
     * @summary Returns a list of Candidate types
     * @param {string} [page] Page index
     * @param {string} [size] Number of items in each page
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    listCandidates(
      page?: string,
      size?: string,
      options?: any
    ): AxiosPromise<CandidateList> {
      return localVarFp
        .listCandidates(page, size, options)
        .then((request) => request(axios, basePath));
    },
    /**
     *
     * @summary patch a Candidate
     * @param {string} candidateId The id of the Candidate
     * @param {object} body Data to patch the Candidate with
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    patchCandidate(
      candidateId: string,
      body: object,
      options?: any
    ): AxiosPromise<Candidate> {
      return localVarFp
        .patchCandidate(candidateId, body, options)
        .then((request) => request(axios, basePath));
    },
  };
};

/**
 * CandidatesApi - interface
 * @export
 * @interface CandidatesApi
 */
export interface CandidatesApiInterface {
  /**
   *
   * @summary Create a new Candidate
   * @param {boolean} async Perform the action in an asynchronous manner
   * @param {Candidate} Candidate Candidate data
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof CandidatesApiInterface
   */
  createCandidate(
    async: boolean,
    Candidate: Candidate,
    options?: any
  ): AxiosPromise<Candidate>;

  /**
   *
   * @summary Delete a Candidate
   * @param {string} CandidateId The id of the Candidate
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof CandidatesApiInterface
   */
  deleteCandidate(candidateId: string, options?: any): AxiosPromise<Error>;

  /**
   *
   * @summary Get a Candidate
   * @param {string} candidateId The id of the Candidate
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof CandidatesApiInterface
   */
  getCandidate(candidateId: string, options?: any): AxiosPromise<Candidate>;

  /**
   *
   * @summary Returns a list of Candidate types
   * @param {string} [page] Page index
   * @param {string} [size] Number of items in each page
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof CandidatesApiInterface
   */
  listCandidates(
    page?: string,
    size?: string,
    options?: any
  ): AxiosPromise<CandidateList>;

  /**
   *
   * @summary patch a Candidate
   * @param {string} CandidateId The id of the Candidate
   * @param {object} body Data to patch the Candidate with
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof CandidatesApiInterface
   */
  patchCandidate(
    CandidateId: string,
    body: object,
    options?: any
  ): AxiosPromise<Candidate>;
}

/**
 * CandidatesApi - object-oriented interface
 * @export
 * @class CandidatesApi
 * @extends {BaseAPI}
 */

export class CandidatesApi extends BaseAPI implements CandidatesApiInterface {
  /**
   *
   * @summary Create a new candidate
   * @param {boolean} async Perform the action in an asynchronous manner
   * @param {Candidate} candidate Candidate data
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof CandidatesApi
   */
  public createCandidate(async: boolean, candidate: Candidate, options?: any) {
    return CandidatesApiFp(this.configuration)
      .createCandidate(async, candidate, options)
      .then((request) => request(this.axios, this.basePath));
  }

  /**
   *
   * @summary Delete a candidate
   * @param {string} candidateId The id of the candidate
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof CandidatesApi
   */
  public deleteCandidate(candidateId: string, options?: any) {
    return CandidatesApiFp(this.configuration)
      .deleteCandidate(candidateId, options)
      .then((request) => request(this.axios, this.basePath));
  }

  /**
   *
   * @summary Get a candidate
   * @param {string} candidateId The id of the candidate
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof CandidatesApi
   */
  public getCandidate(candidateId: string, options?: any) {
    return CandidatesApiFp(this.configuration)
      .getCandidate(candidateId, options)
      .then((request) => request(this.axios, this.basePath));
  }

  /**
   *
   * @summary Returns a list of candidate types
   * @param {string} [page] Page index
   * @param {string} [size] Number of items in each page
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof CandidatesApi
   */
  public listCandidates(page?: string, size?: string, options?: any) {
    return CandidatesApiFp(this.configuration)
      .listCandidates(page, size, options)
      .then((request) => request(this.axios, this.basePath));
  }

  /**
   *
   * @summary patch a candidate
   * @param {string} candidateId The id of the candidate
   * @param {object} body Data to patch the candidate with
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof CandidatesApi
   */
  public patchCandidate(candidateId: string, body: object, options?: any) {
    return CandidatesApiFp(this.configuration)
      .patchCandidate(candidateId, body, options)
      .then((request) => request(this.axios, this.basePath));
  }
}
