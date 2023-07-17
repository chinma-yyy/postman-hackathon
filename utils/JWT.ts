import jwt from 'jsonwebtoken';

export const getToken = (id: string): string => {
	const token = jwt.sign({ id }, process.env.JWT_SECRET!);
	return token;
};
