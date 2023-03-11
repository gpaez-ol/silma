import { EntityAttributes } from "database/models";
import { getPaginationSequelizeOptions } from "utils";
import {
  FindAttributeOptions,
  Includeable,
  ModelDefined,
  Order,
  WhereOptions,
} from "sequelize/types";
import { Pagination } from "types";
import {
  AttributeOptions,
  BaseRepositoryParams,
  PaginationOptions,
  RepositoryListAnswer,
  RepositoryParams,
  RepositorySingleAnswer,
  WhereOptionResponse,
  IncludeOptions,
  OrderOptions,
} from "./models/base-models";

function getWhere<S extends EntityAttributes>(
  whereOptions: WhereOptions<S> | null
): WhereOptionResponse<S> {
  // TODO: add panic mode in order for deletedAt not to be added
  if (whereOptions) return { where: { deletedAt: null, ...whereOptions } };
  return {};
}

export class GenericRepository<S extends EntityAttributes, M> {
  model: ModelDefined<S, M>;

  constructor(model: ModelDefined<S, M>) {
    this.model = model;
  }

  private static getPagination(
    pagination: Pagination | null
  ): PaginationOptions {
    if (pagination) return getPaginationSequelizeOptions(pagination);
    return {};
  }

  private static getAttributes = (
    attributeOptions: FindAttributeOptions | null
  ): AttributeOptions => {
    if (attributeOptions) return { attributes: attributeOptions };
    return {};
  };

  private static getIncludes = (
    include: Includeable | Includeable[] | null
  ): IncludeOptions => {
    if (include) return { include };
    return {};
  };

  private static getOrdering = (order: Order | null): OrderOptions => {
    if (order) return { order };
    return {};
  };

  private static getOptions<T extends EntityAttributes>(
    repositoryParams: RepositoryParams<T>
  ): {
    paginationOptions: PaginationOptions;
    attributeOptions: AttributeOptions;
    whereOptions: WhereOptionResponse<T>;
    includeOptions: IncludeOptions;
    orderingOptions: OrderOptions;
  } {
    const paginationOptions = GenericRepository.getPagination(
      repositoryParams.pagination
    );
    const attributeOptions = GenericRepository.getAttributes(
      repositoryParams.attributes
    );
    const whereOptions = getWhere(repositoryParams.where);
    const includeOptions = GenericRepository.getIncludes(
      repositoryParams.include
    );
    const orderingOptions = GenericRepository.getOrdering(
      repositoryParams.order
    );
    return {
      paginationOptions,
      attributeOptions,
      whereOptions,
      includeOptions,
      orderingOptions,
    };
  }

  findAll = async (
    repositoryParams: RepositoryParams<S>
  ): Promise<RepositoryListAnswer<S, M>> => {
    const {
      paginationOptions,
      attributeOptions,
      whereOptions,
      includeOptions,
      orderingOptions,
    } = GenericRepository.getOptions(repositoryParams);
    const rawResults = await this.model.findAll({
      ...includeOptions,
      ...attributeOptions,
      ...orderingOptions,
      ...paginationOptions,
      ...whereOptions,
    });
    const results = rawResults.map((result) => result.get({ plain: true }));
    return { raw: rawResults, rows: results };
  };

  findAndCountAll = async (
    repositoryParams: RepositoryParams<S>
  ): Promise<RepositoryListAnswer<S, M> & { count: number }> => {
    const {
      paginationOptions,
      attributeOptions,
      whereOptions,
      includeOptions,
      orderingOptions,
    } = GenericRepository.getOptions(repositoryParams);
    const rawResults = await this.model.findAndCountAll({
      ...includeOptions,
      ...attributeOptions,
      ...orderingOptions,
      ...paginationOptions,
      ...whereOptions,
    });

    const results = {
      rows: rawResults.rows.map((result) => result.get({ plain: true })),
      count: rawResults.count,
    };
    return { raw: rawResults.rows, rows: results.rows, count: results.count };
  };

  findOne = async (
    repositoryParams: BaseRepositoryParams<S>
  ): Promise<RepositorySingleAnswer<S, M>> => {
    const { attributeOptions, whereOptions, includeOptions } =
      GenericRepository.getOptions(repositoryParams);
    const rawResult = await this.model.findOne({
      ...attributeOptions,
      ...includeOptions,
      ...whereOptions,
    });
    return {
      raw: rawResult,
      row:
        rawResult !== undefined && rawResult !== null
          ? rawResult.get({ plain: true })
          : null,
    };
  };
}
