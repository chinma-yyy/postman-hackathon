import mongoose, { Schema, model } from 'mongoose';
import { IUser } from '../types/IUser';

const userSchema = new Schema<IUser>({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
		index: true,
	},
	password: {
		type: String,
		required: true,
	},
	tours: [{ type: mongoose.Schema.Types.ObjectId }],
});

const userModel = model('userModel', userSchema);

export default userModel;
