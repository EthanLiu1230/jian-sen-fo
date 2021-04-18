// See https://vincit.github.io/objection.js/#models
// for more of what you can do here.
import { JSONSchema, Model } from 'objection';
import Knex from 'knex';
import { Application } from '../declarations';

class Uploads extends Model {
  path!: string;
  url!: string;

  createdAt!: string;
  updatedAt!: string;

  static get tableName(): string {
    return 'uploads';
  }

  static get jsonSchema(): JSONSchema {
    return {
      type: 'object',
      required: ['path', 'url'],

      properties: {
        path: { type: 'string' },
        url: { type: 'string' },
      },
    };
  }

  $beforeInsert(): void {
    this.createdAt = this.updatedAt = new Date().toISOString();
  }

  $beforeUpdate(): void {
    this.updatedAt = new Date().toISOString();
  }
}

export default function (app: Application): typeof Uploads {
  const db: Knex = app.get('knex');

  db.schema
    .hasTable('uploads')
    .then((exists) => {
      if (!exists) {
        db.schema
          .createTable('uploads', (table) => {
            table.increments('id');
            table.string('path');
            table.string('url');
            table.timestamp('createdAt');
            table.timestamp('updatedAt');
          })
          .then(() => console.log('Created uploads table')) // eslint-disable-line no-console
          .catch((e) => console.error('Error creating uploads table', e)); // eslint-disable-line no-console
      }
    })
    .catch((e) => console.error('Error creating uploads table', e)); // eslint-disable-line no-console

  return Uploads;
}
