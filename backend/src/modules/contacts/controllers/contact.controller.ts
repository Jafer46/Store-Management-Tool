import { GetQuery } from "../../../constants/types.request";
import { parseRequestQuery } from "../../../utils/request.parser";
import { ResponseBuilder } from "../../../utils/response.builder";
import contactService from "../services/contact.service";
import asyncHandler from "express-async-handler";

const createContact = asyncHandler(async (req, res) => {
  const { full_name, email, phone } = req.body;
  const contactExits = await contactService.findOne({
    where: {
      $or: [{ full_name: full_name }, { email: email }, { phone: phone }],
    },
  });
  if (contactExits) {
    res.status(409);
    throw new Error("Contact already exits");
  }
  const contact = await contactService.create({ full_name, email, phone });
  const response = new ResponseBuilder()
    .setSuccess(true)
    .setData(contact)
    .build();
  res.status(201).json(response);
});

const getContacts = asyncHandler(async (req, res) => {
  const { limit, sort, skip, populate, where, page }: GetQuery =
    parseRequestQuery(req.query);
  const contacts = await contactService.findAll({
    limit,
    sort,
    skip,
    populate,
    where,
  });

  const response = new ResponseBuilder()
    .setData(contacts)
    .setPage(page as number)
    .build();

  res.status(200).json(response);
});

const getContact = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { populate }: { populate?: string[] } = req.query;
  const contact = await contactService.findOne({
    where: { _id: id },
    populate,
  });
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  res.status(200).json(contact);
});

const updateContact = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { full_name, email, phone } = req.body;
  const contact = await contactService.update(id, {
    full_name,
    email,
    phone,
  });
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  const response = new ResponseBuilder().setData(contact).build();
  res.status(200).json(response);
});

const deleteContact = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const contact = await contactService.delete(id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  const response = new ResponseBuilder().setData(contact).build();
  res.status(200).json(response);
});

const deleteManyContacts = asyncHandler(async (req, res) => {
  const { ids } = req.body;
  if (!ids || ids.length === 0) {
    res.status(400);
    throw new Error("Ids not found");
  }
  const contacts = await contactService.deleteMany(ids);
  const response = new ResponseBuilder()
    .setSuccess(true)
    .setData(contacts)
    .build();
  res.status(200).json(response);
});

export {
  createContact,
  getContacts,
  getContact,
  updateContact,
  deleteContact,
  deleteManyContacts,
};
