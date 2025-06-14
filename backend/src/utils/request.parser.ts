import { Request } from "express";
import { GetQuery } from "../constants/types.request";

const parseRequestQuery = (query: any): GetQuery => {
  if (!query)
    return {
      limit: 10,
      skip: 0,
      sort: "-createdAt",
      populate: [],
      where: {},
      page: 1,
    };

  const page = query.skip && query.limit ? query.skip / query.limit + 1 : 1;

  return {
    limit: query.limit || 10,
    skip: query.skip || 0,
    sort: query.sort || "-createdAt",
    populate: query.populate || [],
    where: query.where || {},
    page: page,
  };
};

export { parseRequestQuery };
