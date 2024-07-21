import mongoose from 'mongoose';
import moment from 'moment';
import validator from 'validator';

const AccountSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    bank: {
      type: String,
      required: true,
    },
    accountNumber: {
      type: String,
      required: true,
    },
    pin: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      default: moment().format('YYYY-DD-MM'),
    },
    status: {
      type: String,
      enum: ['true', 'false'],
      default: 'false',
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Account', AccountSchema);
