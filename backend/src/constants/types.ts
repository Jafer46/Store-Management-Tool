import { Document } from "mongoose";

export enum Status {
  Not_Found = 404,
  Server_Error = 500,
  Ok = 200,
  Created = 201,
  BadRequest = 400,
  Unauthorized = 401,
  Forbidden = 403,
  Conflict = 409,
}

export enum Account_Type {
  Expense = "Expense",
  Income = "Income",
  BankAndCash = "BankAndCash",
  OffBalanceSheet = "OffBalanceSheet",
  Equity = "Equity",
  Liability = "Liability",
  Asset = "Asset",
}

export enum Tax_Type {
  Payable = "Payable",
  Receivable = "Receivable",
}

export enum Document_status {
  Active = "Active",
  Archived = "Archived",
}

export interface Accounts {
  expenseAccount: IAccount;
  incomeAccount: IAccount;
}

export interface IApproval_Stage extends Document {
  name: string;
  stages: {
    level: number;
    name: string;
    isLast: boolean;
    stage_no: number;
  }[];
}

export interface IStatus extends Document {
  document_status: Document_status;
  approval_stage: string;
}

export interface IAccount_Group extends Document {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ITax extends Document {
  id: string;
  name: string;
  rate: number;
  type: Tax_Type;
  createdAt: Date;
  updatedAt: Date;
}

export interface IAccount extends Document {
  id: string;
  name: string;
  number: string;
  type: Account_Type;
  group: IAccount_Group;
  default_tax: ITax;
  createdAt: Date;
  updatedAt: Date;
  status: IStatus;
}

export interface IContact_Type extends Document {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IContact extends Document {
  id: string;
  full_name: string;
  address: {
    city: string;
    zone: string;
    wereda: string;
    kebele: string;
    house_no: string;
  };
  phone?: string;
  email?: string;
  tax_id?: string;
  individual: boolean;
  contact_type: IContact_Type;
  accounts: Accounts;

  createdAt: Date;
  updatedAt: Date;
  status: IStatus;
}

export interface IDocument extends Document {
  id: string;
  name: string;
  description: string;
  path: string;
  createdAt: string;
  updatedAt: string;
}

export interface IRole extends Document {
  id: string;
  name: string;
  description: string;
  level: number;
  access: {
    document: IDocument;
    create: boolean;
    delete: boolean;
    read: boolean;
    add: boolean;
    browse: boolean;
    edit: boolean;
  };
  status: IStatus;
  createdAt: string;
  updatedAt: string;
}

export interface IUser extends Document {
  id: string;
  username: string;
  password: string;
  contact?: IContact;
  token: {
    refresh_token: string;
    jwt_token: string;
  };
  role: IRole;
  createdAt: Date;
  updatedAt: Date;
  status: IStatus;
}
