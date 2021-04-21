import * as authentication from '@feathersjs/authentication';
import allowQueryNull from '../../hooks/allow-query-null';
import { HookContext } from '@feathersjs/feathers';
import popInResult from '../../hooks/pop-in-result';
// Don't remove this comment. It's needed to format import lines nicely.

const { authenticate } = authentication.hooks;

export default {
  before: {
    all: [
      // authenticate('jwt')
    ],
    find: [allowQueryNull('parentId')],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },

  after: {
    all: [],
    find: [],
    get: [
      (context: HookContext) =>
        popInResult('children', 'categories', {
          parentId: context.result.id,
        })(context),
    ],
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
