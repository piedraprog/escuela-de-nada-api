import Bestmoments from "../models/Bestmoments";
import { getPagination } from "../libs/getPagination";
//LIST
export const ListAllMoment = async (req, res) => {
  try {
    const { size, page, title } = req.query;
    const { limit, offset } = getPagination(size, page);
    
    const condition = title ? {
      title: {$regex : new RegExp(title), $options:"i"},
    }: {};

    
    const ShowMoments = await Bestmoments.paginate(condition, { offset, limit });

    res.json({
      totalItems: ShowMoments.totalDocs,
      Moments: ShowMoments.docs,
      totalPages: ShowMoments.totalPages,
      currentPage: ShowMoments.page - 1
    });

  } catch (error) {
    res.status(500).json({
      message: error.message || "something goes wrong",
    });
  }
};

export const ListOneMoment = async (req, res) => {
  const { id } = req.params;
  try {
    const TheMoment = await Bestmoments.findById(id);

    if (!TheMoment)
      return res.status(404).json({
        message: `Moment id ${id} does not exist`,
      });

    res.json(TheMoment);
  } catch (error) {
    res.status(500).json({
      message: error.message || "something goes wrong",
    });
  }
};

//INSERT
export const PostMoment = async (req, res) => {
  if (!req.body.title) {
    return res.status(400).send({ message: "Content cannot be empty" });
  }

  try {
    const newBestmoments = new Bestmoments({
      title: req.body.title,
      cap_name: req.body.cap_name,
      cap_num: req.body.cap_num,
      min_start: req.body.min_start,
      min_end: req.body.min_end,
      tags: req.body.tags,
    });

    const MomentSave = await newBestmoments.save();
    res.json(MomentSave);
  } catch (error) {
    res.status(500).json({
      message: error.message || "something goes wrong",
    });
  }
};

//UPDATE

//DELETE
export const DeleteMoment = async (req, res) => {
  try {
    await Bestmoments.findByIdAndDelete(req.params.id);
    res.json({
      message: "Moment Delete Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "something goes wrong",
    });
  }
};
