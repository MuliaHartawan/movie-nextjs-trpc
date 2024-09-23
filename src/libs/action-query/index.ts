"use client";

import {
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
  QueryKey,
  UseQueryResult,
} from "@tanstack/react-query";
import { wrapServerActionWithParams } from "./server";
import { CustomException } from "@/types/cutom-exception";
import { AnyFunction } from "./type";

export const useActionQuery = <
  TQueryKey extends QueryKey,
  TFunction extends AnyFunction<any>,
  TQueryFnData extends Awaited<ReturnType<TFunction>>,
  TData = TQueryFnData,
  TError = CustomException,
>(
  queryKey: TQueryKey,
  queryFn: TFunction,
  queryFnParams: Parameters<TFunction>,
  options?: UseQueryOptions<
    TQueryFnData, // Automatically infer TQueryFnData as the return type of queryFn
    TError, // Error type remains as unknown unless you have a specific error type
    TData, // TData defaults to TQueryFnData
    TQueryKey
  >,
): UseQueryResult<TData, TError> => {
  const newClientActionQueryFn = async (): Promise<TQueryFnData> => {
    const response = await wrapServerActionWithParams(queryFn, ...queryFnParams);
    if (response.status === "error") {
      throw response.error;
    }
    return response.data;
  };

  // Use the useQuery hook with the inferred types
  return useQuery<TQueryFnData, TError, TData, TQueryKey>({
    queryKey,
    queryFn: newClientActionQueryFn,
    ...options,
  });
};

// TODO: Implement AnyFUnction type
type MutationActionFunction<TData = unknown, TVariables = unknown> =
  | ((variables: TVariables) => Promise<TData>)
  | (() => Promise<TData>);

export const useActionMutation = <
  TData = unknown,
  TError = unknown,
  TVariables = void,
  TContext = unknown,
>(
  mutationFn: MutationActionFunction<TData, TVariables>,
  options?: Omit<UseMutationOptions<TData, TError, TVariables, TContext>, "mutationFn">,
) => {
  const newClientActionMutationFn = async (variables: TVariables): Promise<TData> => {
    const response = await wrapServerActionWithParams(mutationFn, variables);
    if (response.status === "error") {
      throw response.error;
    }
    return response.data;
  };
  return useMutation({
    mutationFn: newClientActionMutationFn,
    ...options,
  });
};
