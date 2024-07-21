import express from 'express';
const router = express.Router();

import auth from '../middleware/authentication.js';
import authPermission from '../middleware/authPermission.js';

import {
  createAddFund,
  getSingleAddFund,
  deleteSingleAddFund,
  deleteAllAddFunds,
  getAllAddFunds,
  deleteUserAddFund,
  editSingleAddFund,
  getAddFunds,
  editUserAddFund,
} from '../controllers/addFundController.js';

router
  .route('/')
  .get(auth, getAllAddFunds)
  .post(auth, createAddFund)
  .delete(auth, authPermission('admin', 'owner'), deleteAllAddFunds);

router.route('/allAddFund').get(getAddFunds);

router
  .route('/:id')
  .get(getSingleAddFund)
  .delete(auth, authPermission('admin', 'owner'), deleteSingleAddFund)
  .patch(auth, editSingleAddFund);

router.route('/:id/deleteUserAddFund').delete(auth, deleteUserAddFund);
router.route('/:id/editUserAddFund').patch(auth, editUserAddFund);

export default router;
