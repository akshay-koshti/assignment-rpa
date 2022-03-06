const mongoose = require('mongoose');

const walletSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      required: [true, 'The wallet must belong to a user'],
      ref: 'User',
      unique: [true, 'The user can have only single wallet']
    },
    totalAmount: {
      type: Number,
      default: 0
    }
  },
  {
    toObject: { virtuals: true },
    timestamps: true
  });

const Wallet = mongoose.model('Wallet', walletSchema);

module.exports = Wallet;