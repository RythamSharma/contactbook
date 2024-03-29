import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt"
const prisma = new PrismaClient();

const registerUser = asyncHandler(async (req, res) => {
  const {  email, username, password } = req.body;
  if (!email || !username || !password) {
    throw new ApiError(400, "Email, username, and password are required");
  }
  const existinguser = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if(existinguser){
   return res.status(400).json({"message": "User already exists"})
  }
  const hashedpassword = await bcrypt.hash(password, 10)
  const createdUser = await prisma.user.create({
    data: {
      email,
      username,
      password:hashedpassword,
    },
  });
  const accessToken = jwt.sign(
    { id: createdUser.id, email: createdUser.email },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "1d" }
  );
  if (!createdUser) {
    throw new ApiError(500, "Error while creating new user");
  }
  res.send(
    new ApiResponse(
      200,
      { createdUser, accessToken },
      "User created successfully"
    )
  );
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({"message": "Email and Password are required"})
  }
  const loggedinuser = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (!loggedinuser) {
    return res.status(400).json({"message": "User doesn't exists"})
  }
  const match = await bcrypt.compare(password, loggedinuser.password);
  if (!match) {
    return res.status(400).json({"message": "Incorrect password"})
  }
  const accesstoken = jwt.sign(
    { id: loggedinuser.id, email: loggedinuser.email },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "1d" }
  );
  const options = {
    http: true,
    secure: true,
  };
  return res
    .status(200)
    .cookie("accessToken", accesstoken, options)
    .json(
      new ApiResponse(
        200,
        { loggedinuser, accesstoken },
        "User Logged In successfully"
      )
    );
});







export {
  loginUser,
  registerUser,
};
