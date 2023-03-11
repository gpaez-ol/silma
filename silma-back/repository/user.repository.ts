import { UserAttributes, UserCreationAttributes } from "database/models";
import { connectToDatabase } from "database/sequelize";
import { ModelDefined } from "sequelize";
import { GenericRepository } from "./template.repository";

/* The UserRepository class extends the GenericRepository class and implements the model property. */
export class UserRepository extends GenericRepository<
  UserAttributes,
  UserCreationAttributes
> {
  model: ModelDefined<UserAttributes, UserCreationAttributes>;

  constructor(model: ModelDefined<UserAttributes, UserCreationAttributes>) {
    super(model);
    this.model = model;
  }
}

/**
 * This function returns a promise that resolves to a UserRepository object.
 * @returns A promise that resolves to a UserRepository
 */
export const getUserRepository = async (): Promise<UserRepository> => {
  const db = await connectToDatabase();
  const userRepository: UserRepository = new UserRepository(db.User);
  return userRepository;
};
