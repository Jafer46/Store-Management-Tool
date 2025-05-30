export interface GetQuery {
  limit?: number;
  skip?: number;
  sort?: string;
  populate?: string[];
  where?: any;
}
