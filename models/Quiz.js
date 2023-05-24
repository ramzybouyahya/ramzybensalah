const mongoose = require('mongoose');

const QuizSchema = new mongoose.Schema({
      name: {
          type: String,
          required: true
      },
      email: {
          type: String,
          required: true
      },
      score: {
          type: String,
          required: true
      }
  });
  
  module.exports = mongoose.model('quiz', QuizSchema);