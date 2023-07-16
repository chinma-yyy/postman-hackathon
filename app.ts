import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';

const app = express();

app.use(express.json());

app.use(cors());

config();

app.use('/test', (req, res) => {
	res.status(200).json({ message: 'Recieved' });
});

app.listen(3000, () => {
	console.log('Running on 3000');
});
