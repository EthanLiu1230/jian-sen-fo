// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext } from '@feathersjs/feathers';

/**
 * This hook allow client to query field with `?filedName=null`.
 * Notice that 'null' is in format of String.
 *
 * @param queryField
 */
export default (queryField: string): Hook => {
  return async (context: HookContext): Promise<HookContext> => {
    const {
      params: { query = {} },
    } = context;
    if (query[queryField] === 'null') {
      query[queryField] = null;
    }
    context.params.query = query;
    return context;
  };
};
