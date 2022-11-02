import  winston, { format }  from 'winston';

const myCustomslevels = {
	levels: {
		emerg: 0,
		error: 1,
		warn: 2,
		http: 3,
		info: 4,
		debug: 5
	}
};

export const buildProdLogger = winston.createLogger({
	levels: myCustomslevels.levels,
	format: format.combine(
		format.json(),
		format.timestamp(),
		format.errors({stack: true}),
	),
	defaultMeta: {
		service: 'api-edn',
	},
	transports: [
		new winston.transports.Console(),
		new winston.transports.File({
			level:'warn',
			filename:'src/logs/warningLog.log',
			format: format.combine(
				format.timestamp(),
				format.json()
			)
		}),
		new winston.transports.File({
			level:'error',
			filename:'src/logs/errorLog.log',
			format: format.combine(
				format.timestamp(),
				format.json(),
			)
		})
	],
});


