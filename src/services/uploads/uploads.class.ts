import { ObjectionServiceOptions, Service } from 'feathers-objection';
import { Application } from '../../declarations';
import createApplication from '@feathersjs/feathers';

interface Options extends ObjectionServiceOptions {
  Model: any;
}

export class Uploads extends Service {
  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(options: Partial<Options>, app: Application) {
    const { Model, ...otherOptions } = options;

    super({
      ...otherOptions,
      model: Model,
    });
  }

  create(
    data: Partial<any> | Partial<any>[],
    params?: createApplication.Params
  ): Promise<any[] | any> {
    console.log('data -> ', data);
    return super.create(data, params);
  }
}
