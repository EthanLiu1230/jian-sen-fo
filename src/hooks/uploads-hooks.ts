import { Hook, HookContext } from '@feathersjs/feathers';
import fs from 'fs';

export const consumeFile = (options = {}): Hook => {
  return async (context: HookContext): Promise<HookContext> => {
    const { path } = context.data;
    context.data = { path, url: path.replace(/^public\//, '') };
    return context;
  };
};
export const removeFile = (options = {}): Hook => {
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
