/* prettier-ignore-start */

/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as clerk from "../clerk.js";
import type * as clicks from "../clicks.js";
import type * as easilyAccount from "../easilyAccount.js";
import type * as http from "../http.js";
import type * as partners from "../partners.js";
import type * as products from "../products.js";
import type * as sales from "../sales.js";
import type * as savePoint from "../savePoint.js";
import type * as settings from "../settings.js";
import type * as transactions from "../transactions.js";
import type * as users from "../users.js";
import type * as validationUtils from "../validationUtils.js";
import type * as withdraw from "../withdraw.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  clerk: typeof clerk;
  clicks: typeof clicks;
  easilyAccount: typeof easilyAccount;
  http: typeof http;
  partners: typeof partners;
  products: typeof products;
  sales: typeof sales;
  savePoint: typeof savePoint;
  settings: typeof settings;
  transactions: typeof transactions;
  users: typeof users;
  validationUtils: typeof validationUtils;
  withdraw: typeof withdraw;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

/* prettier-ignore-end */
