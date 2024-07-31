export type ActionResponse<T> = ActionResponseSuccess<T> | ActionResponseError;

export type ActionResponseSuccess<T> = {
  status: "success";
  data: T;
};

export type ActionResponseError = {
  status: "error";
  error: string;
};

export type ServerActionFunction<TData, TVariables> =
  | ((variables: TVariables) => Promise<TData>)
  | (() => Promise<TData>);
