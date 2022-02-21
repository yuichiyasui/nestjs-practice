import { NextFunction } from 'express';

export const logger = (_req: Request, _res: Response, next: NextFunction) => {
  console.log('Request...');
  next();
};
