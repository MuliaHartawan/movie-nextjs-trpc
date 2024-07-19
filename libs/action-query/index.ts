"use client";

import {
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
} from "react-query";
import { QueryKey } from "react-query/types/core/types";
import { wrapServerAction, wrapServerActionWithParams } from "./server";

export const useActionQuery = <
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
>(
  queryKey: TQueryKey,
  queryFn: () => Promise<TQueryFnData>,
  options?: Omit<
    UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
    "queryKey" | "queryFn"
  >
) => {
  // INTERCEPT AFTER CALLING FUNCTION
  const newClientActionQueryFn = async (): Promise<TQueryFnData> => {
    const response = await wrapServerAction(queryFn);

    if (response.status === "error") {
      throw new Error(response.error);
    }

    return response.data;
  };

  return useQuery(queryKey, () => newClientActionQueryFn(), options);
};

type MutationActionFunction<TData = unknown, TVariables = unknown> =
  | ((variables: TVariables) => Promise<TData>)
  | (() => Promise<TData>);

export const useActionMutation = <
  TData = unknown,
  TError = unknown,
  TVariables = void,
  TContext = unknown
>(
  mutationFn: MutationActionFunction<TData, TVariables>,
  options?: Omit<
    UseMutationOptions<TData, TError, TVariables, TContext>,
    "mutationFn"
  >
) => {
  // INTERCEPT AFTER CALLING FUNCTION
  const newClientActionMutationFn = async (
    variables: TVariables
  ): Promise<TData> => {
    const response = await wrapServerActionWithParams(mutationFn, variables);

    if (response.status === "error") {
      throw new Error(response.error);
    }

    return response.data;
  };

  return useMutation(newClientActionMutationFn, options);
};
