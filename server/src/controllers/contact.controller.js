import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createContact = asyncHandler(async (req, res) => {
  const {
    firstName,
    middleName,
    lastName,
    email,
    phoneNumber1,
    phoneNumber2,
    address,
    userId,
  } = req.body;

  if (!firstName || !lastName || !email || !phoneNumber1 || !userId) {
    throw new ApiError(400, "Required fields are missing");
  }
  const existingContact = await prisma.contact.findFirst({
    where: { email },
  });
  if (existingContact) {
    throw new ApiError(400, "Email is already associated with another contact");
  }

  const createdContact = await prisma.contact.create({
    data: {
      firstName,
      middleName,
      lastName,
      email,
      phoneNumber1,
      phoneNumber2,
      address,
      userId,
    },
  });
  if (!createdContact) {
    throw new ApiError(500, "Error while creating new contact");
  }

  res
    .status(200)
    .json(
      new ApiResponse(200, { createdContact }, "Contact created successfully")
    );
});

const getallcontacts = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { page = 1, pageSize = 10 } = req.query;
  const skip = (page - 1) * pageSize;

  const contacts = await prisma.contact.findMany({
    where: { userId, isDeleted: false },
    orderBy: { firstName: "asc" },
    skip,
    take: Number(pageSize),
  });

  if (!contacts || contacts.length === 0) {
    throw new ApiError(404, "No contacts found");
  }

  res
    .status(200)
    .json(
      new ApiResponse(200, { contacts }, "Contacts retrieved successfully")
    );
});

const editcontact = asyncHandler(async (req, res) => {
  const contactId = req.params.contactId;

  console.log(contactId);
  const userId = req.user.id;
  const {
    firstName,
    middleName,
    lastName,
    email,
    phoneNumber1,
    phoneNumber2,
    address,
  } = req.body;
  const fieldsToUpdate = {};

  if (firstName) fieldsToUpdate.firstName = firstName;
  if (middleName) fieldsToUpdate.middleName = middleName;
  if (lastName) fieldsToUpdate.lastName = lastName;
  if (email) fieldsToUpdate.email = email;
  if (phoneNumber1) fieldsToUpdate.phoneNumber1 = phoneNumber1;
  if (phoneNumber2) fieldsToUpdate.phoneNumber2 = phoneNumber2;
  if (address) fieldsToUpdate.address = address;

  if (Object.keys(fieldsToUpdate).length < 1) {
    throw new ApiError(400, "No fields provided for updating");
  }

  if (email) {
    const existingContact = await prisma.contact.findFirst({
      where: { email, NOT: { id: Number(contactId) } },
    });
    if (existingContact) {
      throw new ApiError(
        400,
        "Email is already associated with another contact"
      );
    }
  }

  const updatedContact = await prisma.contact.update({
    where: { id: Number(contactId) },
    data: fieldsToUpdate,
  });

  if (!updatedContact) {
    throw new ApiError(500, "Error while updating contact");
  }

  res
    .status(200)
    .json(
      new ApiResponse(200, { updatedContact }, "Contact updated successfully")
    );
});

const searchcontact = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { searchQuery = "", page = 1, pageSize = 10 } = req.query;
  const skip = (page - 1) * pageSize;

  const contacts = await prisma.contact.findMany({
    where: {
      userId,
      isDeleted: false,
      OR: [
        { firstName: { contains: searchQuery } },
        { lastName: { contains: searchQuery } },
        { email: { contains: searchQuery } },
        { phoneNumber1: { contains: searchQuery } },
        { phoneNumber2: { contains: searchQuery } },
        { address: { contains: searchQuery } },
      ],
    },
    orderBy: { firstName: "asc" },
    skip,
    take: Number(pageSize),
  });

  if (!contacts || contacts.length === 0) {
    throw new ApiError(404, "No contacts found");
  }

  res
    .status(200)
    .json(
      new ApiResponse(200, { contacts }, "Contacts retrieved successfully")
    );
});

const softdeletecontact = asyncHandler(async (req, res) => {
  const contactId = req.params.contactId;
  const userId = req.user.id;

  const deletedContact = await prisma.contact.update({
    where: { id: Number(contactId) },
    data: { isDeleted: true },
  });

  if (!deletedContact) {
    throw new ApiError(500, "Error while deleting contact");
  }

  res
    .status(200)
    .json(
      new ApiResponse(200, { deletedContact }, "Contact deleted successfully")
    );
});

export {
  createContact,
  getallcontacts,
  editcontact,
  searchcontact,
  softdeletecontact,
};
