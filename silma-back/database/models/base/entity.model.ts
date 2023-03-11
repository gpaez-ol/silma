export type EntityOptionalAttributes = {
  deletedAt: Date | null;
  deletedBy?: string;
  updatedAt?: Date;
  updatedBy?: string;
  createdBy?: string;
};
export type EntityAttributes = {
  createdAt: Date;
} & EntityOptionalAttributes;
