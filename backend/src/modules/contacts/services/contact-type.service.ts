import { CrudService } from "../../../common/service/crud.service";
import { IContact_Type } from "../../../constants/types";
import contactType from "../models/contact-type";

export const contactTypeService = new CrudService<IContact_Type>(contactType);
