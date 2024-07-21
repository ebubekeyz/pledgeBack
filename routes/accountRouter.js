import express from 'express';
const router = express.Router();

import auth from '../middleware/authentication.js';
import authPermission from '../middleware/authPermission.js';

import {
  createAccount,
  getSingleAccount,
  deleteSingleAccount,
  deleteAllAccounts,
  getAllAccounts,
  deleteUserAccount,
  editSingleAccount,
  getAccounts,
  editUserAccount,
} from '../controllers/accountController.js';

router
  .route('/')
  .get(auth, getAllAccounts)
  .post(auth, createAccount)
  .delete(auth, authPermission('admin', 'owner'), deleteAllAccounts);

router.route('/allAccount').get(getAccounts);

router
  .route('/:id')
  .get(getSingleAccount)
  .delete(auth, authPermission('admin', 'owner'), deleteSingleAccount)
  .patch(auth, editSingleAccount);

router.route('/:id/deleteUserAccount').delete(auth, deleteUserAccount);
router.route('/:id/editUserAccount').patch(auth, editUserAccount);

export default router;
