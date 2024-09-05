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

export type ServerActionFunction<TData, TVariables> =
  | ((variables: TVariables) => Promise<TData>)
  | (() => Promise<TData>);
