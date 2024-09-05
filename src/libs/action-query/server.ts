"use server";
import { CustomException } from "@/types/cutom-exception";
import { ActionResponse, ServerActionFunction } from "./type";
import UnprocessableEntityException from "../../errors/UnprocessableEntityException";

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
    const errorObj = {} as CustomException;
    const customException = error as CustomException;
    if ("errors" in customException) {
      errorObj["errors"] = customException.errors;
    }
    if ("name" in customException) {
      errorObj["name"] = customException.name;
    }
    if ("errorCode" in customException) {
      errorObj["errorCode"] = customException.errorCode;
    }
    if ("message" in customException) {
      errorObj["message"] = customException.message;
    }
    return {
      status: "error",
      error: errorObj,
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
