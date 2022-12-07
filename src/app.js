//CONFIG OF SERVER
import express from 'express';
import { morganMiddleware } from './middleware/morgan.middleware';
import cors from 'cors';
import ListRoutes from './routes/list.routes';
import config from './config';


const app = express();

//SETTINGS
app.set('port', config.port);

//MIDDLEWARE
const corsOptions = {};
app.use(cors(corsOptions));

app.use(morganMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


//GENERAL
app.get('/', (req, res) => {
	res.redirect('/api');
});

app.get('/api', (req, res) => {
	res.status(200).json({
		character:{
			baseUrl:`${config.baseUrl}/api/character`
		},
		bestMoment:{
			baseUrl:`${config.baseUrl}/api/moments`
		},
		episodes:{
			baseUrl:`${config.baseUrl}/api/episodes`
		}
	});
});

app.get('/docs', (req, res) => {
	res.redirect('http://localhost:4200/home');
});

//FUNCTIONAL ROUTES
app.use('/api', ListRoutes);

export default app;
