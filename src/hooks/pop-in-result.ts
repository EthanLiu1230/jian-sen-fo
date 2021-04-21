import { Hook, HookContext } from '@feathersjs/feathers';

/**
 * usage:
 * ```ts
 * (context: HookContext) => popInResult(...args)(context)
 * ```
 * @param fieldName
 * @param location
 * @param query
 */
const popInResult = (fieldName: string, location: string, query: {}): Hook => {
  return async (context: HookContext): Promise<HookContext> => {
    context.result[fieldName] = (
      await context.app.service(location)._find({ query })
    ).data;
    return context;
  };
};
export default popInResult;
