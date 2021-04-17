import { NextFunction, Request, Response } from 'express';

import multer from 'multer';

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
});

export default () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return (req: Request, res: Response, next: NextFunction) => {
    if (req.files) {
      req.body = req.files;
    }
    next();
  };
};
