import  winston, { format }  from 'winston';

const myCustomslevels = {
	levels: {
		emerg: 0,
		error: 1,
		warn: 2,
		http: 3,
		info: 4,
		debug: 5
	},
	colors: {
		emerg: 'red',
		error: 'red',
		warn: 'yellow',
		http: 'blue',
		info: 'green',
		debug: 'white'
	}
};
winston.addColors(myCustomslevels.colors);


const logFormat = format.printf(({ level, message, timestamp, stack, file }) => {
	return `[${timestamp}][${file}] ${level}: ${stack || message}`;
});


export const buildDevLog = winston.createLogger({
	levels: myCustomslevels.levels,
	format: format.combine(
		format.colorize({
			all:true
		}),
		format.timestamp({
			format: 'YYYY-MM-DD HH:mm:ss'
		}),
		format.errors({stack: true}),
		logFormat
	),
	transports: [
		new winston.transports.Console()
	],
});
