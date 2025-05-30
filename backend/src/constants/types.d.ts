enum Account_Type {
  Expense = "Expense",
  Income = "Income",
  BankAndCash = "BankAndCash",
  OffBalanceSheet = "OffBalanceSheet",
  Equity = "Equity",
  Liability = "Liability",
  Asset = "Asset",
}

enum Tax_Type {
  Payable = "Payable",
  Receivable = "Receivable",
}

interface IStatus {
  document_status: string;
  approval_stage: string;
}

interface IAccount_Group {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

interface ITax {
  id: string;
  name: string;
  rate: number;
  type: Tax_Type;
  createdAt: Date;
  updatedAt: Date;
}

interface IAccount {
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
