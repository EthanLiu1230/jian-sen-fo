// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext } from '@feathersjs/feathers';
import fs from 'fs';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (options = {}): Hook => {
  return async (context: HookContext): Promise<HookContext> => {
    const records: any[] = await context.app
      .service('uploads')
      .find(context.params)
      .then((res: { data: any }) => res.data);

    await Promise.all(
      records.map((r) => {
        const { path } = r;
        fs.unlink(path, (err) => {
          if (err) throw err;
          console.log(`File: ${path} removed.`);
        });
      })
    );
    return context;
  };
};
