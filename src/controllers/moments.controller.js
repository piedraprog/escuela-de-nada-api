import bestMoments from '@models/bestMoments';
import { getPagination } from '@libs/getPagination';
import { infomsg } from '@libs/messages';


//LIST
export const listAllMoment = async (req, res) => {
	try {
		const { size, page } = req.query;
		const { limit, offset } = getPagination(size, page);
		
		const ShowMoments = await bestMoments.paginate({}, { offset, limit });

		res.status(200).json({
			info: {
				totalItems: ShowMoments.totalDocs,
				totalPages: ShowMoments.totalPages,
				currentPage: ShowMoments.page - 1,
				// nextPage: 'coming soon',
				// prevPage: 'coming soon'
			},
			results: ShowMoments.docs
		});

	} catch (error) {
		res.status(500).json({
			message: error.message || infomsg.errorFetchingMomentList,
		});
	}
};


export const listByKey = async (req, res) => {

	try {
		let { size, page, key, param } = req.body;
		const { limit, offset } = getPagination(size, page);
		let condition;

		if(!key) return  res.status(400).send({error: infomsg.contentEmpty});

		switch (key) {
		case 'capNum':
			condition = {capNum: param,};
			break;
		case 'postedBy':
			condition = {postedBy: {$regex : new RegExp(param), $options:'i'},};
			break;		
		default:
			return res.status(400).send({error: infomsg.errorInvalidKey});
		}

		const ShowMoments = await bestMoments.paginate(condition, { offset, limit });
		
		
		res.status(200).json({
			info: {
				totalItems: ShowMoments.totalDocs,
				totalPages: ShowMoments.totalPages,
				currentPage: ShowMoments.page - 1
			},
			results: ShowMoments.docs,
		});

	} catch (error) {
		res.status(500).json({
			message: error.message || infomsg.errorFetchingMomentList,
		});
	}
};


//INSERT
export const postMoment = async (req, res) => {
	
	if (!req.body?.title) return res.status(400).send({ message: infomsg.contentEmpty});

	const { title, capName, capNum, minStart, minEnd, tags, postedBy } = req.body;
	
	try {
		const newbestMoments = new bestMoments({
			title:  title,
			capName:  capName,
			capNum:  capNum,
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
				capName: momentSaved.capName,
				capNum: momentSaved.capNum,
				minStart: momentSaved.minStart,
				minEnd: momentSaved.minEnd,
				tags: momentSaved.tags,
				postedBy: momentSaved.postedBy
			}
		});
	} catch (error) {
		res.status(500).json({
			message: infomsg.errorPosting,
			error: error.message 
		});
	}
};

// DELETE
export const deleteByUser = async (req, res) => {
	try {


		if(!req.body?.username) return res.status(400).json({
			error: infomsg.contentEmpty
		});
		
		const { username } = req.body;
		const exist = await bestMoments.findOne({postedBy: username});

		if(!exist) return res.status(404).json({
			error: infomsg.userNotFound
		});


		const result = await bestMoments.deleteMany({ postedBy: username});
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
