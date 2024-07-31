"use client";

import {
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
  QueryKey,
} from "@tanstack/react-query";
import { wrapServerAction, wrapServerActionWithParams } from "./server";

export const useActionQuery = <
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
>(
  queryKey: TQueryKey,
  queryFn: () => Promise<TQueryFnData>,
  options?: Omit<UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>, "queryKey" | "queryFn">,
) => {
  const newClientActionQueryFn = async (): Promise<TQueryFnData> => {
    const response = await wrapServerAction(queryFn);
    if (response.status === "error") {
      throw new Error(response.error);
    }
    return response.data;
  };
  return useQuery({
    queryKey,
    queryFn: newClientActionQueryFn,
    ...options,
  });
};

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
      throw new Error(response.error);
    }
    return response.data;
  };
  return useMutation({
    mutationFn: newClientActionMutationFn,
    ...options,
  });
};
