export enum ProjectVariants {
  editable = "editable",
  static = "static",
}
export type ProjectPageVariants = keyof typeof ProjectVariants;
