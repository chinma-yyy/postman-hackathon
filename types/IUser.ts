import { Types } from 'mongoose';

export interface IUser {
	email: string;
	name: string;
	password: string;
	tours: Array<Types.ObjectId>;
}
