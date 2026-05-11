const mongoose =
    require("mongoose");

const classSchema =
    new mongoose.Schema({

  trainerId: {

    type: String,

    required: true,

    trim: true,
  },

  title: {

    type: String,

    required: true,

    trim: true,
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

  totalStudents: {

    type: Number,

    default: 0,
  },

  joinedStudents: [

    {

      type: String,
    },
  ],

  meetingId: {

    type: String,

    default: "",
  },

  thumbnail: {

    type: String,

    default:
        "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1200&q=80",
  },

  createdAt: {

    type: Date,

    default: Date.now,
  },

  updatedAt: {

    type: Date,

    default: Date.now,
  },

});


/// ✅ AUTO UPDATE TIME
classSchema.pre(

  "save",

  function (next) {

    this.updatedAt =
        Date.now();

    next();
  }
);

module.exports =
    mongoose.model(
      "Class",
      classSchema,
    );