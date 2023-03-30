import { InOrderAttributes, InOrderCreationAttributes } from "database/models";
import { connectToDatabase } from "database/sequelize";
import { ModelDefined } from "sequelize";
import { GenericRepository } from "./template.repository";

/* The InOrderRepository class extends the GenericRepository class and implements the model property. */
export class InOrderRepository extends GenericRepository<
  InOrderAttributes,
  InOrderCreationAttributes
> {
  model: ModelDefined<InOrderAttributes, InOrderCreationAttributes>;

  constructor(
    model: ModelDefined<InOrderAttributes, InOrderCreationAttributes>
  ) {
    super(model);
    this.model = model;
  }
}

/**
 * This function returns a promise that resolves to a UserRepository object.
 * @returns A promise that resolves to a UserRepository
 */
export const getInOrderRepository = async (): Promise<InOrderRepository> => {
  const db = await connectToDatabase();
  const userRepository: InOrderRepository = new InOrderRepository(db.InOrder);
  return userRepository;
};
