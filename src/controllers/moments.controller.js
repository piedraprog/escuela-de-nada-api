import bestMoments from '@models/bestMoments';
import { getPagination } from '@libs/getPagination';


//LIST
export const ListAllMoment = async (req, res) => {
	try {
		const { size, page, title } = req.query;
		const { limit, offset } = getPagination(size, page);
		
		const condition = title ? {
			title: {$regex : new RegExp(title), $options:"i"},
		}: {};

		
		const ShowMoments = await bestMoments.paginate(condition, { offset, limit });

		res.json({
			totalItems: ShowMoments.totalDocs,
			Moments: ShowMoments.docs,
			totalPages: ShowMoments.totalPages,
			currentPage: ShowMoments.page - 1
		});

	} catch (error) {
		res.status(500).json({
			message: error.message || 'something goes wrong',
		});
	}
};

export const ListOneMoment = async (req, res) => {
	const { id } = req.params;
	try {
		const TheMoment = await bestMoments.findById(id);

		if (!TheMoment)
			return res.status(404).json({
				message: `Moment id ${id} does not exist`,
			});

		res.json(TheMoment);
	} catch (error) {
		res.status(500).json({
			message: error.message || 'something goes wrong',
		});
	}
};

//INSERT
export const PostMoment = async (req, res) => {
	if (!req.body.title) {
		return res.status(400).send({ message: 'Content cannot be empty'});
	}

	try {
		const newbestMoments = new bestMoments({
			title: req.body.title,
			capName: req.body.cap_name,
			capNum: req.body.cap_num,
			minStart: req.body.min_start,
			minEnd: req.body.min_end,
			tags: req.body.tags,
			postedBy:'jose'
		});
		const MomentSave = await newbestMoments.save();
		res.json(MomentSave);
	} catch (error) {
		res.status(500).json({
			message: error.message || 'something goes wrong',
		});
	}
};


//DELETE
export const DeleteMoment = async (req, res) => {
	try {
		await bestMoments.findByIdAndDelete(req.params.id);
		res.json({
			message: 'Moment Delete Successfully',
		});
	} catch (error) {
		res.status(500).json({
			message: error.message || 'something goes wrong',
		});
	}
};
