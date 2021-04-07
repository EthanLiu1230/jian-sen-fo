// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext } from '@feathersjs/feathers';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (queryField: string): Hook => {
  return async (context: HookContext): Promise<HookContext> => {
    const {
      params: { query = {} },
    } = context;
    console.log('query={} -> ', query);
    if (query[queryField] === 'null') {
      query[queryField] = null;
    }
    context.params.query = query;
    return context;
  };
};
