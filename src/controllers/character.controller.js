import character from '../models/characters';
import { infomsg } from '../libs/messages';
import { getPagination } from '../libs/getPagination';
import { logger } from '../libs/logger';

export const listCharacters = async(req, res) =>{

	try {
		const { size, page } = Object.entries(req.body).length === 0 ? req.query : req.body;
		const { limit, offset } = getPagination(size, page);
		
		const ShowCharacters = await character.paginate({}, { offset, limit, populate: 'bornEp' });

		res.status(200).json({
			info: {
				totalItems: ShowCharacters.totalDocs,
				totalPages: ShowCharacters.totalPages,
				currentPage: ShowCharacters.page - 1,
				// nextPage: 'coming soon',
				// prevPage: 'coming soon'
			},
			results: ShowCharacters.docs.map(result=>{

				const {_id , name, bornEp, status, createBy} = result;
				const { epNumber, title, published, location, platform, category} = bornEp;

				return {
					id: _id,
					name,
					status,
					createBy,
					bornEp: {
						epNumber, 
						title, 
						published, 
						location, 
						platform, 
						category
					}
				};
			})
		});

	} catch (error) {
		logger.error(error);
		res.status(500).json({
			message: error.message || infomsg.errorFetchingMomentList,
		});
	}
};

export const listCharBykey = async(req, res) => {
	try {
		let condition;
		let { size, page, key, param } = Object.entries(req.body).length === 0 ? req.query : req.body;
		const { limit, offset } = getPagination(size, page);

		if(!key) return  res.status(400).send({error: infomsg.contentEmpty});

		switch (key) {
		case 'bornEp':
			condition = {bornEp: param};
			break;
		case 'createBy':
			condition = {createBy: {$regex : new RegExp(param), $options:'i'},};
			break;		
		default:
			return res.status(400).send({error: infomsg.errorInvalidKey});
		}

		const ShowCharacters = await character.paginate(condition, { offset, limit, populate: 'bornEp' });
		
		
		res.status(200).json({
			info: {
				totalItems: ShowCharacters.totalDocs,
				totalPages: ShowCharacters.totalPages,
				currentPage: ShowCharacters.page - 1
			},
			results: ShowCharacters.docs.map(result=>{

				const {_id , name, bornEp, status, createBy} = result;
				const { epNumber, title, published, location, platform, category} = bornEp;

				return {
					id: _id,
					name,
					status,
					createBy,
					bornEp: {
						epNumber, 
						title, 
						published, 
						location, 
						platform, 
						category
					}
				};
			})
		});

	} catch (error) {
		logger.error(error);
		res.status(500).json({
			message: error.message || infomsg.errorFetching,
		});
	}
};


export const postCharacters = async(req, res) =>{

	if (!req.body) return res.status(400).send({ message: infomsg.contentEmpty});

	const {  name, bornEp, status, createBy} = req.body;
	
	try {
		const newCharacter = new character({
			name: name,
			bornEp: bornEp,
			status: status,
			createBy: createBy
		});

		const characterSaved = await newCharacter.save();
		res.json({
			info: infomsg.successRegistering,
			result: { 
				characterSaved
			}
		});
	} catch (error) {
		logger.error(error);
		res.status(500).json({
			message: infomsg.errorPosting,
			error: error.message 
		});
	}
};

