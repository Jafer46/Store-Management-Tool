import { ResponseBuilder } from "../utils/response.builder";

export const errorHandler = (err: any, req: any, res: any, next: any) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  const message = err.message ? err.message : "Something went wrong";

  const response = new ResponseBuilder()
    .setData(null)
    .setMessage(message)
    .setSuccess(false)
    .build();

  res.status(statusCode).json(response);
};
