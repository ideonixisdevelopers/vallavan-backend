const ClassModel = require("../models/Class");

/// ✅ CREATE CLASS
exports.createClass = async (req, res) => {
  try {

    const { trainerId, title, startTime, duration, type } = req.body;

    if (!trainerId || !title || !startTime || !duration || !type) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    const newClass = await ClassModel.create({
      trainerId,
      title,
      startTime,
      duration,
      type,
    });

    res.status(201).json({
      success: true,
      message: "Class created successfully",
      data: newClass,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};
exports.startClass = async (req, res) => {
  try {

    const { classId } = req.body;

    const updated = await ClassModel.findByIdAndUpdate(
      classId,
      { status: "live" },
      { new: true }
    );

    res.json({
      success: true,
      message: "Class is LIVE",
      data: updated,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


/// ✅ FETCH TRAINER CLASSES
exports.getTrainerClasses = async (req, res) => {
  try {
    const { trainerId } = req.params;

    const classes = await ClassModel.find({ trainerId })
      .sort({ startTime: 1 });

    res.json({
      success: true,
      data: classes,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


/// ✅ FETCH ALL CLASSES (Student Dashboard)
exports.getAllClasses = async (req, res) => {
  try {
    const classes = await ClassModel.find()
      .sort({ startTime: 1 });

    res.json({
      success: true,
      data: classes,
    });

    console.log("tessss",classes);


  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
