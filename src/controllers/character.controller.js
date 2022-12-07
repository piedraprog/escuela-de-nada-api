import character from '../models/characters';
import { infomsg } from '../libs/messages';
import { getPagination } from '../libs/getPagination';


export const listCharacters = async(req, res) =>{
	try {
		const { size, page } = req.query;
		const { limit, offset } = getPagination(size, page);
		
		const ShowCharacters = await character.paginate({}, { offset, limit });

		res.status(200).json({
			info: {
				count: ShowCharacters.totalDocs,
				pages: ShowCharacters.totalPages,
				currentPage: ShowCharacters.page - 1,
				// nextPage: 'coming soon',
				// prevPage: 'coming soon'
			},
			results: ShowCharacters.docs
		});

	} catch (error) {
		res.status(500).json({
			message: error.message || infomsg.errorFetchingMomentList,
		});
	}
};

export const listCharBykey = async(req, res) => {
	try {
		let condition;
		let { size, page, key, param } = req.body;
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

		const ShowCharacters = await character.paginate(condition, { offset, limit });
		
		
		res.status(200).json({
			info: {
				totalItems: ShowCharacters.totalDocs,
				totalPages: ShowCharacters.totalPages,
				currentPage: ShowCharacters.page - 1
			},
			results: ShowCharacters.docs,
		});

	} catch (error) {
		res.status(500).json({
			message: error.message || infomsg.errorFetching,
		});
	}
};


export const postCharacters = async(req, res) =>{

	if (!req.body) return res.status(400).send({ message: infomsg.contentEmpty});

	const {  name, bornEp, status, createBy, epAparition} = req.body;
	
	try {
		const newCharacter = new character({
			name: name,
			bornEp: bornEp,
			epAparition:epAparition,
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
		res.status(500).json({
			message: infomsg.errorPosting,
			error: error.message 
		});
	}
};

export const deleteCharacter = async(req, res) => {
	try {
		if(!req.body?.createBy) return res.status(400).json({
			error: infomsg.contentEmpty
		});
		
		const { createBy } = req.body;
		// console.log(createBy)
		const exist = await character.findOne({createBy: createBy});

		if(!exist) return res.status(404).json({
			error: infomsg.userNotFound
		});


		const result = await character.deleteMany({ createBy: createBy});
		res.status(200).json({
			info: {
				opResult: infomsg.successDeleting,
				itemsDeleted: result.deletedCount
			}
		});

	} catch (error) {

		res.status(500).json({
			message: infomsg.errorDeleting,
			error: error.message ,
		});

	}
};