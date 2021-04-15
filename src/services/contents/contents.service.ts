// Initializes the `contents` service on path `/contents`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Contents } from './contents.class';
import createModel from '../../models/contents.model';
import hooks from './contents.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    contents: Contents & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
  };

  // Initialize our service with any options it requires
  app.use('/contents', new Contents(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('contents');

  service.hooks(hooks);
}
