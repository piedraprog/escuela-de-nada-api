/* eslint-disable no-undef */
import { config } from 'dotenv';
config();


export default {
	baseUrl: process.env.APIURL || 'http://localhost:3000',
	mongodbURL: process.env.MONGODB_URI || 'mongodb://Localhost/EDN',
	jwtKey: process.env.JWT_PASS,
	env: process.env.ENVIRONMENT, 
	port: process.env.PORT,
	host: process.env.HOST
};
