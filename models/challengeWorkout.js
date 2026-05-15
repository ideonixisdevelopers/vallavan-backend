const mongoose =
    require("mongoose");

const challengeWorkoutSchema =
    new mongoose.Schema({

        challengeId: String,

        day: Number,

        title: String,

        duration: Number,

        calories: Number,

        exercises: [

            {
                name: String,

                reps: String,

                rest: Number,
            },
        ],
    });

module.exports =
    mongoose.model(

        "ChallengeWorkout",

        challengeWorkoutSchema,
    );