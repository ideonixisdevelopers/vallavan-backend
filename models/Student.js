const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
   studentId: {
    type: String,
    unique: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  token: {
  type: String,
  default: null
},

  age: Number,

  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other']
  },

  studentType: String,
  goal: String,
  level: String,
  workoutType: String,

  preferredTime: {
    start: String,
    end: String
  },

  hasMedicalIssue: {
    type: Boolean,
    default: false
  },

  medicalIssue: {
    type: String,
    default: null
  },
  profileImage: {
  type: String,
  default: null
},
status: {
  type: String,
  default: "A"
}



}, { timestamps: true });

module.exports = mongoose.model('Student', studentSchema);
