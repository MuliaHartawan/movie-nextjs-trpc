export type ErrorMapper<T> = {
  meta: {
    code: number;
    status: "error";
    message: string;
  };
  data: T;
};
