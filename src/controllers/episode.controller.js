import episode from '@models/episode';
import { infomsg } from '@libs/messages';
import { getPagination } from '@libs/getPagination';

export const listEpisodes = async(req,res) => {
	try {
		const { size, page } = req.query;
		const { limit, offset } = getPagination(size, page);
		
		const showEpisodes = await episode.paginate({}, { offset, limit });

		res.status(200).json({
			info: {
				totalItems: showEpisodes.totalDocs,
				totalPages: showEpisodes.totalPages,
				currentPage: showEpisodes.page - 1,
				// nextPage: 'coming soon',
				// prevPage: 'coming soon'
			},
			results: showEpisodes.docs
		});

	} catch (error) {
		res.status(500).json({
			message: error.message || infomsg.errorFetchingMomentList,
		});
	}
};


export const listEpByKey = async(req,res) => {
	try {
		let { size, page, key, param } = req.body;
		const { limit, offset } = getPagination(size, page);
		let condition;

		if(!key) return  res.status(400).send({error: infomsg.contentEmpty});

		switch (key) {
		case 'location':
			condition = {location: {$regex : new RegExp(param), $options:'i'},};
			break;
		case 'category':
			condition = {cateogry: {$regex : new RegExp(param), $options:'i'},};
			break;
		case 'platform':
			condition = {platform: {$regex : new RegExp(param), $options:'i'},};
			break;
		case 'yearPublished':
			condition = {yearPublished: param};
			break;
		default:
			return res.status(400).send({error: infomsg.errorInvalidKey});
		}

		const showEpisode = await episode.paginate(condition, { offset, limit });
		
		
		res.status(200).json({
			info: {
				totalItems: episode.totalDocs,
				totalPages: episode.totalPages,
				currentPage: episode.page - 1
			},
			results: showEpisode.docs,
		});

	} catch (error) {
		res.status(500).json({
			message: error.message || infomsg.errorFetchingMomentList,
		});
	}
};


export const postEpisodes = async(req,res) => {
	if (!req.body?.name) return res.status(400).send({ message: infomsg.contentEmpty});

	const { epNumber, name, yearPublished, platform, category,location } = req.body;
	
	try {
		const newEpisode = new episode({
			id: epNumber,
			name: name,
			yearPublished: yearPublished,
			location: location,
			platform: platform,
			category: category
		});

		const episodeSaved = await newEpisode.save();
		res.json({
			info: infomsg.successRegistering,
			result: { 
				episodeSaved
			}
		});
	} catch (error) {
		res.status(500).json({
			message: infomsg.errorPosting,
			error: error.message 
		});
	}
};


export const deleteEpisodes = async(req,res) => {
	try {


		if(!req.body?.username) return res.status(400).json({
			error: infomsg.contentEmpty
		});
		
		const { username } = req.body;
		const exist = await episode.findOne({postedBy: username});

		if(!exist) return res.status(404).json({
			error: infomsg.userNotFound
		});


		const result = await episode.deleteMany({ postedBy: username});
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


