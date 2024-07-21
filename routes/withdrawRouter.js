import express from 'express';
const router = express.Router();

import auth from '../middleware/authentication.js';
import authPermission from '../middleware/authPermission.js';

import {
  createWithdraw,
  getSingleWithdraw,
  deleteSingleWithdraw,
  deleteAllWithdraws,
  getAllWithdraws,
  deleteUserWithdraw,
  editSingleWithdraw,
  getWithdraws,
  editUserWithdraw,
} from '../controllers/withdrawController.js';

router
  .route('/')
  .get(auth, getAllWithdraws)
  .post(createWithdraw)
  .delete(auth, authPermission('admin', 'owner'), deleteAllWithdraws);

router.route('/allPack').get(getWithdraws);

router
  .route('/:id')
  .get(getSingleWithdraw)
  .delete(auth, authPermission('admin', 'owner'), deleteSingleWithdraw)
  .patch(auth, editSingleWithdraw);

router.route('/:id/deleteUserWithdraw').delete(auth, deleteUserWithdraw);
router.route('/:id/editUserWithdraw').patch(auth, editUserWithdraw);

export default router;
