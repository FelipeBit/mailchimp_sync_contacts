import { Request, Response, NextFunction } from "express";

import AppError from "../../infra/helper/appError";
import logger from "../../infra/helper/logger";

const appError = (
  error: Error,
  request: Request,
  response: Response,
  _next: NextFunction
): any => {
  if (error instanceof AppError) {
    logger.error(
      JSON.stringify({
        code: error.statusCode,
        status: "error",
        message: error.message,
      })
    );
    return response.status(error.statusCode).json({
      status: "error",
      message: error.message,
    });
  }

  logger.error(
    JSON.stringify({
      code: 500,
      status: "error",
      message: error.message,
    })
  );

  return response.status(500).json(JSON.stringify(error.message));
};

export default appError;
