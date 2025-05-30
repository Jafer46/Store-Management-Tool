import { CrudService } from "../../../common/service/crud.service";
import { IAccount_Group } from "../../../constants/types";
import accountGroup from "../models/account-group";

const accountGroupService = new CrudService<IAccount_Group>(accountGroup);

export default accountGroupService;
