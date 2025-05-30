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

export interface IStatus extends Document {
  document_status: Document_status;
  approval_stage: {
    level: number;
    name: string;
    isLast: boolean;
    stage_no: number;
  }[];
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
  phone: string;
  email: string;
  tax_id?: string;

  createdAt: Date;
  updatedAt: Date;
  status: IStatus;
}

export interface IRole extends Document {
  id: string;
  name: string;
  description: string;
  level: number;
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
