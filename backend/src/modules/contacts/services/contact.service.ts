import { CrudService } from "../../../common/service/crud.service";
import { IContact } from "../../../constants/types";
import contact from "../models/contact";

const contactService = new CrudService<IContact>(contact);

export default contactService;
