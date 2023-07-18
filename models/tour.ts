import mongoose, { Schema, model } from 'mongoose';
import { ITour } from '../types/ITour';

const tourSchema = new Schema<ITour>({
	tourName: {
		type: String,
		required: true,
	},
	tourist: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'userModel',
		required: true,
	},
	tourStartDate: {
		type: Date,
	},
	tourEndDate: {
		type: Date,
	},
	places: [
		{
			type: {
				placeId: String,
				placeName: String,
				preference: Object,
			},
		},
	],
});

const tourModel = model<ITour>('tourModel', tourSchema);

export default tourModel;
