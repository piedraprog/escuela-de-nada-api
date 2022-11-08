//CONFIG OF SERVER
import 'module-alias/register';
import express from 'express';
import { morganMiddleware } from '@morgan';
import cors from 'cors';
import ListRoutes from '@routes/list.routes';
import config from '@config';


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
	res.json({ message: 'welcome to my application'});
});

//FUNCTIONAL ROUTES
app.use('/api', ListRoutes);

export default app;
