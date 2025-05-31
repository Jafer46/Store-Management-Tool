import { CrudService } from "../../../../common/service/crud.service";
import { IRole } from "../../../../constants/types";
import role from "../models/role";

export const roleService = new CrudService<IRole>(role);
