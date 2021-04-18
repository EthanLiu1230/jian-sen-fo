// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext } from '@feathersjs/feathers';
import { UploadsDto } from '../models/uploads.model';
import fs from 'fs';

/**
 * This is a **express only** Hook, it works together with multer middleware.
 * - It transforms multer `file` object to uploads schema.
 * - It interact with file system on CRUDing '/uploads',
 * @param options
 */
export default (options = {}): Hook => {
  return async (context: HookContext): Promise<HookContext> => {
    async function refineData(context: HookContext) {
      const files: Express.Multer.File[] = context.data;
      console.log('files -> ', files);
      const uploads: UploadsDto[] = files.map(({ path }) => ({
        path,
      }));
      context.data = context.id ? uploads[0] : uploads;
    }

    async function removeOldFiles(context: HookContext) {
      if (context.id) {
        let toRemove = await context.app.service('uploads').get(context.id);
        deleteFile(toRemove.path);
      } else {
        const records: any[] = await context.app
          .service('uploads')
          .find(context.params)
          .then((res: { data: any }) => res.data);

        await Promise.all(
          records.map((r) => {
            deleteFile(r.path);
          })
        );
      }
    }

    switch (context.method) {
      case 'create':
        await refineData(context);
        break;
      case 'remove':
        await removeOldFiles(context);
        break;
      case 'update':
        await refineData(context);
        await removeOldFiles(context);
        break;
      case 'patch':
        await refineData(context);
        await removeOldFiles(context);
    }
    return context;
  };
};

const deleteFile = (path: string) => {
  fs.unlink(path, (err) => {
    if (err) throw err;
  });
};
