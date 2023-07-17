import { RequestHandler } from 'express';
import { IError } from '../types/IError';
import jwt from 'jsonwebtoken';

export const isAuth: RequestHandler = (req, res, next) => {
	const token = req.header('Authorization')?.replace('Bearer ', '');
	if (!token) {
		return next(new IError('Unauthorized', 401));
	}
	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
			id: string;
		};
		//@ts-ignore
		req.user = decoded;

		next();
	} catch (e) {
		next(new IError('Unauthorized', 401));
	}
};
