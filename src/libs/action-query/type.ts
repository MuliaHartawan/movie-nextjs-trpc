import { CustomException } from "@/types/cutom-exception";

export type ActionResponse<T> = ActionResponseSuccess<T> | ActionResponseError;

export type ActionResponseSuccess<T> = {
  status: "success";
  data: T;
};

export type ActionResponseError = {
  status: "error";
  error: CustomException;
};

export type AnyFunction<TQueryFnData, TArgs extends any[] = any[]> = (
  ...args: TArgs
) => Promise<TQueryFnData>;
