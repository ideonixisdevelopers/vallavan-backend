const Challenge =
  require("../models/Challenge");

const ChallengeWorkout = require("../models/challengeWorkout");

/// 🔥 GET ALL CHALLENGES
exports.getStudentChallenges =
  async (req, res) => {

    try {

      const challenges =
        await Challenge.find()
          .sort({
            createdAt: -1,
          });

      res.status(200).json({

        success: true,

        challenges,
      });

    } catch (e) {

      res.status(500).json({

        success: false,

        message: e.message,
      });
    }
  };

/// 🔥 GET SINGLE CHALLENGE
exports.getChallengeDetail =
  async (req, res) => {

    try {

      const challenge =
        await Challenge.findById(
          req.params.challengeId,
        );

      if (!challenge) {

        return res.status(404)
            .json({

          success: false,

          message:
              "Challenge not found",
        });
      }

      res.status(200).json({

        success: true,

        challenge,
      });

    } catch (e) {

      res.status(500).json({

        success: false,

        message: e.message,
      });
    }
  };

/// 🔥 UPDATE PROGRESS
exports.markDailyProgress =
  async (req, res) => {

    try {

      const { cals_burned } =
          req.body;

      const challenge =
        await Challenge.findById(
          req.params.challengeId,
        );

      if (!challenge) {

        return res.status(404)
            .json({

          success: false,

          message:
              "Challenge not found",
        });
      }

      challenge.calsBurned =
          cals_burned;

      challenge.progressPercent =
          Math.min(

        100,

        challenge.progressPercent +
            5,
      );

      await challenge.save();

      res.status(200).json({

        success: true,

        challenge,
      });

    } catch (e) {

      res.status(500).json({

        success: false,

        message: e.message,
      });
    }
  };

  exports.getChallengeWorkout =
async (req, res) => {

  try {

    const workout =
      await ChallengeWorkout.findOne({

        challengeId:
          req.params.challengeId,

        day:
          Number(req.params.day),
      });

    res.json({

      success: true,

      workout,
    });

  } catch (e) {

    res.status(500).json({

      success: false,
    });
  }
};