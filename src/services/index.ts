import { Application } from '../declarations';
import users from './users/users.service';
import categories from './categories/categories.service';
import contents from './contents/contents.service';
import uploads from './uploads/uploads.service';
// Don't remove this comment. It's needed to format import lines nicely.

export default function (app: Application): void {
  app.configure(users);
  app.configure(categories);
  app.configure(contents);
  app.configure(uploads);
}
