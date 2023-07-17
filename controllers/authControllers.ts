import { RequestHandler } from 'express';
import { validatePassword } from '../middlewares/Password';
import userModel from '../models/user';
import { getToken } from '../utils/JWT';
import bcrypt from 'bcryptjs';

export const login: RequestHandler = async (req, res, next) => {
	const { email, password } = req.body;
	const user = await userModel.findOne({ email });
	if (!user) {
		return res.status(404).json({ message: 'User not found' });
	}
	await bcrypt.compare(password, user?.password);
	res
		.status(200)
		.json({
			message: 'Logged in successfully',
			token: getToken(user._id.toString()),
		});
};

export const signup: RequestHandler = async (req, res, next) => {
	try {
		const { name, email, password } = req.body;
		validatePassword(password);
		const hashedPassword = await bcrypt.hash(
			password,
			process.env.BCRYPT_SALT!,
		);
		const user = new userModel({ name, email, password: hashedPassword });
		await user.save();
		res.status(200).json({
			message: 'You have signed up successfully',
			token: getToken(user._id.toString()),
		});
	} catch (error) {
		next(error);
	}
};
