// @ts-nocheck
import { MeshContext } from "@graphql-mesh/runtime";
import { InContextSdkMethod } from "@graphql-mesh/types";

export namespace FundManagerTypes {
  export type Maybe<T> = T | null;
  export type InputMaybe<T> = Maybe<T>;
  export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
  export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
  export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
  export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
  export type Incremental<T> = T | { [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never };
  /** All built-in and custom scalars, mapped to their actual values */
  export type Scalars = {
    ID: { input: string; output: string };
    String: { input: string; output: string };
    Boolean: { input: boolean; output: boolean };
    Int: { input: number; output: number };
    Float: { input: number; output: number };
    BigDecimal: { input: any; output: any };
    BigInt: { input: any; output: any };
    Bytes: { input: any; output: any };
    Int8: { input: any; output: any };
    Timestamp: { input: any; output: any };
  };

  export type Aggregation_interval = "hour" | "day";

  export type Approval = {
    id: Scalars["Bytes"]["output"];
    owner: Scalars["Bytes"]["output"];
    spender: Scalars["Bytes"]["output"];
    value: Scalars["BigInt"]["output"];
    blockNumber: Scalars["BigInt"]["output"];
    blockTimestamp: Scalars["BigInt"]["output"];
    transactionHash: Scalars["Bytes"]["output"];
  };

  export type ApprovalForAll = {
    id: Scalars["Bytes"]["output"];
    owner: Scalars["Bytes"]["output"];
    operator: Scalars["Bytes"]["output"];
    approved: Scalars["Boolean"]["output"];
    blockNumber: Scalars["BigInt"]["output"];
    blockTimestamp: Scalars["BigInt"]["output"];
    transactionHash: Scalars["Bytes"]["output"];
  };

  export type ApprovalForAll_filter = {
    id?: InputMaybe<Scalars["Bytes"]["input"]>;
    id_not?: InputMaybe<Scalars["Bytes"]["input"]>;
    id_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
    id_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
    id_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
    id_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
    id_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
    id_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
    id_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
    id_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
    owner?: InputMaybe<Scalars["Bytes"]["input"]>;
    owner_not?: InputMaybe<Scalars["Bytes"]["input"]>;
    owner_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
    owner_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
    owner_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
    owner_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
    owner_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
    owner_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
    owner_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
    owner_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
    operator?: InputMaybe<Scalars["Bytes"]["input"]>;
    operator_not?: InputMaybe<Scalars["Bytes"]["input"]>;
    operator_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
    operator_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
    operator_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
    operator_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
    operator_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
    operator_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
    operator_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
    operator_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
    approved?: InputMaybe<Scalars["Boolean"]["input"]>;
    approved_not?: InputMaybe<Scalars["Boolean"]["input"]>;
    approved_in?: InputMaybe<Array<Scalars["Boolean"]["input"]>>;
    approved_not_in?: InputMaybe<Array<Scalars["Boolean"]["input"]>>;
    blockNumber?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockNumber_not?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockNumber_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockNumber_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockNumber_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockNumber_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockNumber_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
    blockNumber_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
    blockTimestamp?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockTimestamp_not?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockTimestamp_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockTimestamp_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockTimestamp_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockTimestamp_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockTimestamp_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
    blockTimestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
    transactionHash?: InputMaybe<Scalars["Bytes"]["input"]>;
    transactionHash_not?: InputMaybe<Scalars["Bytes"]["input"]>;
    transactionHash_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
    transactionHash_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
    transactionHash_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
    transactionHash_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
    transactionHash_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
    transactionHash_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
    transactionHash_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
    transactionHash_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
    /** Filter for the block changed event. */
    _change_block?: InputMaybe<BlockChangedFilter>;
    and?: InputMaybe<Array<InputMaybe<ApprovalForAll_filter>>>;
    or?: InputMaybe<Array<InputMaybe<ApprovalForAll_filter>>>;
  };

  export type ApprovalForAll_orderBy =
    | "id"
    | "owner"
    | "operator"
    | "approved"
    | "blockNumber"
    | "blockTimestamp"
    | "transactionHash";

  export type Approval_filter = {
    id?: InputMaybe<Scalars["Bytes"]["input"]>;
    id_not?: InputMaybe<Scalars["Bytes"]["input"]>;
    id_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
    id_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
    id_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
    id_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
    id_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
    id_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
    id_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
    id_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
    owner?: InputMaybe<Scalars["Bytes"]["input"]>;
    owner_not?: InputMaybe<Scalars["Bytes"]["input"]>;
    owner_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
    owner_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
    owner_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
    owner_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
    owner_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
    owner_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
    owner_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
    owner_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
    spender?: InputMaybe<Scalars["Bytes"]["input"]>;
    spender_not?: InputMaybe<Scalars["Bytes"]["input"]>;
    spender_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
    spender_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
    spender_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
    spender_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
    spender_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
    spender_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
    spender_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
    spender_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
    value?: InputMaybe<Scalars["BigInt"]["input"]>;
    value_not?: InputMaybe<Scalars["BigInt"]["input"]>;
    value_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
    value_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
    value_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
    value_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
    value_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
    value_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
    blockNumber?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockNumber_not?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockNumber_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockNumber_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockNumber_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockNumber_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockNumber_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
    blockNumber_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
    blockTimestamp?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockTimestamp_not?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockTimestamp_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockTimestamp_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockTimestamp_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockTimestamp_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockTimestamp_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
    blockTimestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
    transactionHash?: InputMaybe<Scalars["Bytes"]["input"]>;
    transactionHash_not?: InputMaybe<Scalars["Bytes"]["input"]>;
    transactionHash_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
    transactionHash_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
    transactionHash_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
    transactionHash_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
    transactionHash_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
    transactionHash_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
    transactionHash_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
    transactionHash_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
    /** Filter for the block changed event. */
    _change_block?: InputMaybe<BlockChangedFilter>;
    and?: InputMaybe<Array<InputMaybe<Approval_filter>>>;
    or?: InputMaybe<Array<InputMaybe<Approval_filter>>>;
  };

  export type Approval_orderBy =
    | "id"
    | "owner"
    | "spender"
    | "value"
    | "blockNumber"
    | "blockTimestamp"
    | "transactionHash";

  export type BlockChangedFilter = {
    number_gte: Scalars["Int"]["input"];
  };

  export type Block_height = {
    hash?: InputMaybe<Scalars["Bytes"]["input"]>;
    number?: InputMaybe<Scalars["Int"]["input"]>;
    number_gte?: InputMaybe<Scalars["Int"]["input"]>;
  };

  export type Deposit = {
    id: Scalars["Bytes"]["output"];
    user: Scalars["Bytes"]["output"];
    depositAmount: Scalars["BigInt"]["output"];
    shareTokensMinted: Scalars["BigInt"]["output"];
    blockNumber: Scalars["BigInt"]["output"];
    blockTimestamp: Scalars["BigInt"]["output"];
    transactionHash: Scalars["Bytes"]["output"];
    shareholder: Shareholder;
  };

  export type Deposit_filter = {
    id?: InputMaybe<Scalars["Bytes"]["input"]>;
    id_not?: InputMaybe<Scalars["Bytes"]["input"]>;
    id_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
    id_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
    id_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
    id_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
    id_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
    id_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
    id_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
    id_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
    user?: InputMaybe<Scalars["Bytes"]["input"]>;
    user_not?: InputMaybe<Scalars["Bytes"]["input"]>;
    user_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
    user_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
    user_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
    user_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
    user_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
    user_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
    user_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
    user_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
    depositAmount?: InputMaybe<Scalars["BigInt"]["input"]>;
    depositAmount_not?: InputMaybe<Scalars["BigInt"]["input"]>;
    depositAmount_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
    depositAmount_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
    depositAmount_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
    depositAmount_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
    depositAmount_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
    depositAmount_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
    shareTokensMinted?: InputMaybe<Scalars["BigInt"]["input"]>;
    shareTokensMinted_not?: InputMaybe<Scalars["BigInt"]["input"]>;
    shareTokensMinted_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
    shareTokensMinted_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
    shareTokensMinted_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
    shareTokensMinted_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
    shareTokensMinted_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
    shareTokensMinted_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
    blockNumber?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockNumber_not?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockNumber_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockNumber_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockNumber_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockNumber_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockNumber_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
    blockNumber_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
    blockTimestamp?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockTimestamp_not?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockTimestamp_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockTimestamp_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockTimestamp_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockTimestamp_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockTimestamp_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
    blockTimestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
    transactionHash?: InputMaybe<Scalars["Bytes"]["input"]>;
    transactionHash_not?: InputMaybe<Scalars["Bytes"]["input"]>;
    transactionHash_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
    transactionHash_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
    transactionHash_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
    transactionHash_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
    transactionHash_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
    transactionHash_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
    transactionHash_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
    transactionHash_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
    shareholder?: InputMaybe<Scalars["String"]["input"]>;
    shareholder_not?: InputMaybe<Scalars["String"]["input"]>;
    shareholder_gt?: InputMaybe<Scalars["String"]["input"]>;
    shareholder_lt?: InputMaybe<Scalars["String"]["input"]>;
    shareholder_gte?: InputMaybe<Scalars["String"]["input"]>;
    shareholder_lte?: InputMaybe<Scalars["String"]["input"]>;
    shareholder_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
    shareholder_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
    shareholder_contains?: InputMaybe<Scalars["String"]["input"]>;
    shareholder_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
    shareholder_not_contains?: InputMaybe<Scalars["String"]["input"]>;
    shareholder_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
    shareholder_starts_with?: InputMaybe<Scalars["String"]["input"]>;
    shareholder_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
    shareholder_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
    shareholder_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
    shareholder_ends_with?: InputMaybe<Scalars["String"]["input"]>;
    shareholder_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
    shareholder_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
    shareholder_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
    shareholder_?: InputMaybe<Shareholder_filter>;
    /** Filter for the block changed event. */
    _change_block?: InputMaybe<BlockChangedFilter>;
    and?: InputMaybe<Array<InputMaybe<Deposit_filter>>>;
    or?: InputMaybe<Array<InputMaybe<Deposit_filter>>>;
  };

  export type Deposit_orderBy =
    | "id"
    | "user"
    | "depositAmount"
    | "shareTokensMinted"
    | "blockNumber"
    | "blockTimestamp"
    | "transactionHash"
    | "shareholder"
    | "shareholder__id"
    | "shareholder__account"
    | "shareholder__shares"
    | "shareholder__lastUpdated";

  export type Investment = {
    id: Scalars["Bytes"]["output"];
    to: Scalars["Bytes"]["output"];
    amount: Scalars["BigInt"]["output"];
    blockNumber: Scalars["BigInt"]["output"];
    blockTimestamp: Scalars["BigInt"]["output"];
    transactionHash: Scalars["Bytes"]["output"];
  };

  export type Investment_filter = {
    id?: InputMaybe<Scalars["Bytes"]["input"]>;
    id_not?: InputMaybe<Scalars["Bytes"]["input"]>;
    id_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
    id_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
    id_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
    id_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
    id_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
    id_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
    id_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
    id_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
    to?: InputMaybe<Scalars["Bytes"]["input"]>;
    to_not?: InputMaybe<Scalars["Bytes"]["input"]>;
    to_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
    to_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
    to_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
    to_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
    to_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
    to_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
    to_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
    to_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
    amount?: InputMaybe<Scalars["BigInt"]["input"]>;
    amount_not?: InputMaybe<Scalars["BigInt"]["input"]>;
    amount_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
    amount_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
    amount_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
    amount_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
    amount_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
    amount_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
    blockNumber?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockNumber_not?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockNumber_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockNumber_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockNumber_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockNumber_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockNumber_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
    blockNumber_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
    blockTimestamp?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockTimestamp_not?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockTimestamp_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockTimestamp_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockTimestamp_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockTimestamp_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockTimestamp_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
    blockTimestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
    transactionHash?: InputMaybe<Scalars["Bytes"]["input"]>;
    transactionHash_not?: InputMaybe<Scalars["Bytes"]["input"]>;
    transactionHash_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
    transactionHash_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
    transactionHash_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
    transactionHash_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
    transactionHash_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
    transactionHash_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
    transactionHash_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
    transactionHash_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
    /** Filter for the block changed event. */
    _change_block?: InputMaybe<BlockChangedFilter>;
    and?: InputMaybe<Array<InputMaybe<Investment_filter>>>;
    or?: InputMaybe<Array<InputMaybe<Investment_filter>>>;
  };

  export type Investment_orderBy = "id" | "to" | "amount" | "blockNumber" | "blockTimestamp" | "transactionHash";

  export type ManagementFeeCollected = {
    id: Scalars["Bytes"]["output"];
    depositor: Scalars["Bytes"]["output"];
    feeAmount: Scalars["BigInt"]["output"];
    depositAmount: Scalars["BigInt"]["output"];
    blockNumber: Scalars["BigInt"]["output"];
    blockTimestamp: Scalars["BigInt"]["output"];
    transactionHash: Scalars["Bytes"]["output"];
  };

  export type ManagementFeeCollected_filter = {
    id?: InputMaybe<Scalars["Bytes"]["input"]>;
    id_not?: InputMaybe<Scalars["Bytes"]["input"]>;
    id_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
    id_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
    id_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
    id_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
    id_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
    id_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
    id_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
    id_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
    depositor?: InputMaybe<Scalars["Bytes"]["input"]>;
    depositor_not?: InputMaybe<Scalars["Bytes"]["input"]>;
    depositor_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
    depositor_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
    depositor_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
    depositor_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
    depositor_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
    depositor_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
    depositor_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
    depositor_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
    feeAmount?: InputMaybe<Scalars["BigInt"]["input"]>;
    feeAmount_not?: InputMaybe<Scalars["BigInt"]["input"]>;
    feeAmount_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
    feeAmount_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
    feeAmount_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
    feeAmount_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
    feeAmount_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
    feeAmount_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
    depositAmount?: InputMaybe<Scalars["BigInt"]["input"]>;
    depositAmount_not?: InputMaybe<Scalars["BigInt"]["input"]>;
    depositAmount_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
    depositAmount_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
    depositAmount_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
    depositAmount_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
    depositAmount_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
    depositAmount_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
    blockNumber?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockNumber_not?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockNumber_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockNumber_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockNumber_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockNumber_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockNumber_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
    blockNumber_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
    blockTimestamp?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockTimestamp_not?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockTimestamp_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockTimestamp_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockTimestamp_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockTimestamp_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockTimestamp_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
    blockTimestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
    transactionHash?: InputMaybe<Scalars["Bytes"]["input"]>;
    transactionHash_not?: InputMaybe<Scalars["Bytes"]["input"]>;
    transactionHash_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
    transactionHash_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
    transactionHash_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
    transactionHash_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
    transactionHash_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
    transactionHash_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
    transactionHash_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
    transactionHash_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
    /** Filter for the block changed event. */
    _change_block?: InputMaybe<BlockChangedFilter>;
    and?: InputMaybe<Array<InputMaybe<ManagementFeeCollected_filter>>>;
    or?: InputMaybe<Array<InputMaybe<ManagementFeeCollected_filter>>>;
  };

  export type ManagementFeeCollected_orderBy =
    | "id"
    | "depositor"
    | "feeAmount"
    | "depositAmount"
    | "blockNumber"
    | "blockTimestamp"
    | "transactionHash";

  export type ManagementFeeRecipientUpdated = {
    id: Scalars["Bytes"]["output"];
    newRecipient: Scalars["Bytes"]["output"];
    blockNumber: Scalars["BigInt"]["output"];
    blockTimestamp: Scalars["BigInt"]["output"];
    transactionHash: Scalars["Bytes"]["output"];
  };

  export type ManagementFeeRecipientUpdated_filter = {
    id?: InputMaybe<Scalars["Bytes"]["input"]>;
    id_not?: InputMaybe<Scalars["Bytes"]["input"]>;
    id_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
    id_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
    id_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
    id_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
    id_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
    id_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
    id_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
    id_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
    newRecipient?: InputMaybe<Scalars["Bytes"]["input"]>;
    newRecipient_not?: InputMaybe<Scalars["Bytes"]["input"]>;
    newRecipient_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
    newRecipient_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
    newRecipient_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
    newRecipient_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
    newRecipient_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
    newRecipient_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
    newRecipient_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
    newRecipient_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
    blockNumber?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockNumber_not?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockNumber_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockNumber_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockNumber_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockNumber_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockNumber_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
    blockNumber_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
    blockTimestamp?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockTimestamp_not?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockTimestamp_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockTimestamp_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockTimestamp_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockTimestamp_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockTimestamp_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
    blockTimestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
    transactionHash?: InputMaybe<Scalars["Bytes"]["input"]>;
    transactionHash_not?: InputMaybe<Scalars["Bytes"]["input"]>;
    transactionHash_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
    transactionHash_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
    transactionHash_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
    transactionHash_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
    transactionHash_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
    transactionHash_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
    transactionHash_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
    transactionHash_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
    /** Filter for the block changed event. */
    _change_block?: InputMaybe<BlockChangedFilter>;
    and?: InputMaybe<Array<InputMaybe<ManagementFeeRecipientUpdated_filter>>>;
    or?: InputMaybe<Array<InputMaybe<ManagementFeeRecipientUpdated_filter>>>;
  };

  export type ManagementFeeRecipientUpdated_orderBy =
    | "id"
    | "newRecipient"
    | "blockNumber"
    | "blockTimestamp"
    | "transactionHash";

  export type ManagementFeeUpdated = {
    id: Scalars["Bytes"]["output"];
    newFee: Scalars["Int"]["output"];
    blockNumber: Scalars["BigInt"]["output"];
    blockTimestamp: Scalars["BigInt"]["output"];
    transactionHash: Scalars["Bytes"]["output"];
  };

  export type ManagementFeeUpdated_filter = {
    id?: InputMaybe<Scalars["Bytes"]["input"]>;
    id_not?: InputMaybe<Scalars["Bytes"]["input"]>;
    id_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
    id_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
    id_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
    id_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
    id_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
    id_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
    id_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
    id_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
    newFee?: InputMaybe<Scalars["Int"]["input"]>;
    newFee_not?: InputMaybe<Scalars["Int"]["input"]>;
    newFee_gt?: InputMaybe<Scalars["Int"]["input"]>;
    newFee_lt?: InputMaybe<Scalars["Int"]["input"]>;
    newFee_gte?: InputMaybe<Scalars["Int"]["input"]>;
    newFee_lte?: InputMaybe<Scalars["Int"]["input"]>;
    newFee_in?: InputMaybe<Array<Scalars["Int"]["input"]>>;
    newFee_not_in?: InputMaybe<Array<Scalars["Int"]["input"]>>;
    blockNumber?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockNumber_not?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockNumber_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockNumber_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockNumber_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockNumber_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockNumber_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
    blockNumber_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
    blockTimestamp?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockTimestamp_not?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockTimestamp_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockTimestamp_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockTimestamp_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockTimestamp_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockTimestamp_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
    blockTimestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
    transactionHash?: InputMaybe<Scalars["Bytes"]["input"]>;
    transactionHash_not?: InputMaybe<Scalars["Bytes"]["input"]>;
    transactionHash_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
    transactionHash_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
    transactionHash_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
    transactionHash_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
    transactionHash_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
    transactionHash_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
    transactionHash_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
    transactionHash_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
    /** Filter for the block changed event. */
    _change_block?: InputMaybe<BlockChangedFilter>;
    and?: InputMaybe<Array<InputMaybe<ManagementFeeUpdated_filter>>>;
    or?: InputMaybe<Array<InputMaybe<ManagementFeeUpdated_filter>>>;
  };

  export type ManagementFeeUpdated_orderBy = "id" | "newFee" | "blockNumber" | "blockTimestamp" | "transactionHash";

  export type MembershipBadgeUpdated = {
    id: Scalars["Bytes"]["output"];
    newMembershipBadge: Scalars["Bytes"]["output"];
    blockNumber: Scalars["BigInt"]["output"];
    blockTimestamp: Scalars["BigInt"]["output"];
    transactionHash: Scalars["Bytes"]["output"];
  };

  export type MembershipBadgeUpdated_filter = {
    id?: InputMaybe<Scalars["Bytes"]["input"]>;
    id_not?: InputMaybe<Scalars["Bytes"]["input"]>;
    id_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
    id_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
    id_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
    id_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
    id_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
    id_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
    id_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
    id_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
    newMembershipBadge?: InputMaybe<Scalars["Bytes"]["input"]>;
    newMembershipBadge_not?: InputMaybe<Scalars["Bytes"]["input"]>;
    newMembershipBadge_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
    newMembershipBadge_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
    newMembershipBadge_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
    newMembershipBadge_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
    newMembershipBadge_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
    newMembershipBadge_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
    newMembershipBadge_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
    newMembershipBadge_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
    blockNumber?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockNumber_not?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockNumber_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockNumber_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockNumber_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockNumber_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockNumber_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
    blockNumber_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
    blockTimestamp?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockTimestamp_not?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockTimestamp_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockTimestamp_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockTimestamp_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockTimestamp_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockTimestamp_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
    blockTimestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
    transactionHash?: InputMaybe<Scalars["Bytes"]["input"]>;
    transactionHash_not?: InputMaybe<Scalars["Bytes"]["input"]>;
    transactionHash_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
    transactionHash_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
    transactionHash_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
    transactionHash_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
    transactionHash_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
    transactionHash_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
    transactionHash_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
    transactionHash_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
    /** Filter for the block changed event. */
    _change_block?: InputMaybe<BlockChangedFilter>;
    and?: InputMaybe<Array<InputMaybe<MembershipBadgeUpdated_filter>>>;
    or?: InputMaybe<Array<InputMaybe<MembershipBadgeUpdated_filter>>>;
  };

  export type MembershipBadgeUpdated_orderBy =
    | "id"
    | "newMembershipBadge"
    | "blockNumber"
    | "blockTimestamp"
    | "transactionHash";

  /** Defines the order direction, either ascending or descending */
  export type OrderDirection = "asc" | "desc";

  export type OwnershipTransfer = {
    id: Scalars["Bytes"]["output"];
    previousOwner: Scalars["Bytes"]["output"];
    newOwner: Scalars["Bytes"]["output"];
    blockNumber: Scalars["BigInt"]["output"];
    blockTimestamp: Scalars["BigInt"]["output"];
    transactionHash: Scalars["Bytes"]["output"];
  };

  export type OwnershipTransfer_filter = {
    id?: InputMaybe<Scalars["Bytes"]["input"]>;
    id_not?: InputMaybe<Scalars["Bytes"]["input"]>;
    id_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
    id_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
    id_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
    id_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
    id_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
    id_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
    id_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
    id_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
    previousOwner?: InputMaybe<Scalars["Bytes"]["input"]>;
    previousOwner_not?: InputMaybe<Scalars["Bytes"]["input"]>;
    previousOwner_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
    previousOwner_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
    previousOwner_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
    previousOwner_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
    previousOwner_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
    previousOwner_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
    previousOwner_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
    previousOwner_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
    newOwner?: InputMaybe<Scalars["Bytes"]["input"]>;
    newOwner_not?: InputMaybe<Scalars["Bytes"]["input"]>;
    newOwner_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
    newOwner_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
    newOwner_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
    newOwner_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
    newOwner_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
    newOwner_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
    newOwner_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
    newOwner_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
    blockNumber?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockNumber_not?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockNumber_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockNumber_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockNumber_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockNumber_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockNumber_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
    blockNumber_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
    blockTimestamp?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockTimestamp_not?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockTimestamp_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockTimestamp_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockTimestamp_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockTimestamp_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockTimestamp_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
    blockTimestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
    transactionHash?: InputMaybe<Scalars["Bytes"]["input"]>;
    transactionHash_not?: InputMaybe<Scalars["Bytes"]["input"]>;
    transactionHash_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
    transactionHash_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
    transactionHash_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
    transactionHash_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
    transactionHash_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
    transactionHash_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
    transactionHash_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
    transactionHash_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
    /** Filter for the block changed event. */
    _change_block?: InputMaybe<BlockChangedFilter>;
    and?: InputMaybe<Array<InputMaybe<OwnershipTransfer_filter>>>;
    or?: InputMaybe<Array<InputMaybe<OwnershipTransfer_filter>>>;
  };

  export type OwnershipTransfer_orderBy =
    | "id"
    | "previousOwner"
    | "newOwner"
    | "blockNumber"
    | "blockTimestamp"
    | "transactionHash";

  export type Pause = {
    id: Scalars["Bytes"]["output"];
    account: Scalars["Bytes"]["output"];
    blockNumber: Scalars["BigInt"]["output"];
    blockTimestamp: Scalars["BigInt"]["output"];
    transactionHash: Scalars["Bytes"]["output"];
  };

  export type Pause_filter = {
    id?: InputMaybe<Scalars["Bytes"]["input"]>;
    id_not?: InputMaybe<Scalars["Bytes"]["input"]>;
    id_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
    id_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
    id_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
    id_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
    id_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
    id_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
    id_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
    id_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
    account?: InputMaybe<Scalars["Bytes"]["input"]>;
    account_not?: InputMaybe<Scalars["Bytes"]["input"]>;
    account_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
    account_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
    account_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
    account_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
    account_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
    account_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
    account_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
    account_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
    blockNumber?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockNumber_not?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockNumber_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockNumber_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockNumber_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockNumber_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockNumber_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
    blockNumber_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
    blockTimestamp?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockTimestamp_not?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockTimestamp_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockTimestamp_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockTimestamp_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockTimestamp_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockTimestamp_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
    blockTimestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
    transactionHash?: InputMaybe<Scalars["Bytes"]["input"]>;
    transactionHash_not?: InputMaybe<Scalars["Bytes"]["input"]>;
    transactionHash_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
    transactionHash_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
    transactionHash_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
    transactionHash_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
    transactionHash_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
    transactionHash_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
    transactionHash_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
    transactionHash_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
    /** Filter for the block changed event. */
    _change_block?: InputMaybe<BlockChangedFilter>;
    and?: InputMaybe<Array<InputMaybe<Pause_filter>>>;
    or?: InputMaybe<Array<InputMaybe<Pause_filter>>>;
  };

  export type Pause_orderBy = "id" | "account" | "blockNumber" | "blockTimestamp" | "transactionHash";

  export type PortfolioUpdate = {
    id: Scalars["Bytes"]["output"];
    newPortfolioValue: Scalars["BigInt"]["output"];
    newSharePrice: Scalars["BigInt"]["output"];
    timestamp: Scalars["BigInt"]["output"];
    blockNumber: Scalars["BigInt"]["output"];
    blockTimestamp: Scalars["BigInt"]["output"];
    transactionHash: Scalars["Bytes"]["output"];
  };

  export type PortfolioUpdate_filter = {
    id?: InputMaybe<Scalars["Bytes"]["input"]>;
    id_not?: InputMaybe<Scalars["Bytes"]["input"]>;
    id_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
    id_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
    id_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
    id_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
    id_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
    id_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
    id_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
    id_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
    newPortfolioValue?: InputMaybe<Scalars["BigInt"]["input"]>;
    newPortfolioValue_not?: InputMaybe<Scalars["BigInt"]["input"]>;
    newPortfolioValue_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
    newPortfolioValue_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
    newPortfolioValue_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
    newPortfolioValue_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
    newPortfolioValue_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
    newPortfolioValue_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
    newSharePrice?: InputMaybe<Scalars["BigInt"]["input"]>;
    newSharePrice_not?: InputMaybe<Scalars["BigInt"]["input"]>;
    newSharePrice_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
    newSharePrice_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
    newSharePrice_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
    newSharePrice_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
    newSharePrice_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
    newSharePrice_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
    timestamp?: InputMaybe<Scalars["BigInt"]["input"]>;
    timestamp_not?: InputMaybe<Scalars["BigInt"]["input"]>;
    timestamp_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
    timestamp_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
    timestamp_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
    timestamp_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
    timestamp_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
    timestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
    blockNumber?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockNumber_not?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockNumber_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockNumber_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockNumber_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockNumber_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockNumber_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
    blockNumber_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
    blockTimestamp?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockTimestamp_not?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockTimestamp_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockTimestamp_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockTimestamp_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockTimestamp_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockTimestamp_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
    blockTimestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
    transactionHash?: InputMaybe<Scalars["Bytes"]["input"]>;
    transactionHash_not?: InputMaybe<Scalars["Bytes"]["input"]>;
    transactionHash_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
    transactionHash_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
    transactionHash_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
    transactionHash_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
    transactionHash_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
    transactionHash_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
    transactionHash_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
    transactionHash_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
    /** Filter for the block changed event. */
    _change_block?: InputMaybe<BlockChangedFilter>;
    and?: InputMaybe<Array<InputMaybe<PortfolioUpdate_filter>>>;
    or?: InputMaybe<Array<InputMaybe<PortfolioUpdate_filter>>>;
  };

  export type PortfolioUpdate_orderBy =
    | "id"
    | "newPortfolioValue"
    | "newSharePrice"
    | "timestamp"
    | "blockNumber"
    | "blockTimestamp"
    | "transactionHash";

  export type Query = {
    deposit?: Maybe<Deposit>;
    deposits: Array<Deposit>;
    redemption?: Maybe<Redemption>;
    redemptions: Array<Redemption>;
    shareholder?: Maybe<Shareholder>;
    shareholders: Array<Shareholder>;
    whitelistAddressRemoval?: Maybe<WhitelistAddressRemoval>;
    whitelistAddressRemovals: Array<WhitelistAddressRemoval>;
    whitelistAddressAddition?: Maybe<WhitelistAddressAddition>;
    whitelistAddressAdditions: Array<WhitelistAddressAddition>;
    investment?: Maybe<Investment>;
    investments: Array<Investment>;
    ownershipTransfer?: Maybe<OwnershipTransfer>;
    ownershipTransfers: Array<OwnershipTransfer>;
    portfolioUpdate?: Maybe<PortfolioUpdate>;
    portfolioUpdates: Array<PortfolioUpdate>;
    redemptionsPause?: Maybe<RedemptionsPause>;
    redemptionsPauses: Array<RedemptionsPause>;
    redemptionsResume?: Maybe<RedemptionsResume>;
    redemptionsResumes: Array<RedemptionsResume>;
    approval?: Maybe<Approval>;
    approvals: Array<Approval>;
    shareTokenOwnershipTransfer?: Maybe<ShareTokenOwnershipTransfer>;
    shareTokenOwnershipTransfers: Array<ShareTokenOwnershipTransfer>;
    pause?: Maybe<Pause>;
    pauses: Array<Pause>;
    transfer?: Maybe<Transfer>;
    transfers: Array<Transfer>;
    unpause?: Maybe<Unpause>;
    unpauses: Array<Unpause>;
    approvalForAll?: Maybe<ApprovalForAll>;
    approvalForAlls: Array<ApprovalForAll>;
    tokenMinted?: Maybe<TokenMinted>;
    tokenMinteds: Array<TokenMinted>;
    tokenValidityChanged?: Maybe<TokenValidityChanged>;
    tokenValidityChangeds: Array<TokenValidityChanged>;
    managementFeeCollected?: Maybe<ManagementFeeCollected>;
    managementFeeCollecteds: Array<ManagementFeeCollected>;
    managementFeeRecipientUpdated?: Maybe<ManagementFeeRecipientUpdated>;
    managementFeeRecipientUpdateds: Array<ManagementFeeRecipientUpdated>;
    managementFeeUpdated?: Maybe<ManagementFeeUpdated>;
    managementFeeUpdateds: Array<ManagementFeeUpdated>;
    membershipBadgeUpdated?: Maybe<MembershipBadgeUpdated>;
    membershipBadgeUpdateds: Array<MembershipBadgeUpdated>;
    /** Access to subgraph metadata */
    _meta?: Maybe<_Meta_>;
  };

  export type QuerydepositArgs = {
    id: Scalars["ID"]["input"];
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
  };

  export type QuerydepositsArgs = {
    skip?: InputMaybe<Scalars["Int"]["input"]>;
    first?: InputMaybe<Scalars["Int"]["input"]>;
    orderBy?: InputMaybe<Deposit_orderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    where?: InputMaybe<Deposit_filter>;
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
  };

  export type QueryredemptionArgs = {
    id: Scalars["ID"]["input"];
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
  };

  export type QueryredemptionsArgs = {
    skip?: InputMaybe<Scalars["Int"]["input"]>;
    first?: InputMaybe<Scalars["Int"]["input"]>;
    orderBy?: InputMaybe<Redemption_orderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    where?: InputMaybe<Redemption_filter>;
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
  };

  export type QueryshareholderArgs = {
    id: Scalars["ID"]["input"];
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
  };

  export type QueryshareholdersArgs = {
    skip?: InputMaybe<Scalars["Int"]["input"]>;
    first?: InputMaybe<Scalars["Int"]["input"]>;
    orderBy?: InputMaybe<Shareholder_orderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    where?: InputMaybe<Shareholder_filter>;
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
  };

  export type QuerywhitelistAddressRemovalArgs = {
    id: Scalars["ID"]["input"];
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
  };

  export type QuerywhitelistAddressRemovalsArgs = {
    skip?: InputMaybe<Scalars["Int"]["input"]>;
    first?: InputMaybe<Scalars["Int"]["input"]>;
    orderBy?: InputMaybe<WhitelistAddressRemoval_orderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    where?: InputMaybe<WhitelistAddressRemoval_filter>;
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
  };

  export type QuerywhitelistAddressAdditionArgs = {
    id: Scalars["ID"]["input"];
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
  };

  export type QuerywhitelistAddressAdditionsArgs = {
    skip?: InputMaybe<Scalars["Int"]["input"]>;
    first?: InputMaybe<Scalars["Int"]["input"]>;
    orderBy?: InputMaybe<WhitelistAddressAddition_orderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    where?: InputMaybe<WhitelistAddressAddition_filter>;
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
  };

  export type QueryinvestmentArgs = {
    id: Scalars["ID"]["input"];
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
  };

  export type QueryinvestmentsArgs = {
    skip?: InputMaybe<Scalars["Int"]["input"]>;
    first?: InputMaybe<Scalars["Int"]["input"]>;
    orderBy?: InputMaybe<Investment_orderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    where?: InputMaybe<Investment_filter>;
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
  };

  export type QueryownershipTransferArgs = {
    id: Scalars["ID"]["input"];
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
  };

  export type QueryownershipTransfersArgs = {
    skip?: InputMaybe<Scalars["Int"]["input"]>;
    first?: InputMaybe<Scalars["Int"]["input"]>;
    orderBy?: InputMaybe<OwnershipTransfer_orderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    where?: InputMaybe<OwnershipTransfer_filter>;
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
  };

  export type QueryportfolioUpdateArgs = {
    id: Scalars["ID"]["input"];
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
  };

  export type QueryportfolioUpdatesArgs = {
    skip?: InputMaybe<Scalars["Int"]["input"]>;
    first?: InputMaybe<Scalars["Int"]["input"]>;
    orderBy?: InputMaybe<PortfolioUpdate_orderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    where?: InputMaybe<PortfolioUpdate_filter>;
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
  };

  export type QueryredemptionsPauseArgs = {
    id: Scalars["ID"]["input"];
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
  };

  export type QueryredemptionsPausesArgs = {
    skip?: InputMaybe<Scalars["Int"]["input"]>;
    first?: InputMaybe<Scalars["Int"]["input"]>;
    orderBy?: InputMaybe<RedemptionsPause_orderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    where?: InputMaybe<RedemptionsPause_filter>;
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
  };

  export type QueryredemptionsResumeArgs = {
    id: Scalars["ID"]["input"];
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
  };

  export type QueryredemptionsResumesArgs = {
    skip?: InputMaybe<Scalars["Int"]["input"]>;
    first?: InputMaybe<Scalars["Int"]["input"]>;
    orderBy?: InputMaybe<RedemptionsResume_orderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    where?: InputMaybe<RedemptionsResume_filter>;
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
  };

  export type QueryapprovalArgs = {
    id: Scalars["ID"]["input"];
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
  };

  export type QueryapprovalsArgs = {
    skip?: InputMaybe<Scalars["Int"]["input"]>;
    first?: InputMaybe<Scalars["Int"]["input"]>;
    orderBy?: InputMaybe<Approval_orderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    where?: InputMaybe<Approval_filter>;
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
  };

  export type QueryshareTokenOwnershipTransferArgs = {
    id: Scalars["ID"]["input"];
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
  };

  export type QueryshareTokenOwnershipTransfersArgs = {
    skip?: InputMaybe<Scalars["Int"]["input"]>;
    first?: InputMaybe<Scalars["Int"]["input"]>;
    orderBy?: InputMaybe<ShareTokenOwnershipTransfer_orderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    where?: InputMaybe<ShareTokenOwnershipTransfer_filter>;
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
  };

  export type QuerypauseArgs = {
    id: Scalars["ID"]["input"];
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
  };

  export type QuerypausesArgs = {
    skip?: InputMaybe<Scalars["Int"]["input"]>;
    first?: InputMaybe<Scalars["Int"]["input"]>;
    orderBy?: InputMaybe<Pause_orderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    where?: InputMaybe<Pause_filter>;
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
  };

  export type QuerytransferArgs = {
    id: Scalars["ID"]["input"];
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
  };

  export type QuerytransfersArgs = {
    skip?: InputMaybe<Scalars["Int"]["input"]>;
    first?: InputMaybe<Scalars["Int"]["input"]>;
    orderBy?: InputMaybe<Transfer_orderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    where?: InputMaybe<Transfer_filter>;
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
  };

  export type QueryunpauseArgs = {
    id: Scalars["ID"]["input"];
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
  };

  export type QueryunpausesArgs = {
    skip?: InputMaybe<Scalars["Int"]["input"]>;
    first?: InputMaybe<Scalars["Int"]["input"]>;
    orderBy?: InputMaybe<Unpause_orderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    where?: InputMaybe<Unpause_filter>;
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
  };

  export type QueryapprovalForAllArgs = {
    id: Scalars["ID"]["input"];
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
  };

  export type QueryapprovalForAllsArgs = {
    skip?: InputMaybe<Scalars["Int"]["input"]>;
    first?: InputMaybe<Scalars["Int"]["input"]>;
    orderBy?: InputMaybe<ApprovalForAll_orderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    where?: InputMaybe<ApprovalForAll_filter>;
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
  };

  export type QuerytokenMintedArgs = {
    id: Scalars["ID"]["input"];
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
  };

  export type QuerytokenMintedsArgs = {
    skip?: InputMaybe<Scalars["Int"]["input"]>;
    first?: InputMaybe<Scalars["Int"]["input"]>;
    orderBy?: InputMaybe<TokenMinted_orderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    where?: InputMaybe<TokenMinted_filter>;
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
  };

  export type QuerytokenValidityChangedArgs = {
    id: Scalars["ID"]["input"];
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
  };

  export type QuerytokenValidityChangedsArgs = {
    skip?: InputMaybe<Scalars["Int"]["input"]>;
    first?: InputMaybe<Scalars["Int"]["input"]>;
    orderBy?: InputMaybe<TokenValidityChanged_orderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    where?: InputMaybe<TokenValidityChanged_filter>;
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
  };

  export type QuerymanagementFeeCollectedArgs = {
    id: Scalars["ID"]["input"];
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
  };

  export type QuerymanagementFeeCollectedsArgs = {
    skip?: InputMaybe<Scalars["Int"]["input"]>;
    first?: InputMaybe<Scalars["Int"]["input"]>;
    orderBy?: InputMaybe<ManagementFeeCollected_orderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    where?: InputMaybe<ManagementFeeCollected_filter>;
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
  };

  export type QuerymanagementFeeRecipientUpdatedArgs = {
    id: Scalars["ID"]["input"];
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
  };

  export type QuerymanagementFeeRecipientUpdatedsArgs = {
    skip?: InputMaybe<Scalars["Int"]["input"]>;
    first?: InputMaybe<Scalars["Int"]["input"]>;
    orderBy?: InputMaybe<ManagementFeeRecipientUpdated_orderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    where?: InputMaybe<ManagementFeeRecipientUpdated_filter>;
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
  };

  export type QuerymanagementFeeUpdatedArgs = {
    id: Scalars["ID"]["input"];
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
  };

  export type QuerymanagementFeeUpdatedsArgs = {
    skip?: InputMaybe<Scalars["Int"]["input"]>;
    first?: InputMaybe<Scalars["Int"]["input"]>;
    orderBy?: InputMaybe<ManagementFeeUpdated_orderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    where?: InputMaybe<ManagementFeeUpdated_filter>;
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
  };

  export type QuerymembershipBadgeUpdatedArgs = {
    id: Scalars["ID"]["input"];
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
  };

  export type QuerymembershipBadgeUpdatedsArgs = {
    skip?: InputMaybe<Scalars["Int"]["input"]>;
    first?: InputMaybe<Scalars["Int"]["input"]>;
    orderBy?: InputMaybe<MembershipBadgeUpdated_orderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    where?: InputMaybe<MembershipBadgeUpdated_filter>;
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
  };

  export type Query_metaArgs = {
    block?: InputMaybe<Block_height>;
  };

  export type Redemption = {
    id: Scalars["Bytes"]["output"];
    user: Scalars["Bytes"]["output"];
    shareTokensRedeemed: Scalars["BigInt"]["output"];
    depositAmount: Scalars["BigInt"]["output"];
    blockNumber: Scalars["BigInt"]["output"];
    blockTimestamp: Scalars["BigInt"]["output"];
    transactionHash: Scalars["Bytes"]["output"];
    shareholder: Shareholder;
  };

  export type Redemption_filter = {
    id?: InputMaybe<Scalars["Bytes"]["input"]>;
    id_not?: InputMaybe<Scalars["Bytes"]["input"]>;
    id_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
    id_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
    id_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
    id_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
    id_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
    id_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
    id_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
    id_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
    user?: InputMaybe<Scalars["Bytes"]["input"]>;
    user_not?: InputMaybe<Scalars["Bytes"]["input"]>;
    user_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
    user_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
    user_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
    user_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
    user_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
    user_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
    user_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
    user_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
    shareTokensRedeemed?: InputMaybe<Scalars["BigInt"]["input"]>;
    shareTokensRedeemed_not?: InputMaybe<Scalars["BigInt"]["input"]>;
    shareTokensRedeemed_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
    shareTokensRedeemed_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
    shareTokensRedeemed_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
    shareTokensRedeemed_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
    shareTokensRedeemed_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
    shareTokensRedeemed_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
    depositAmount?: InputMaybe<Scalars["BigInt"]["input"]>;
    depositAmount_not?: InputMaybe<Scalars["BigInt"]["input"]>;
    depositAmount_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
    depositAmount_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
    depositAmount_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
    depositAmount_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
    depositAmount_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
    depositAmount_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
    blockNumber?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockNumber_not?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockNumber_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockNumber_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockNumber_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockNumber_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockNumber_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
    blockNumber_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
    blockTimestamp?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockTimestamp_not?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockTimestamp_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockTimestamp_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockTimestamp_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockTimestamp_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockTimestamp_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
    blockTimestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
    transactionHash?: InputMaybe<Scalars["Bytes"]["input"]>;
    transactionHash_not?: InputMaybe<Scalars["Bytes"]["input"]>;
    transactionHash_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
    transactionHash_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
    transactionHash_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
    transactionHash_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
    transactionHash_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
    transactionHash_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
    transactionHash_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
    transactionHash_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
    shareholder?: InputMaybe<Scalars["String"]["input"]>;
    shareholder_not?: InputMaybe<Scalars["String"]["input"]>;
    shareholder_gt?: InputMaybe<Scalars["String"]["input"]>;
    shareholder_lt?: InputMaybe<Scalars["String"]["input"]>;
    shareholder_gte?: InputMaybe<Scalars["String"]["input"]>;
    shareholder_lte?: InputMaybe<Scalars["String"]["input"]>;
    shareholder_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
    shareholder_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
    shareholder_contains?: InputMaybe<Scalars["String"]["input"]>;
    shareholder_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
    shareholder_not_contains?: InputMaybe<Scalars["String"]["input"]>;
    shareholder_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
    shareholder_starts_with?: InputMaybe<Scalars["String"]["input"]>;
    shareholder_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
    shareholder_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
    shareholder_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
    shareholder_ends_with?: InputMaybe<Scalars["String"]["input"]>;
    shareholder_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
    shareholder_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
    shareholder_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
    shareholder_?: InputMaybe<Shareholder_filter>;
    /** Filter for the block changed event. */
    _change_block?: InputMaybe<BlockChangedFilter>;
    and?: InputMaybe<Array<InputMaybe<Redemption_filter>>>;
    or?: InputMaybe<Array<InputMaybe<Redemption_filter>>>;
  };

  export type Redemption_orderBy =
    | "id"
    | "user"
    | "shareTokensRedeemed"
    | "depositAmount"
    | "blockNumber"
    | "blockTimestamp"
    | "transactionHash"
    | "shareholder"
    | "shareholder__id"
    | "shareholder__account"
    | "shareholder__shares"
    | "shareholder__lastUpdated";

  export type RedemptionsPause = {
    id: Scalars["Bytes"]["output"];
    blockNumber: Scalars["BigInt"]["output"];
    blockTimestamp: Scalars["BigInt"]["output"];
    transactionHash: Scalars["Bytes"]["output"];
  };

  export type RedemptionsPause_filter = {
    id?: InputMaybe<Scalars["Bytes"]["input"]>;
    id_not?: InputMaybe<Scalars["Bytes"]["input"]>;
    id_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
    id_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
    id_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
    id_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
    id_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
    id_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
    id_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
    id_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
    blockNumber?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockNumber_not?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockNumber_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockNumber_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockNumber_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockNumber_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockNumber_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
    blockNumber_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
    blockTimestamp?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockTimestamp_not?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockTimestamp_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockTimestamp_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockTimestamp_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockTimestamp_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockTimestamp_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
    blockTimestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
    transactionHash?: InputMaybe<Scalars["Bytes"]["input"]>;
    transactionHash_not?: InputMaybe<Scalars["Bytes"]["input"]>;
    transactionHash_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
    transactionHash_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
    transactionHash_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
    transactionHash_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
    transactionHash_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
    transactionHash_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
    transactionHash_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
    transactionHash_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
    /** Filter for the block changed event. */
    _change_block?: InputMaybe<BlockChangedFilter>;
    and?: InputMaybe<Array<InputMaybe<RedemptionsPause_filter>>>;
    or?: InputMaybe<Array<InputMaybe<RedemptionsPause_filter>>>;
  };

  export type RedemptionsPause_orderBy = "id" | "blockNumber" | "blockTimestamp" | "transactionHash";

  export type RedemptionsResume = {
    id: Scalars["Bytes"]["output"];
    blockNumber: Scalars["BigInt"]["output"];
    blockTimestamp: Scalars["BigInt"]["output"];
    transactionHash: Scalars["Bytes"]["output"];
  };

  export type RedemptionsResume_filter = {
    id?: InputMaybe<Scalars["Bytes"]["input"]>;
    id_not?: InputMaybe<Scalars["Bytes"]["input"]>;
    id_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
    id_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
    id_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
    id_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
    id_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
    id_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
    id_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
    id_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
    blockNumber?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockNumber_not?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockNumber_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockNumber_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockNumber_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockNumber_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockNumber_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
    blockNumber_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
    blockTimestamp?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockTimestamp_not?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockTimestamp_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockTimestamp_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockTimestamp_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockTimestamp_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockTimestamp_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
    blockTimestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
    transactionHash?: InputMaybe<Scalars["Bytes"]["input"]>;
    transactionHash_not?: InputMaybe<Scalars["Bytes"]["input"]>;
    transactionHash_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
    transactionHash_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
    transactionHash_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
    transactionHash_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
    transactionHash_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
    transactionHash_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
    transactionHash_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
    transactionHash_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
    /** Filter for the block changed event. */
    _change_block?: InputMaybe<BlockChangedFilter>;
    and?: InputMaybe<Array<InputMaybe<RedemptionsResume_filter>>>;
    or?: InputMaybe<Array<InputMaybe<RedemptionsResume_filter>>>;
  };

  export type RedemptionsResume_orderBy = "id" | "blockNumber" | "blockTimestamp" | "transactionHash";

  export type ShareTokenOwnershipTransfer = {
    id: Scalars["Bytes"]["output"];
    previousOwner: Scalars["Bytes"]["output"];
    newOwner: Scalars["Bytes"]["output"];
    blockNumber: Scalars["BigInt"]["output"];
    blockTimestamp: Scalars["BigInt"]["output"];
    transactionHash: Scalars["Bytes"]["output"];
  };

  export type ShareTokenOwnershipTransfer_filter = {
    id?: InputMaybe<Scalars["Bytes"]["input"]>;
    id_not?: InputMaybe<Scalars["Bytes"]["input"]>;
    id_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
    id_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
    id_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
    id_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
    id_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
    id_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
    id_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
    id_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
    previousOwner?: InputMaybe<Scalars["Bytes"]["input"]>;
    previousOwner_not?: InputMaybe<Scalars["Bytes"]["input"]>;
    previousOwner_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
    previousOwner_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
    previousOwner_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
    previousOwner_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
    previousOwner_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
    previousOwner_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
    previousOwner_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
    previousOwner_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
    newOwner?: InputMaybe<Scalars["Bytes"]["input"]>;
    newOwner_not?: InputMaybe<Scalars["Bytes"]["input"]>;
    newOwner_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
    newOwner_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
    newOwner_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
    newOwner_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
    newOwner_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
    newOwner_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
    newOwner_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
    newOwner_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
    blockNumber?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockNumber_not?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockNumber_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockNumber_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockNumber_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockNumber_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockNumber_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
    blockNumber_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
    blockTimestamp?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockTimestamp_not?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockTimestamp_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockTimestamp_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockTimestamp_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockTimestamp_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockTimestamp_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
    blockTimestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
    transactionHash?: InputMaybe<Scalars["Bytes"]["input"]>;
    transactionHash_not?: InputMaybe<Scalars["Bytes"]["input"]>;
    transactionHash_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
    transactionHash_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
    transactionHash_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
    transactionHash_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
    transactionHash_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
    transactionHash_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
    transactionHash_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
    transactionHash_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
    /** Filter for the block changed event. */
    _change_block?: InputMaybe<BlockChangedFilter>;
    and?: InputMaybe<Array<InputMaybe<ShareTokenOwnershipTransfer_filter>>>;
    or?: InputMaybe<Array<InputMaybe<ShareTokenOwnershipTransfer_filter>>>;
  };

  export type ShareTokenOwnershipTransfer_orderBy =
    | "id"
    | "previousOwner"
    | "newOwner"
    | "blockNumber"
    | "blockTimestamp"
    | "transactionHash";

  export type Shareholder = {
    id: Scalars["Bytes"]["output"];
    account: Scalars["Bytes"]["output"];
    shares: Scalars["BigInt"]["output"];
    lastUpdated: Scalars["BigInt"]["output"];
    deposits: Array<Deposit>;
    redemptions: Array<Redemption>;
  };

  export type ShareholderdepositsArgs = {
    skip?: InputMaybe<Scalars["Int"]["input"]>;
    first?: InputMaybe<Scalars["Int"]["input"]>;
    orderBy?: InputMaybe<Deposit_orderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    where?: InputMaybe<Deposit_filter>;
  };

  export type ShareholderredemptionsArgs = {
    skip?: InputMaybe<Scalars["Int"]["input"]>;
    first?: InputMaybe<Scalars["Int"]["input"]>;
    orderBy?: InputMaybe<Redemption_orderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    where?: InputMaybe<Redemption_filter>;
  };

  export type Shareholder_filter = {
    id?: InputMaybe<Scalars["Bytes"]["input"]>;
    id_not?: InputMaybe<Scalars["Bytes"]["input"]>;
    id_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
    id_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
    id_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
    id_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
    id_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
    id_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
    id_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
    id_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
    account?: InputMaybe<Scalars["Bytes"]["input"]>;
    account_not?: InputMaybe<Scalars["Bytes"]["input"]>;
    account_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
    account_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
    account_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
    account_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
    account_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
    account_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
    account_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
    account_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
    shares?: InputMaybe<Scalars["BigInt"]["input"]>;
    shares_not?: InputMaybe<Scalars["BigInt"]["input"]>;
    shares_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
    shares_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
    shares_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
    shares_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
    shares_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
    shares_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
    lastUpdated?: InputMaybe<Scalars["BigInt"]["input"]>;
    lastUpdated_not?: InputMaybe<Scalars["BigInt"]["input"]>;
    lastUpdated_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
    lastUpdated_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
    lastUpdated_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
    lastUpdated_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
    lastUpdated_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
    lastUpdated_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
    deposits_?: InputMaybe<Deposit_filter>;
    redemptions_?: InputMaybe<Redemption_filter>;
    /** Filter for the block changed event. */
    _change_block?: InputMaybe<BlockChangedFilter>;
    and?: InputMaybe<Array<InputMaybe<Shareholder_filter>>>;
    or?: InputMaybe<Array<InputMaybe<Shareholder_filter>>>;
  };

  export type Shareholder_orderBy = "id" | "account" | "shares" | "lastUpdated" | "deposits" | "redemptions";

  export type TokenMinted = {
    id: Scalars["Bytes"]["output"];
    to: Scalars["Bytes"]["output"];
    tokenId: Scalars["BigInt"]["output"];
    blockNumber: Scalars["BigInt"]["output"];
    blockTimestamp: Scalars["BigInt"]["output"];
    transactionHash: Scalars["Bytes"]["output"];
  };

  export type TokenMinted_filter = {
    id?: InputMaybe<Scalars["Bytes"]["input"]>;
    id_not?: InputMaybe<Scalars["Bytes"]["input"]>;
    id_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
    id_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
    id_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
    id_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
    id_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
    id_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
    id_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
    id_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
    to?: InputMaybe<Scalars["Bytes"]["input"]>;
    to_not?: InputMaybe<Scalars["Bytes"]["input"]>;
    to_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
    to_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
    to_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
    to_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
    to_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
    to_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
    to_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
    to_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
    tokenId?: InputMaybe<Scalars["BigInt"]["input"]>;
    tokenId_not?: InputMaybe<Scalars["BigInt"]["input"]>;
    tokenId_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
    tokenId_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
    tokenId_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
    tokenId_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
    tokenId_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
    tokenId_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
    blockNumber?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockNumber_not?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockNumber_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockNumber_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockNumber_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockNumber_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockNumber_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
    blockNumber_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
    blockTimestamp?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockTimestamp_not?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockTimestamp_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockTimestamp_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockTimestamp_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockTimestamp_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockTimestamp_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
    blockTimestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
    transactionHash?: InputMaybe<Scalars["Bytes"]["input"]>;
    transactionHash_not?: InputMaybe<Scalars["Bytes"]["input"]>;
    transactionHash_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
    transactionHash_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
    transactionHash_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
    transactionHash_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
    transactionHash_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
    transactionHash_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
    transactionHash_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
    transactionHash_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
    /** Filter for the block changed event. */
    _change_block?: InputMaybe<BlockChangedFilter>;
    and?: InputMaybe<Array<InputMaybe<TokenMinted_filter>>>;
    or?: InputMaybe<Array<InputMaybe<TokenMinted_filter>>>;
  };

  export type TokenMinted_orderBy = "id" | "to" | "tokenId" | "blockNumber" | "blockTimestamp" | "transactionHash";

  export type TokenValidityChanged = {
    id: Scalars["Bytes"]["output"];
    tokenOwner: Scalars["Bytes"]["output"];
    tokenId: Scalars["BigInt"]["output"];
    isValid: Scalars["Boolean"]["output"];
    blockNumber: Scalars["BigInt"]["output"];
    blockTimestamp: Scalars["BigInt"]["output"];
    transactionHash: Scalars["Bytes"]["output"];
  };

  export type TokenValidityChanged_filter = {
    id?: InputMaybe<Scalars["Bytes"]["input"]>;
    id_not?: InputMaybe<Scalars["Bytes"]["input"]>;
    id_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
    id_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
    id_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
    id_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
    id_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
    id_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
    id_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
    id_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
    tokenOwner?: InputMaybe<Scalars["Bytes"]["input"]>;
    tokenOwner_not?: InputMaybe<Scalars["Bytes"]["input"]>;
    tokenOwner_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
    tokenOwner_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
    tokenOwner_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
    tokenOwner_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
    tokenOwner_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
    tokenOwner_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
    tokenOwner_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
    tokenOwner_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
    tokenId?: InputMaybe<Scalars["BigInt"]["input"]>;
    tokenId_not?: InputMaybe<Scalars["BigInt"]["input"]>;
    tokenId_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
    tokenId_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
    tokenId_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
    tokenId_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
    tokenId_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
    tokenId_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
    isValid?: InputMaybe<Scalars["Boolean"]["input"]>;
    isValid_not?: InputMaybe<Scalars["Boolean"]["input"]>;
    isValid_in?: InputMaybe<Array<Scalars["Boolean"]["input"]>>;
    isValid_not_in?: InputMaybe<Array<Scalars["Boolean"]["input"]>>;
    blockNumber?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockNumber_not?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockNumber_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockNumber_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockNumber_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockNumber_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockNumber_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
    blockNumber_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
    blockTimestamp?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockTimestamp_not?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockTimestamp_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockTimestamp_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockTimestamp_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockTimestamp_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockTimestamp_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
    blockTimestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
    transactionHash?: InputMaybe<Scalars["Bytes"]["input"]>;
    transactionHash_not?: InputMaybe<Scalars["Bytes"]["input"]>;
    transactionHash_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
    transactionHash_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
    transactionHash_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
    transactionHash_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
    transactionHash_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
    transactionHash_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
    transactionHash_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
    transactionHash_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
    /** Filter for the block changed event. */
    _change_block?: InputMaybe<BlockChangedFilter>;
    and?: InputMaybe<Array<InputMaybe<TokenValidityChanged_filter>>>;
    or?: InputMaybe<Array<InputMaybe<TokenValidityChanged_filter>>>;
  };

  export type TokenValidityChanged_orderBy =
    | "id"
    | "tokenOwner"
    | "tokenId"
    | "isValid"
    | "blockNumber"
    | "blockTimestamp"
    | "transactionHash";

  export type Transfer = {
    id: Scalars["Bytes"]["output"];
    from: Scalars["Bytes"]["output"];
    to: Scalars["Bytes"]["output"];
    value: Scalars["BigInt"]["output"];
    blockNumber: Scalars["BigInt"]["output"];
    blockTimestamp: Scalars["BigInt"]["output"];
    transactionHash: Scalars["Bytes"]["output"];
  };

  export type Transfer_filter = {
    id?: InputMaybe<Scalars["Bytes"]["input"]>;
    id_not?: InputMaybe<Scalars["Bytes"]["input"]>;
    id_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
    id_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
    id_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
    id_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
    id_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
    id_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
    id_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
    id_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
    from?: InputMaybe<Scalars["Bytes"]["input"]>;
    from_not?: InputMaybe<Scalars["Bytes"]["input"]>;
    from_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
    from_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
    from_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
    from_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
    from_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
    from_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
    from_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
    from_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
    to?: InputMaybe<Scalars["Bytes"]["input"]>;
    to_not?: InputMaybe<Scalars["Bytes"]["input"]>;
    to_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
    to_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
    to_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
    to_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
    to_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
    to_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
    to_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
    to_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
    value?: InputMaybe<Scalars["BigInt"]["input"]>;
    value_not?: InputMaybe<Scalars["BigInt"]["input"]>;
    value_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
    value_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
    value_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
    value_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
    value_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
    value_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
    blockNumber?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockNumber_not?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockNumber_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockNumber_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockNumber_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockNumber_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockNumber_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
    blockNumber_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
    blockTimestamp?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockTimestamp_not?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockTimestamp_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockTimestamp_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockTimestamp_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockTimestamp_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockTimestamp_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
    blockTimestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
    transactionHash?: InputMaybe<Scalars["Bytes"]["input"]>;
    transactionHash_not?: InputMaybe<Scalars["Bytes"]["input"]>;
    transactionHash_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
    transactionHash_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
    transactionHash_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
    transactionHash_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
    transactionHash_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
    transactionHash_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
    transactionHash_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
    transactionHash_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
    /** Filter for the block changed event. */
    _change_block?: InputMaybe<BlockChangedFilter>;
    and?: InputMaybe<Array<InputMaybe<Transfer_filter>>>;
    or?: InputMaybe<Array<InputMaybe<Transfer_filter>>>;
  };

  export type Transfer_orderBy = "id" | "from" | "to" | "value" | "blockNumber" | "blockTimestamp" | "transactionHash";

  export type Unpause = {
    id: Scalars["Bytes"]["output"];
    account: Scalars["Bytes"]["output"];
    blockNumber: Scalars["BigInt"]["output"];
    blockTimestamp: Scalars["BigInt"]["output"];
    transactionHash: Scalars["Bytes"]["output"];
  };

  export type Unpause_filter = {
    id?: InputMaybe<Scalars["Bytes"]["input"]>;
    id_not?: InputMaybe<Scalars["Bytes"]["input"]>;
    id_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
    id_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
    id_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
    id_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
    id_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
    id_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
    id_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
    id_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
    account?: InputMaybe<Scalars["Bytes"]["input"]>;
    account_not?: InputMaybe<Scalars["Bytes"]["input"]>;
    account_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
    account_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
    account_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
    account_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
    account_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
    account_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
    account_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
    account_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
    blockNumber?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockNumber_not?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockNumber_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockNumber_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockNumber_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockNumber_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockNumber_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
    blockNumber_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
    blockTimestamp?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockTimestamp_not?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockTimestamp_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockTimestamp_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockTimestamp_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockTimestamp_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockTimestamp_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
    blockTimestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
    transactionHash?: InputMaybe<Scalars["Bytes"]["input"]>;
    transactionHash_not?: InputMaybe<Scalars["Bytes"]["input"]>;
    transactionHash_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
    transactionHash_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
    transactionHash_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
    transactionHash_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
    transactionHash_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
    transactionHash_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
    transactionHash_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
    transactionHash_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
    /** Filter for the block changed event. */
    _change_block?: InputMaybe<BlockChangedFilter>;
    and?: InputMaybe<Array<InputMaybe<Unpause_filter>>>;
    or?: InputMaybe<Array<InputMaybe<Unpause_filter>>>;
  };

  export type Unpause_orderBy = "id" | "account" | "blockNumber" | "blockTimestamp" | "transactionHash";

  export type WhitelistAddressAddition = {
    id: Scalars["Bytes"]["output"];
    addr: Scalars["Bytes"]["output"];
    blockNumber: Scalars["BigInt"]["output"];
    blockTimestamp: Scalars["BigInt"]["output"];
    transactionHash: Scalars["Bytes"]["output"];
  };

  export type WhitelistAddressAddition_filter = {
    id?: InputMaybe<Scalars["Bytes"]["input"]>;
    id_not?: InputMaybe<Scalars["Bytes"]["input"]>;
    id_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
    id_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
    id_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
    id_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
    id_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
    id_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
    id_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
    id_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
    addr?: InputMaybe<Scalars["Bytes"]["input"]>;
    addr_not?: InputMaybe<Scalars["Bytes"]["input"]>;
    addr_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
    addr_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
    addr_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
    addr_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
    addr_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
    addr_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
    addr_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
    addr_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
    blockNumber?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockNumber_not?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockNumber_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockNumber_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockNumber_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockNumber_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockNumber_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
    blockNumber_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
    blockTimestamp?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockTimestamp_not?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockTimestamp_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockTimestamp_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockTimestamp_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockTimestamp_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockTimestamp_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
    blockTimestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
    transactionHash?: InputMaybe<Scalars["Bytes"]["input"]>;
    transactionHash_not?: InputMaybe<Scalars["Bytes"]["input"]>;
    transactionHash_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
    transactionHash_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
    transactionHash_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
    transactionHash_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
    transactionHash_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
    transactionHash_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
    transactionHash_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
    transactionHash_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
    /** Filter for the block changed event. */
    _change_block?: InputMaybe<BlockChangedFilter>;
    and?: InputMaybe<Array<InputMaybe<WhitelistAddressAddition_filter>>>;
    or?: InputMaybe<Array<InputMaybe<WhitelistAddressAddition_filter>>>;
  };

  export type WhitelistAddressAddition_orderBy = "id" | "addr" | "blockNumber" | "blockTimestamp" | "transactionHash";

  export type WhitelistAddressRemoval = {
    id: Scalars["Bytes"]["output"];
    addr: Scalars["Bytes"]["output"];
    blockNumber: Scalars["BigInt"]["output"];
    blockTimestamp: Scalars["BigInt"]["output"];
    transactionHash: Scalars["Bytes"]["output"];
  };

  export type WhitelistAddressRemoval_filter = {
    id?: InputMaybe<Scalars["Bytes"]["input"]>;
    id_not?: InputMaybe<Scalars["Bytes"]["input"]>;
    id_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
    id_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
    id_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
    id_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
    id_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
    id_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
    id_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
    id_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
    addr?: InputMaybe<Scalars["Bytes"]["input"]>;
    addr_not?: InputMaybe<Scalars["Bytes"]["input"]>;
    addr_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
    addr_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
    addr_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
    addr_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
    addr_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
    addr_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
    addr_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
    addr_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
    blockNumber?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockNumber_not?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockNumber_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockNumber_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockNumber_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockNumber_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockNumber_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
    blockNumber_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
    blockTimestamp?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockTimestamp_not?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockTimestamp_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockTimestamp_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockTimestamp_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockTimestamp_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
    blockTimestamp_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
    blockTimestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
    transactionHash?: InputMaybe<Scalars["Bytes"]["input"]>;
    transactionHash_not?: InputMaybe<Scalars["Bytes"]["input"]>;
    transactionHash_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
    transactionHash_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
    transactionHash_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
    transactionHash_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
    transactionHash_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
    transactionHash_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
    transactionHash_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
    transactionHash_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
    /** Filter for the block changed event. */
    _change_block?: InputMaybe<BlockChangedFilter>;
    and?: InputMaybe<Array<InputMaybe<WhitelistAddressRemoval_filter>>>;
    or?: InputMaybe<Array<InputMaybe<WhitelistAddressRemoval_filter>>>;
  };

  export type WhitelistAddressRemoval_orderBy = "id" | "addr" | "blockNumber" | "blockTimestamp" | "transactionHash";

  export type _Block_ = {
    /** The hash of the block */
    hash?: Maybe<Scalars["Bytes"]["output"]>;
    /** The block number */
    number: Scalars["Int"]["output"];
    /** Integer representation of the timestamp stored in blocks for the chain */
    timestamp?: Maybe<Scalars["Int"]["output"]>;
    /** The hash of the parent block */
    parentHash?: Maybe<Scalars["Bytes"]["output"]>;
  };

  /** The type for the top-level _meta field */
  export type _Meta_ = {
    /**
     * Information about a specific subgraph block. The hash of the block
     * will be null if the _meta field has a block constraint that asks for
     * a block number. It will be filled if the _meta field has no block constraint
     * and therefore asks for the latest  block
     *
     */
    block: _Block_;
    /** The deployment ID */
    deployment: Scalars["String"]["output"];
    /** If `true`, the subgraph encountered indexing errors at some past block */
    hasIndexingErrors: Scalars["Boolean"]["output"];
  };

  export type _SubgraphErrorPolicy_ =
    /** Data will be returned even if the subgraph has indexing errors */
    | "allow"
    /** If the subgraph has indexing errors, data will be omitted. The default. */
    | "deny";

  export type QuerySdk = {
    /** null **/
    deposit: InContextSdkMethod<Query["deposit"], QuerydepositArgs, MeshContext>;
    /** null **/
    deposits: InContextSdkMethod<Query["deposits"], QuerydepositsArgs, MeshContext>;
    /** null **/
    redemption: InContextSdkMethod<Query["redemption"], QueryredemptionArgs, MeshContext>;
    /** null **/
    redemptions: InContextSdkMethod<Query["redemptions"], QueryredemptionsArgs, MeshContext>;
    /** null **/
    shareholder: InContextSdkMethod<Query["shareholder"], QueryshareholderArgs, MeshContext>;
    /** null **/
    shareholders: InContextSdkMethod<Query["shareholders"], QueryshareholdersArgs, MeshContext>;
    /** null **/
    whitelistAddressRemoval: InContextSdkMethod<
      Query["whitelistAddressRemoval"],
      QuerywhitelistAddressRemovalArgs,
      MeshContext
    >;
    /** null **/
    whitelistAddressRemovals: InContextSdkMethod<
      Query["whitelistAddressRemovals"],
      QuerywhitelistAddressRemovalsArgs,
      MeshContext
    >;
    /** null **/
    whitelistAddressAddition: InContextSdkMethod<
      Query["whitelistAddressAddition"],
      QuerywhitelistAddressAdditionArgs,
      MeshContext
    >;
    /** null **/
    whitelistAddressAdditions: InContextSdkMethod<
      Query["whitelistAddressAdditions"],
      QuerywhitelistAddressAdditionsArgs,
      MeshContext
    >;
    /** null **/
    investment: InContextSdkMethod<Query["investment"], QueryinvestmentArgs, MeshContext>;
    /** null **/
    investments: InContextSdkMethod<Query["investments"], QueryinvestmentsArgs, MeshContext>;
    /** null **/
    ownershipTransfer: InContextSdkMethod<Query["ownershipTransfer"], QueryownershipTransferArgs, MeshContext>;
    /** null **/
    ownershipTransfers: InContextSdkMethod<Query["ownershipTransfers"], QueryownershipTransfersArgs, MeshContext>;
    /** null **/
    portfolioUpdate: InContextSdkMethod<Query["portfolioUpdate"], QueryportfolioUpdateArgs, MeshContext>;
    /** null **/
    portfolioUpdates: InContextSdkMethod<Query["portfolioUpdates"], QueryportfolioUpdatesArgs, MeshContext>;
    /** null **/
    redemptionsPause: InContextSdkMethod<Query["redemptionsPause"], QueryredemptionsPauseArgs, MeshContext>;
    /** null **/
    redemptionsPauses: InContextSdkMethod<Query["redemptionsPauses"], QueryredemptionsPausesArgs, MeshContext>;
    /** null **/
    redemptionsResume: InContextSdkMethod<Query["redemptionsResume"], QueryredemptionsResumeArgs, MeshContext>;
    /** null **/
    redemptionsResumes: InContextSdkMethod<Query["redemptionsResumes"], QueryredemptionsResumesArgs, MeshContext>;
    /** null **/
    approval: InContextSdkMethod<Query["approval"], QueryapprovalArgs, MeshContext>;
    /** null **/
    approvals: InContextSdkMethod<Query["approvals"], QueryapprovalsArgs, MeshContext>;
    /** null **/
    shareTokenOwnershipTransfer: InContextSdkMethod<
      Query["shareTokenOwnershipTransfer"],
      QueryshareTokenOwnershipTransferArgs,
      MeshContext
    >;
    /** null **/
    shareTokenOwnershipTransfers: InContextSdkMethod<
      Query["shareTokenOwnershipTransfers"],
      QueryshareTokenOwnershipTransfersArgs,
      MeshContext
    >;
    /** null **/
    pause: InContextSdkMethod<Query["pause"], QuerypauseArgs, MeshContext>;
    /** null **/
    pauses: InContextSdkMethod<Query["pauses"], QuerypausesArgs, MeshContext>;
    /** null **/
    transfer: InContextSdkMethod<Query["transfer"], QuerytransferArgs, MeshContext>;
    /** null **/
    transfers: InContextSdkMethod<Query["transfers"], QuerytransfersArgs, MeshContext>;
    /** null **/
    unpause: InContextSdkMethod<Query["unpause"], QueryunpauseArgs, MeshContext>;
    /** null **/
    unpauses: InContextSdkMethod<Query["unpauses"], QueryunpausesArgs, MeshContext>;
    /** null **/
    approvalForAll: InContextSdkMethod<Query["approvalForAll"], QueryapprovalForAllArgs, MeshContext>;
    /** null **/
    approvalForAlls: InContextSdkMethod<Query["approvalForAlls"], QueryapprovalForAllsArgs, MeshContext>;
    /** null **/
    tokenMinted: InContextSdkMethod<Query["tokenMinted"], QuerytokenMintedArgs, MeshContext>;
    /** null **/
    tokenMinteds: InContextSdkMethod<Query["tokenMinteds"], QuerytokenMintedsArgs, MeshContext>;
    /** null **/
    tokenValidityChanged: InContextSdkMethod<Query["tokenValidityChanged"], QuerytokenValidityChangedArgs, MeshContext>;
    /** null **/
    tokenValidityChangeds: InContextSdkMethod<
      Query["tokenValidityChangeds"],
      QuerytokenValidityChangedsArgs,
      MeshContext
    >;
    /** null **/
    managementFeeCollected: InContextSdkMethod<
      Query["managementFeeCollected"],
      QuerymanagementFeeCollectedArgs,
      MeshContext
    >;
    /** null **/
    managementFeeCollecteds: InContextSdkMethod<
      Query["managementFeeCollecteds"],
      QuerymanagementFeeCollectedsArgs,
      MeshContext
    >;
    /** null **/
    managementFeeRecipientUpdated: InContextSdkMethod<
      Query["managementFeeRecipientUpdated"],
      QuerymanagementFeeRecipientUpdatedArgs,
      MeshContext
    >;
    /** null **/
    managementFeeRecipientUpdateds: InContextSdkMethod<
      Query["managementFeeRecipientUpdateds"],
      QuerymanagementFeeRecipientUpdatedsArgs,
      MeshContext
    >;
    /** null **/
    managementFeeUpdated: InContextSdkMethod<Query["managementFeeUpdated"], QuerymanagementFeeUpdatedArgs, MeshContext>;
    /** null **/
    managementFeeUpdateds: InContextSdkMethod<
      Query["managementFeeUpdateds"],
      QuerymanagementFeeUpdatedsArgs,
      MeshContext
    >;
    /** null **/
    membershipBadgeUpdated: InContextSdkMethod<
      Query["membershipBadgeUpdated"],
      QuerymembershipBadgeUpdatedArgs,
      MeshContext
    >;
    /** null **/
    membershipBadgeUpdateds: InContextSdkMethod<
      Query["membershipBadgeUpdateds"],
      QuerymembershipBadgeUpdatedsArgs,
      MeshContext
    >;
    /** Access to subgraph metadata **/
    _meta: InContextSdkMethod<Query["_meta"], Query_metaArgs, MeshContext>;
  };

  export type MutationSdk = {};

  export type SubscriptionSdk = {};

  export type Context = {
    ["FundManager"]: { Query: QuerySdk; Mutation: MutationSdk; Subscription: SubscriptionSdk };
  };
}
