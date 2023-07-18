import express from 'express';
import {
	addPlaceToTour,
	createTour,
	editPreferences,
	getTourdetails,
	removePlacefromTour,
} from '../controllers/tourControllers';
import { isAuth } from '../middlewares/Auth';

const tourRouter = express.Router();

tourRouter.post('/create', isAuth, createTour);

tourRouter.post('/addPlace', isAuth, addPlaceToTour);

tourRouter.delete('/removePlace', isAuth, removePlacefromTour);

tourRouter.patch('/editPreference', isAuth, editPreferences);

tourRouter.get('/details', isAuth, getTourdetails);

export default tourRouter;
