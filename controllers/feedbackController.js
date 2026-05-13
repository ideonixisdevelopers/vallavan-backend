const Feedback =
require("../models/Feedback");


/// ADD FEEDBACK
exports.addFeedback =
async (req, res) => {

  try {

    const {
      studentName,
      studentImage,
      rating,
      message,
      classId,
    } = req.body;

    const feedback =
    await Feedback.create({

      studentName,

      studentImage,

      rating,

      message,

      classId,
    });

    return res.status(200).json({

      success: true,

      data: feedback,
    });

  } catch (e) {

    console.log(e);

    return res.status(500).json({
      success: false,
    });
  }
};


/// GET FEEDBACKS
exports.getFeedbacks =
async (req, res) => {

  try {

    const feedbacks =
    await Feedback.find()

    .sort({
      createdAt: -1,
    });

    return res.status(200).json({

      success: true,

      data: feedbacks,
    });

  } catch (e) {

    return res.status(500).json({
      success: false,
    });
  }
};