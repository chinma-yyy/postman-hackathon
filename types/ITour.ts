import { Types } from 'mongoose';

export interface ITour {
	tourName: string;
	tourist: Types.ObjectId;
	places: Array<{
		placeId: string;
		placeName: string;
		preference: any;
	}>;
	tourStartDate: Date;
	tourEndDate: Date;
}
