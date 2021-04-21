import { Hook, HookContext } from '@feathersjs/feathers';
import fs from 'fs';

/**
 * - consume file
 * - convert contentId to integer
 * - set context.data to uploads.model structure
 */
export const consumeForm = (options = {}): Hook => {
  return async (context: HookContext): Promise<HookContext> => {
    const { path } = context.data;
    const contentId: number = parseInt(context.data.contentId);
    context.data = { path, url: path.replace(/^public\//, ''), contentId };
    return context;
  };
};

export const removeFile = (options = {}): Hook => {
  return async (context: HookContext): Promise<HookContext> => {
    const records: any[] = await context.app
      .service('uploads')
      ._find(context.params)
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
