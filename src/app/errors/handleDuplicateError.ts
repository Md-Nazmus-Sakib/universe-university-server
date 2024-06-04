import mongoose from "mongoose";
import { TErrorSources, TGenericErrorResponse } from "../interface/error";

const handleDuplicateError = (err: any): TGenericErrorResponse => {
  //Extract Value within double Quotes using regex
  const match = err.message.match(/"([^]*)"/);
  //The extraction value will be in the first capturing group

  const extractingMessage = match && match[1];

  const errorSources: TErrorSources = [
    {
      path: err.path,
      message: `${extractingMessage} is already exist.`,
    },
  ];

  const statusCode = 400;
  return {
    statusCode,
    message: "Invalid Id",
    errorSources,
  };
};

export default handleDuplicateError;
