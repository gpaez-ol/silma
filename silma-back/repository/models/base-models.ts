import { EntityAttributes } from "database/models";
import {
  FindAttributeOptions,
  Includeable,
  Model,
  Order,
  WhereOptions,
} from "sequelize";
import { Pagination } from "types";

export type BaseRepositoryParams<S extends EntityAttributes> = {
  where?: WhereOptions<S>;
  attributes?: FindAttributeOptions;
  include?: Includeable | Includeable[];
  order?: Order;
};
export type RepositoryParams<S extends EntityAttributes> =
  BaseRepositoryParams<S> & {
    pagination?: Pagination;
  };
export type PaginationOptions =
  | { limit: number; offset: number }
  | Record<string, never>;
export type AttributeOptions =
  | { attributes: FindAttributeOptions }
  | Record<string, never>;
export type WhereOptionResponse<S> =
  | { where: WhereOptions<S> }
  | Record<string, never>;
export type IncludeOptions =
  | { include: Includeable | Includeable[] }
  | Record<string, never>;
export type OrderOptions = { order: Order } | Record<string, never>;
export type RepositorySingleAnswer<S extends EntityAttributes, M> = {
  raw: Model<S, M>;
  row: S;
};
export type RepositoryListAnswer<S extends EntityAttributes, M> = {
  raw: Model<S, M>[] | null;
  rows: S[];
};
