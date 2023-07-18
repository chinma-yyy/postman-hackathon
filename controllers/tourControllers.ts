import { RequestHandler } from 'express';
import { Authorized } from '../types/IAuthorized';
import tourModel from '../models/tour';
import * as chrono from 'chrono-node';
import { getCoordinates } from '../utils/location';

export const createTour: RequestHandler = async (
	req: Authorized,
	res,
	next,
) => {
	try {
		const { tourName, StartDate, EndDate } = req.body;
		const userId = req.user?.id;
		const tourStartDate = chrono.parseDate(StartDate);
		const tourEndDate = chrono.parseDate(EndDate);
		const newTour = new tourModel({
			tourName,
			tourStartDate,
			tourEndDate,
			tourist: userId,
		});
		await newTour.save();
		res.json({ message: 'Tour created successfully', tourId: newTour._id });
	} catch (error) {
		next(error);
	}
};

export const addPlaceToTour: RequestHandler = async (req, res, next) => {
	try {
		const { address, preference } = req.body;
		const tourId = req.query.tourId;
		const locationDetails = await getCoordinates(address);
		const placeDetails = {
			placeId: locationDetails.place_id,
			placeName: address,
			preference,
			formattedAddress: locationDetails.formatted_address,
		};
		const details = await tourModel.findById(tourId);
		const duplicateCheck = details?.places.filter((place) => {
			return place.placeId === locationDetails.place_id;
		});
		if (duplicateCheck) {
			return res.status(304).json({ message: 'The place already exists in the tour' });
		}
		await tourModel.findByIdAndUpdate(tourId, {
			$addToSet: {
				places: placeDetails,
			},
		});
		res.status(200).json({
			message: 'Place added successfully to the tour',
			placeDetails,
		});
	} catch (error) {
		next(error);
	}
};

export const removePlacefromTour: RequestHandler = async (req, res, next) => {
	try {
		const { placeId, tourId } = req.query;
		const details = await tourModel.findOneAndUpdate(
			{ _id: tourId },
			{
				$pull: {
					places: { placeId },
				},
			},
		);

		const placeDetails = details?.places.filter((place) => {
			return place.placeId === placeId;
		});
		if (placeDetails?.length === 0) {
			return res.status(304).json({ message: 'No place found in the tour' });
		}
		res.status(200).json({
			message: 'The place has been successfully removed',
			placeDetails,
		});
	} catch (error) {
		next(error);
	}
};

export const editPreferences: RequestHandler = async (req, res, next) => {
	try {
		const { tourId, placeId, preference } = req.body;

		const details = await tourModel.findById(tourId);
		if (!details) {
			return res.status(404).json({ message: 'Tour to be upated not found' });
		}
		const index = details?.places.findIndex((place) => {
			return place.placeId === placeId;
		});
		details.places[index || -1].preference = preference;
		await details.save();
	} catch (error) {
		console.log('edit preference error');
	}
};

export const getTourdetails: RequestHandler = async (req, res, next) => {
	try {
		const { tourId } = req.query;
		const details = await tourModel.findById(tourId);
		res.status(200).json({ details });
	} catch (error) {
		next(error);
	}
};
