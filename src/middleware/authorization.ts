import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

const ALLOWED_QUERY_PROPAGATION_TIME = 2000;

export default function jwtAuthorization(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authorization = req.headers.authorization;
  if (!authorization) {
    return res.status(403).send({
      success: false,
      message: 'No Bearer provided.'
    });
  }
  const authorizationHeader = authorization.split(' ')[0];
  const authorizationToken = authorization.split(' ')[1];
  if (authorizationHeader !== 'Bearer') {
    return res.status(403).send({
      success: false,
      message: 'Failed to Authorize Access.'
    });
  }

  const decoded = JSON.parse(
    JSON.stringify(jwt.verify(authorizationToken, process.env.PRODUCTION_TOKEN))
  );
  const currentTime: number = new Date().getTime();
  const actualPropagationTime: number = currentTime - Number(decoded.time);
  if (actualPropagationTime < ALLOWED_QUERY_PROPAGATION_TIME) {
    next();
  } else {
    return res.status(403).send({
      success: false,
      message: 'Failed to Authorize Access.'
    });
  }
}
