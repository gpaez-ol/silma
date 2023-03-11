import { UserAttributes } from "database/models";
import { getUserRepository } from "repository";
import { writeToConsole } from "utils";

/**
 * It returns a promise that resolves to a UserAttributes object
 * @param email - The email of the user to be retrieved.
 * @returns A user object
 */
export const getUserByEmail = async (
  email: string
): Promise<UserAttributes> => {
  if (email === null || email === undefined) {
    writeToConsole("email was not set");
    throw new Error("email was not set");
  }
  const userRepository = await getUserRepository();
  const user = await userRepository.findOne({
    include: [],
    where: {
      email,
    },
  });

  if (user.raw === null || user.raw === undefined) {
    writeToConsole("User was not found");
    throw new Error("User was not found");
  }

  return user.row;
};
