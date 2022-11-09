/* eslint-disable no-undef */
import { config } from 'dotenv';
config();


export default {
	baseUrl: 'localhost',
	mongodbURL: process.env.MONGODB_URI || 'mongodb://Localhost/EDN',
	jwtKey: process.env.JWT_PASS,
	env: process.env.ENVIRONMENT, 
	port: process.env.PORT
};
