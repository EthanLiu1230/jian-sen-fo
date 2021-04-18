import * as authentication from '@feathersjs/authentication';
import consumeFile from '../../hooks/consume-file';
import removeFile from '../../hooks/remove-file';
// Don't remove this comment. It's needed to format import lines nicely.

const { authenticate } = authentication.hooks;

export default {
  before: {
    // all: [authenticate('jwt')],
    all: [],
    find: [],
    get: [],
    create: [consumeFile()],
    update: [removeFile(), consumeFile()],
    patch: [removeFile(), consumeFile()],
    remove: [removeFile()],
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
};

const deleteFromFileSystem = (path: string) => {};
