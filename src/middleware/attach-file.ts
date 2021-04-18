import { NextFunction, Request, Response } from 'express';

import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'public/uploads'),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
export const upload = multer({
  storage,
  limits: {
    fieldSize: 1e8, // Max field value size in bytes, here it's 100MB
    fileSize: 1e7, //  The max file size in bytes, here it's 10MB
    // files: the number of files
    // READ MORE https://www.npmjs.com/package/multer#limits
  },
  fileFilter(
    req: Request,
    file: Express.Multer.File,
    cb: multer.FileFilterCallback
  ) {
    checkFileType(file, cb);
  },
});

function checkFileType(
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) {
  const fileTypes = /jpeg|jpg|png|gif/;
  const extName = fileTypes.test(path.extname(file.originalname.toLowerCase()));
  const mimetype = fileTypes.test(file.mimetype);
  if (extName && mimetype) {
    return cb(null, true);
  } else {
    cb(Error('Image only.'));
  }
}

export default () => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (req.file) {
      req.body = req.file;
    }
    next();
  };
};
