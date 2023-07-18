import axios from 'axios';
import { IError } from '../types/IError';

export const getCoordinates = async (address: string): Promise<any> => {
	const encodedAddress = encodeURI(address);
	const response = await axios.get(
		`https://maps.googleapis.com/maps/api/geocode/json?key=${process.env.GOOGLE_API_KEY}&address=${encodedAddress}`,
	);
	if (response.data.status !== 'OK') {
		throw new IError(
			'Error in retrieving the co-ordinates of the location',
			500,
		);
	}
	return response.data.results[0];
};
