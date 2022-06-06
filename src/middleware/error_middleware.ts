import { Response, Request, NextFunction } from 'express';

interface Error {
  name?: string;
  stack?: string;
  message?: string;
  status?: number;
}

const errorMiddleware = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errorStatus = error.status || 500;
  const errorMsg = error.message || 'something went wrong!';
  res.status(errorStatus).send(`${errorStatus}: ${errorMsg}`);
  next();
};

export default errorMiddleware;
