import Account from '../models/Account.js';
import { StatusCodes } from 'http-status-codes';
import BadRequestError from '../errors/badRequest.js';
import UnauthorizedError from '../errors/unauthorized.js';

export const createAccount = async (req, res) => {
  req.body.user = req.user.userId;
  const account = await Account.create(req.body);
  res.status(StatusCodes.CREATED).json({ attributes: account });
};

export const getAllAccounts = async (req, res) => {
  let { user, date, name, accountNumber, bank, sort } = req.query;

  const queryObject = {
    user: req.user.userId,
  };

  let result = Account.find(queryObject);

  if (user) {
    result = Account.find({ user: req.user.userId, user: { $eq: user } });
  }

  if (sort === 'latest') {
    result = result.sort('-createdAt');
  }
  if (sort === 'oldest') {
    result = result.sort('createdAt');
  }

  if (sort === 'a-z') {
    result = result.sort('name');
  }
  if (sort === 'z-a') {
    result = result.sort('-name');
  }

  if (accountNumber) {
    result = Account.find({
      user: req.user.userId,
      accountNumber: { $lte: accountNumber },
    });
  }

  if (name) {
    result = Account.find(queryObject, {
      name: { $regex: name, $options: 'i' },
    });
  }
  if (bank) {
    result = Account.find(queryObject, {
      bank: { $regex: bank, $options: 'i' },
    });
  }

  if (date) {
    result = Account.find(queryObject, {
      date: { $regex: date, $options: 'i' },
    });
  }

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  const account = await result;

  const totalAccount = await Account.countDocuments();
  const numOfPage = Math.ceil(totalAccount / limit);

  res.status(StatusCodes.OK).json({
    account: account,
    meta: {
      pagination: { page: page, total: totalAccount, pageCount: numOfPage },
    },
  });
};

export const getAccounts = async (req, res) => {
  let { user, date, name, accountNumber, bank, sort } = req.query;

  let result = Account.find({});

  if (user) {
    result = Account.find({
      user: { $eq: user },
    });
  }

  if (sort === 'latest') {
    result = result.sort('-createdAt');
  }
  if (sort === 'oldest') {
    result = result.sort('createdAt');
  }

  if (sort === 'a-z') {
    result = result.sort('name');
  }
  if (sort === 'z-a') {
    result = result.sort('-name');
  }

  if (accountNumber) {
    result = Account.find({ accountNumber: { $lte: accountNumber } });
  }

  if (name) {
    result = Account.find({
      name: { $regex: name, $options: 'i' },
    });
  }

  if (date) {
    result = Account.find({
      date: { $regex: date, $options: 'i' },
    });
  }

  if (bank) {
    result = Account.find({
      bank: { $regex: bank, $options: 'i' },
    });
  }

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  const account = await result;

  const totalAccount = await Account.countDocuments();
  const numOfPage = Math.ceil(totalAccount / limit);

  res.status(StatusCodes.OK).json({
    account: account,
    meta: {
      pagination: { page: page, total: totalAccount, pageCount: numOfPage },
    },
  });
};

export const getSingleAccount = async (req, res) => {
  const { id: accountId } = req.params;
  const account = await Account.findOne({ _id: accountId });
  if (!account) {
    throw new BadRequestError(`Account with id ${accountId} does not exist`);
  }

  res.status(StatusCodes.OK).json({ Account: Account });
};

export const editSingleAccount = async (req, res) => {
  const { id: accountId } = req.params;
  const account = await Account.findOneAndUpdate({ _id: accountId }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!account) {
    throw new BadRequestError(`Account with id ${accountId} does not exist`);
  }
  res.status(StatusCodes.OK).json({ account: account });
};

export const editUserAccount = async (req, res) => {
  const { id: userId } = req.params;
  const account = await Account.findOneAndUpdate({ user: userId }, req.body);

  res.status(StatusCodes.OK).json({ account: account });
};

export const deleteSingleAccount = async (req, res) => {
  const { id: accountId } = req.params;
  const account = await Account.findByIdAndDelete({ _id: accountId });
  if (!account) {
    throw new BadRequestError(`Account with id ${accountId} does not exist`);
  }
  res.status(StatusCodes.OK).json({ msg: 'Account Deleted' });
};

export const deleteAllAccounts = async (req, res) => {
  const account = await Account.deleteMany();
  res.status(StatusCodes.OK).json({ msg: 'Account Deleted' });
};

export const deleteUserAccount = async (req, res) => {
  const { id: userId } = req.params;
  const account = await Account.deleteMany({ user: userId });

  res.status(StatusCodes.OK).json({ msg: 'Account successfully deleted' });
};

// module.exports = {
//   getAccounts,
//   createAccount,
//   deleteUserAccount,
//   getAllAccounts,
//   getSingleAccount,
//   editSingleAccount,
//   deleteSingleAccount,
//   deleteAllAccounts,
//   editUserAccount,
// };
