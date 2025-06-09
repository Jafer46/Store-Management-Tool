import axios, { AxiosError } from "axios";

interface Request {
  method: "get" | "post" | "put" | "delete";
  url: string;
  data?: any;
}

const client = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 1000,
  headers: { "X-Custom-Header": "foobar" },
});

export const request = ({ method, url, data }: Request) => {
  const onSuccess = (response: any) => response;
  const onError = (error: AxiosError) => {
    return error;
  };

  client({ method, url, data }).then(onSuccess).catch(onError);
};
