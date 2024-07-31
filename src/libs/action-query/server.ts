"use server";
import { ActionResponse, ServerActionFunction } from "./type";

/**
 * Server Action Wrapper with Params
 *
 * Execute given server action and catch error if any
 * Then return the response as ActionResponse
 *
 * @param queryFn
 * @param vars
 * @returns
 */
export const wrapServerActionWithParams = async <TData, TVariables = void>(
  queryFn: ServerActionFunction<TData, TVariables>,
  vars: TVariables,
): Promise<ActionResponse<TData>> => {
  try {
    const response = await queryFn(vars);
    return {
      status: "success",
      data: response,
    };
  } catch (error) {
    return {
      status: "error",
      error: (error as Error).message,
    };
  }
};

/**
 * Server Action Wrapper WITHOUT Params
 *
 * Execute given server action and catch error if any
 * Then return the response as ActionResponse
 *
 * @param queryFn
 * @returns
 */
export const wrapServerAction = async <TData>(queryFn: () => Promise<TData>) => {
  return wrapServerActionWithParams(queryFn, undefined);
};
