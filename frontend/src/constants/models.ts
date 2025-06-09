export const MRole = {
  id: { type: "String", required: true, default: "", visible: true },
  name: { type: "String", required: false, default: "", visible: true },
  description: { type: "String", required: false, default: "", visible: true },
  level: { type: "Number", required: false, default: 0, visible: true },
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
  maxLevel: "formula: this.level + this.id /4",
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
