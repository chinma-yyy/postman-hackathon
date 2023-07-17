import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import authRouter from './routes/authRoutes';
import { IError } from './types/IError';
import mongoose from 'mongoose';

const app = express();

app.use(express.json());

app.use(cors());

config();

const port = process.env.PORT;
const mongoDBURL = process.env.MONGODB_URL;

app.use('/test', (req, res) => {
	res.status(200).json({ message: 'Recieved' });
});

app.use('/auth', authRouter);

app.use(
	(error: IError, req: Request, res: Response, next: NextFunction): void => {
		console.error(error.message);
		res.status(error.code || 500).json({ message: error.message });
	},
);

app.listen(port, () => {
	console.log(`Server is running on ${port}`);
	mongoose
		.connect(mongoDBURL!)
		.then(() => {
			console.log('Connected to MongoDB');
		})
		.catch((err) => {
			console.log(err);
			console.error('Error connecting to MongoDB');
		});
});
