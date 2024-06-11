import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { User } from "../user/user.model";
import { TLoginUser } from "./auth.interface";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../../config";

const loginUser = async (payload: TLoginUser) => {
  //check if the user is exist
  // const isUserExists = await User.findOne({ id: payload?.id });

  const user = await User.isUserExistByCustomId(payload.id);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "This User is Not Found.");
  }
  //checking if the user is already deleted
  // const isDeleted = isUserExists?.isDeleted;
  const isDeleted = user?.isDeleted;
  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, "This User is Deleted.");
  }
  //checking if the user is blocked
  // const userStatus = isUserExists?.status;
  const userStatus = user?.status;
  if (userStatus === "blocked") {
    throw new AppError(httpStatus.FORBIDDEN, "This User is Blocked.");
  }

  //Checking if the Password is Correct

  // const isPasswordMatch = await bcrypt.compare(
  //   payload?.password,
  //   isUserExists?.password
  // );
  if (!(await User.isPasswordMatched(payload?.password, user?.password))) {
    throw new AppError(httpStatus.FORBIDDEN, "Wrong Password.");
  }
  //Access Granted: Send AccessToken,RefreshToken

  //create token and send to the client

  const jwtPayload = {
    userId: user,
    role: user?.role,
  };

  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: "10d",
  });

  return {
    accessToken,
    needPasswordChange: user?.needPasswordChange,
  };
};

export const AuthServices = {
  loginUser,
};
