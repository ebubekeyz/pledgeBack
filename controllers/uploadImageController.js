import util from 'util';
import { StatusCodes } from 'http-status-codes';
import fs from 'fs';
import BadRequestError from '../errors/badRequest.js';
import UnauthorizedError from '../errors/unauthorized.js';
import path from 'path';

const upload = async (req, res) => {
  if (!req.files) {
    throw new BadRequestError('No file uploaded');
  }

  const productImage = req.files.image;

  if (!productImage.mimetype.startsWith('image')) {
    throw new BadRequestError('Please upload image');
  }
  const imagePath = path.join(
    __dirname,
    '../public/uploads/' + `${productImage.name}`
  );

  await productImage.mv(imagePath);

  res
    .status(StatusCodes.OK)
    .json({ image: { src: `/uploads/${productImage.name}` } });
};

export default upload;
