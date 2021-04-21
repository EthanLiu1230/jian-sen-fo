import { Hook, HookContext } from '@feathersjs/feathers';

export const popChildren = (options = {}): Hook => {
  return async (context: HookContext): Promise<HookContext> => {
    context.result.children = (
      await context.app.service('categories')._find({
        query: {
          parentId: context.result.id,
        },
      })
    ).data;
    return context;
  };
};
