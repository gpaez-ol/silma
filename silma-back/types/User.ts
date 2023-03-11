export const userTypes = ["user", "admin"] as const;
export type UserType = typeof userTypes[number];
