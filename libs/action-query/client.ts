import { ServerActionFunction } from "./type";

export const callServerActionQuery =
  <TData>(queryFn: ServerActionFunction<TData, void>) =>
  async () => {
    try {
      const response = await queryFn();
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

export const callServerActionMutation =
  <TData>(queryFn: ServerActionFunction<TData, void>) =>
  async () => {
    try {
      const response = await queryFn();
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
