import { Application } from '../declarations';
import attachFile, { upload } from './attach-file';
// Don't remove this comment. It's needed to format import lines nicely.

// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
export default function (app: Application): void {
  app.use('/uploads', upload.single('file'), attachFile());
}
