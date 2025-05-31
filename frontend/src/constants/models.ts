export const MRole = {
  id: "String",
  name: "String",
  description: "String",
  level: "Number",
  access: [
    {
      document: "String",
      create: "Boolean",
      delete: "Boolean",
      read: "Boolean",
      add: "Boolean",
      browse: "Boolean",
      edit: "Boolean",
    },
  ],
  maxLevel: "formula: this.level*4",
};

export const MRoleAccess = {
  document: "String",
  create: "Boolean",
  delete: "Boolean",
  read: "Boolean",
  add: "Boolean",
  browse: "Boolean",
  edit: "Boolean",
};
