const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
  title: String,
  description: String,
  level: { type: String, enum: ['beginner', 'intermediate', 'advanced'] },
  duration: Number, // minutes
  videoUrl: String,
  trainerId: mongoose.Schema.Types.ObjectId
}, { timestamps: true });

module.exports = mongoose.model('Workout', workoutSchema);
