// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext } from '@feathersjs/feathers';
import { UploadsDto } from '../models/uploads.model';
import fs from 'fs';
import { BadRequest } from '@feathersjs/errors';

/**
 * This is a **express only** Hook, it works together with multer middleware.
 * - It transforms multer `file` object to uploads schema.
 * - It interact with file system on CRUDing '/uploads',
 * - do not support 'patch' method for '/uploads' service
 * @param options
 */
export default (options = {}): Hook => {
  return async (context: HookContext): Promise<HookContext> => {
    async function getUploadById() {
      return await context.app.service('uploads').get(context.id);
    }

    function setUploadsData() {
      const files: Express.Multer.File[] = context.data;
      const uploads: UploadsDto[] = files.map(({ path }) => ({
        path,
      }));
      context.data = uploads;
    }

    switch (context.method) {
      case 'create':
        setUploadsData();
        break;
      case 'remove':
        let toRemove = await getUploadById();
        deleteFile(toRemove.path);
        break;
      case 'update':
        let toUpdate = await getUploadById();
        deleteFile(toUpdate.path);
        setUploadsData();
        context.data = context.data[0];
        break;
      case 'patch':
        setUploadsData();
        // delete unwanted files added by multer
        const uploads: UploadsDto[] = context.data;
        await Promise.all(uploads.map(({ path }) => deleteFile(path)));

        throw new BadRequest('Patch request is not permitted.');
    }
    return context;
  };
};

const deleteFile = (path: string) => {
  fs.unlink(path, (err) => {
    if (err) throw err;
  });
};
