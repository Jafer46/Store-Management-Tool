import asyncHandler from "express-async-handler";
import { Response, Request } from "express";
import { approvalStageService } from "../services/approval-stage.service";
import { ResponseBuilder } from "../../../../utils/response.builder";
import { GetQuery } from "../../../../constants/types.request";

export const createApproveStage = asyncHandler(
  async (req: Request, res: Response) => {
    const { name, stages } = req.body;
    const approvalStage = await approvalStageService.create({ name, stages });
    const response = new ResponseBuilder().setData(approvalStage).build();
    res.status(201).json(response);
  }
);

export const getApprovalStages = asyncHandler(
  async (req: Request, res: Response) => {
    const { limit, skip, populate, where, sort }: GetQuery = req.query;
    const approvalStages = await approvalStageService.findAll({
      limit,
      skip,
      populate,
      where,
      sort,
    });

    const response = new ResponseBuilder().setData(approvalStages).build();
    res.status(200).json(response);
  }
);

export const getApprovalStage = asyncHandler(
  async (req: Request, res: Response) => {
    const { populate, where }: GetQuery = req.query;
    const approvalStage = await approvalStageService.findOne({
      where,
      populate,
    });

    if (!approvalStage) {
      res.status(404);
      throw new Error("Stage not found!");
    }

    const response = new ResponseBuilder().setData(approvalStage).build();
    res.status(200).json(response);
  }
);

export const updateApprovalStage = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, stages } = req.body;
    const approvalStage = await approvalStageService.update(id, {
      name,
      stages,
    });
    if (!approvalStage) {
      res.status(404);
      throw new Error("Stage not found!");
    }

    const response = new ResponseBuilder().setData(approvalStage).build();
    res.status(200).json(response);
  }
);

export const deleteApprovalStage = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const approvalStage = await approvalStageService.delete(id);
    if (!approvalStage) {
      res.status(404);
      throw new Error("Stage not found!");
    }
    const response = new ResponseBuilder().setData(approvalStage).build();
    res.status(200).json(response);
  }
);
