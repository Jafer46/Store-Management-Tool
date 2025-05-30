import { CrudService } from "@/common/service/crud.service";
import { ITax } from "@/constants/types";
import { Tax } from "../models/tax";

const taxService = new CrudService<ITax>(Tax);

export default taxService;
