const mongoose = require('mongoose');

const trainerSchema = new mongoose.Schema({
    trainerId: {
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

  qualification: String,

  trainerType: {
    type: String,
    enum: ['Online Trainer', 'Offline Trainer', 'Hybrid']
  },

  availability: String,

  specializations: [
    {
      type: String
    }
  ],

  certified: {
    type: Boolean,
    default: false
  },

  profileImage: {
    type: String,
    default: null
  },

  certificate: {
    type: String,
    default: null
  },
  
  status: {
    type: String,
    enum: ['pending', 'active', 'rejected'],
    default: 'pending'   // 👈 very important
  }

}, { timestamps: true });

module.exports = mongoose.model('Trainer', trainerSchema);
