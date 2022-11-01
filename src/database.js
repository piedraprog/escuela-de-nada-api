import mongoose from 'mongoose';
import config from '@config';
import { logger } from '@logger';

const env = "database.js";

(async() => {
    try {
        const db = await mongoose.connect(config.mongodbURL,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        })
        logger.info({message:`database is connect to: ${db.connection.name}`, file: env});
    } catch (error) {
        logger.error(error);
    }
    
})();
