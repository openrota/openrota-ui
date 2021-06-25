// Declare global variables for TypeScript and VSCode.
// Do not rename this file or move these types into index.d.ts
// @see https://code.visualstudio.com/docs/nodejs/working-with-javascript#_global-variables-and-type-checking
declare const __DEV__: boolean;
declare const __VERSION__: string;
declare const $FixMe: any;
declare module "*.svg" {
  const content: any;
  export default content;
}
declare module "*.jpg" {
  const content: any;
  export default content;
}


declare function __webpack_init_sharing__(s: string): Promise<void>;
declare const __webpack_share_scopes__: {[key: string]: any};