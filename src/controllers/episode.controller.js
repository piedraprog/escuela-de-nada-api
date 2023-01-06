import episode from '../models/episode';
import { infomsg } from '../libs/messages';
import { getPagination } from '../libs/getPagination';
import { logger }  from '../libs/logger';

export const listEpisodes = async(req,res) => {
	try {
		const { size, page } = Object.entries(req.body).length === 0 ? req.query : req.body;
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
		logger.error(error);
		res.status(500).json({
			message: error.message || infomsg.errorFetchingMomentList,
		});
	}
};


export const listEpByKey = async(req,res) => {
	try {
		let { size, page, key, param } = Object.entries(req.body).length === 0 ? req.query : req.body;
		const { limit, offset } = getPagination(size, page);
		let condition;

		if(!key) return  res.status(400).send({error: infomsg.contentEmpty});

		switch (key) {
		case 'location':
			condition = {location: {$regex : new RegExp(param), $options:'i'},};
			break;
		case 'category':
			condition = {category: {$regex : new RegExp(param), $options:'i'},};
			break;
		case 'platform':
			condition = {platform: {$regex : new RegExp(param), $options:'i'},};
			break;
		case 'published':
			condition = {yearPublished: param};
			break;
		default:
			return res.status(400).send({error: infomsg.errorInvalidKey});
		}

		const showEpisode = await episode.paginate(condition, { offset, limit });
		
		
		res.status(200).json({
			episode,
			info: {
				totalItems: showEpisode.totalDocs,
				totalPages: showEpisode.totalPages,
				currentPage: showEpisode.page - 1
			},
			results: showEpisode.docs,
		});

	} catch (error) {
		logger.error(error);
		res.status(500).json({
			message: error.message || infomsg.errorFetchingMomentList,
		});
	}
};


export const postEpisodes = async(req,res) => {
	if (!req.body.title || !req.body.epNumber) return res.status(400).send({ error: infomsg.contentEmpty });

	const { epNumber, title, published, platform, category,location } = req.body;

	try {
		const newEpisode = new episode({
			epNumber: epNumber,
			title: title,
			published: published,
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
		logger.error(error);
		res.status(500).json({
			message: infomsg.errorPosting,
			error: error.message 
		});
	}
};

