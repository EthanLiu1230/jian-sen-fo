import * as authentication from '@feathersjs/authentication';
import { consumeForm, removeFile } from '../../hooks/uploads-hooks';

// Don't remove this comment. It's needed to format import lines nicely.

const { authenticate } = authentication.hooks;

export default {
  before: {
    // all: [authenticate('jwt')],
    all: [],
    find: [],
    get: [],
    create: [consumeForm()],
    update: [removeFile(), consumeForm()],
    patch: [removeFile(), consumeForm()],
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
