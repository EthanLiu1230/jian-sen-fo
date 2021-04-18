// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext } from '@feathersjs/feathers';

/**
 * This is a **express only** Hook, it works together with multer middleware.
 * - It transforms multer `file` object to uploads schema.
 * - It interact with file system to CRUD uploaded-files.
 *
 * @param options
 */
export default (options = {}): Hook => {
  return async (context: HookContext): Promise<HookContext> => {
    switch (context.method) {
      case 'create':
        // @ts-ignore
        context.data = context.data.map(({ path }) => ({ path }));
        break;
      case 'update':
    }
    return context;
  };
};
