const mongoose =
    require("mongoose");

const classSchema =
    new mongoose.Schema({

  trainerId: {

    type: String,

    required: true,
  },

  title: {

    type: String,

    required: true,
  },

  schedule: {

    type: String,

    default: "",
  },

  startTime: {

    type: Date,

    required: true,
  },

  duration: {

    type: Number,

    required: true,
  },

  type: {

    type: String,

    enum: [

      "one_to_one",

      "one_to_many",
    ],

    required: true,
  },

  status: {

    type: String,

    enum: [

      "upcoming",

      "live",

      "completed",
    ],

    default: "upcoming",
  },

  createdAt: {

    type: Date,

    default: Date.now,
  }

});
module.exports =
    mongoose.model(
      "Class",
      classSchema,
    );