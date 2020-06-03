const mongoose = require('mongoose');



const itemSchema = new mongoose.Schema({
    name: String,
  weight: Number,
  category: String,
  user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Item', itemSchema);