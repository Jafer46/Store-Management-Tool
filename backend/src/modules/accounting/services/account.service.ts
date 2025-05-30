import { CrudService } from "../../../common/service/crud.service";
import { IAccount } from "../../../constants/types";
import account from "../models/account";

export const accountService = new CrudService<IAccount>(account);
