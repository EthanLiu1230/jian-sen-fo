// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext } from '@feathersjs/feathers';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (options = {}): Hook => {
  return async (context: HookContext): Promise<HookContext> => {
    const file: Express.Multer.File = context.data;
    console.log('context.data -> ', context.data);
    context.data = { path: file.path };
    console.log('context.data -> ', context.data);
    return context;
  };
};
