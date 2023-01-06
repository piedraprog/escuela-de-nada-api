import bestMoments from '../models/bestMoments';
import { getPagination } from '../libs/getPagination';
import { infomsg } from '../libs/messages';
import { logger } from '../libs/logger';

//LIST
export const listAllMoment = async (req, res) => {
	try {
		const { size, page } = Object.entries(req.body).length === 0 ? req.query : req.body;
		const { limit, offset } = getPagination(size, page);
		
		const ShowMoments = await bestMoments.paginate({}, { offset, limit, populate: 'episode'});

		res.status(200).json({
			info: {
				totalItems: ShowMoments.totalDocs,
				totalPages: ShowMoments.totalPages,
				currentPage: ShowMoments.page - 1,
				// nextPage: 'coming soon',
				// prevPage: 'coming soon'
			},
			results: ShowMoments.docs.map(result =>{

				const {title, episode, minStart, minEnd, tags, postedBy, createdAt} = result;
				const { epNumber, name, published, location, platform, category} = episode;
				return {
					title,
					// episode,
					episode: {
						epNumber,
						name,
						published,
						location,
						platform,
						category
					}, 
					minStart, 
					minEnd, 
					tags, 
					postedBy, 
					createdAt
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


export const listByKey = async (req, res) => {
	
	try {
		let condition;
		let { size, page, key, param } = Object.entries(req.body).length === 0 ? req.query : req.body;
		const { limit, offset } = getPagination(size, page);

		if(!key) return  res.status(400).send({error: infomsg.contentEmpty});

		switch (key) {
		case 'postedBy':
			condition = {postedBy: {$regex : new RegExp(param), $options:'i'},};
			break;		
		default:
			return res.status(400).send({error: infomsg.errorInvalidKey});
		}

		const ShowMoments = await bestMoments.paginate(condition, { offset, limit, populate: 'episode' });
		
		res.status(200).json({
			info: {
				totalItems: ShowMoments.totalDocs,
				totalPages: ShowMoments.totalPages,
				currentPage: ShowMoments.page - 1
			},
			results: ShowMoments.docs.map(result =>{
				const {title, episode, minStart, minEnd, tags, postedBy, createdAt} = result;
				const { epNumber, name, published, location, platform, category} = episode;

				return {
					title,
					minStart, 
					minEnd, 
					tags, 
					postedBy, 
					createdAt,
					episode: {
						epNumber,
						name,
						published,
						location,
						platform,
						category
					}, 
				};
			}),
		});

	} catch (error) {
		logger.error(error);
		res.status(500).json({
			message: error.message || infomsg.errorFetchingMomentList,
		});
	}
};


//INSERT
export const postMoment = async (req, res) => {
	
	if (!req.body?.title) return res.status(400).send({ message: infomsg.contentEmpty});

	const { title, episode, minStart, minEnd, tags, postedBy } = req.body;
	
	try {
		const newbestMoments = new bestMoments({
			title:  title,
			episode: episode,
			minStart:  minStart,
			minEnd:  minEnd,
			tags:  tags,
			postedBy: postedBy
		});

		const momentSaved = await newbestMoments.save();
		res.json({
			info: infomsg.successRegistering,
			result: { 
				title: momentSaved.title,
				episode: momentSaved.episode,
				minStart: momentSaved.minStart,
				minEnd: momentSaved.minEnd,
				tags: momentSaved.tags,
				postedBy: momentSaved.postedBy
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

// // DELETE
// export const deleteByUser = async (req, res) => {
// 	try {


// 		if(!req.body?.username) return res.status(400).json({
// 			error: infomsg.contentEmpty
// 		});
		
// 		const { username } = req.body;
// 		const exist = await bestMoments.findOne({postedBy: username});

// 		if(!exist) return res.status(404).json({
// 			error: infomsg.userNotFound
// 		});


// 		const result = await bestMoments.deleteMany({ postedBy: username});
// 		res.status(200).json({
// 			info: {
// 				opResult: infomsg.successDeleting,
// 				itemsDeleted: result.deletedCount
// 			}
// 		});

// 	} catch (error) {
// 		logger.error(error);
// 		res.status(500).json({
// 			message: infomsg.errorDeleting,
// 			error: error.message ,
// 		});

// 	}
// };
