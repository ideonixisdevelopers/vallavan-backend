const ClassModel = require("../models/Class");

/// ✅ CREATE CLASS
exports.createClass =
  async (req, res) => {

    try {

      const {

        trainerId,

        title,

        schedule,

        startTime,

        duration,

        type,

        status,

      } = req.body;

      if (
        !trainerId ||
        !title ||
        !startTime ||
        !duration ||
        !type
      ) {

        return res.status(400).json({

          success: false,

          message:
            "Missing required fields",
        });
      }

      const newClass =
        await ClassModel.create({

          trainerId,

          title,

          schedule,

          startTime,

          duration,

          type,

          status:
            status ||
            "upcoming",
        });

      res.status(201).json({

        success: true,

        message:
          "Class created successfully",

        data:
          newClass,
      });

    } catch (error) {

      console.log(
        "CREATE CLASS ERROR =>",
        error,
      );

      res.status(500).json({

        success: false,

        message:
          error.message,
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

exports.completeClass =
  async (req, res) => {

    try {

      const { classId } =
        req.body;

      const updated =
        await ClassModel.findByIdAndUpdate(

          classId,

          {
            status:
              "completed",
          },

          { new: true }
        );

      res.json({

        success: true,

        message:
          "Class completed",

        data:
          updated,
      });

    } catch (error) {

      res.status(500).json({

        success: false,

        message:
          error.message,
      });
    }
  };

/// ✅ FETCH TRAINER CLASSES
exports.getTrainerClasses =
    async (req, res) => {

  try {

    const { trainerId } =
        req.params;

    const classes =
        await ClassModel.find({

      trainerId,

    }).sort({

      startTime: 1,
    });

    // ✅ AUTO COMPLETE
    for (const cls of classes) {

      if (
        cls.status === "live"
      ) {

        const endTime =
            new Date(

          cls.startTime.getTime() +

          cls.duration *
              60000
        );

        const now =
            new Date();

        if (
          now > endTime
        ) {

          cls.status =
              "completed";

          await cls.save();
        }
      }
    }

    // ✅ REFRESH UPDATED DATA
    const updatedClasses =
        await ClassModel.find({

      trainerId,

    }).sort({

      startTime: 1,
    });

    res.json({

      success: true,

      data:
          updatedClasses,
    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message:
          error.message,
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

    console.log("tessss", classes);


  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.markClassComplete =
  async (req, res) => {

    try {

      const updatedClass =
          await ClassModel
              .findByIdAndUpdate(

        req.params.id,

        {
          status: "complete",
        },

        {
          new: true,
        },
      );

      if (!updatedClass) {

        return res.status(404)
            .json({

          success: false,

          message:
              "Class not found",
        });
      }

      res.status(200).json({

        success: true,

        data: updatedClass,
      });

    } catch (e) {

      res.status(500).json({

        success: false,

        message: e.message,
      });
    }
  };
