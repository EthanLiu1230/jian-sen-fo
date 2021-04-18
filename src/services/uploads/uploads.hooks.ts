import * as authentication from '@feathersjs/authentication';
import { HookContext } from '@feathersjs/feathers';
// Don't remove this comment. It's needed to format import lines nicely.

const { authenticate } = authentication.hooks;

export default {
  before: {
    // all: [authenticate('jwt')],
    find: [],
    get: [],
    create: [
      async (context: HookContext): Promise<HookContext> => {
        // @ts-ignore
        context.data = context.data.map(({ path }) => ({ path }));
        return context;
      },
    ],
    update: [
      async (context: HookContext): Promise<HookContext> => {
        // @ts-ignore
        context.data = context.data.map(({ path }) => ({ path }));
        return context;
      },
    ],
    patch: [],
    remove: [],
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
