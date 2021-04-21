// See https://vincit.github.io/objection.js/#models
// for more of what you can do here.
import { JSONSchema, Model, RelationMappings } from 'objection';
import Knex from 'knex';
import { Application } from '../declarations';
import { Contents } from './contents.model';

export class Uploads extends Model {
  path!: string;
  url!: string;
  contentId?: number;

  createdAt!: string;
  updatedAt!: string;

  static get tableName(): string {
    return 'uploads';
  }

  static get jsonSchema(): JSONSchema {
    return {
      type: 'object',
      required: ['path', 'url', 'contentId'],

      properties: {
        path: { type: 'string' },
        url: { type: 'string' },
        contentId: { type: 'integer' },
      },
    };
  }

  $beforeInsert(): void {
    this.createdAt = this.updatedAt = new Date().toISOString();
  }

  $beforeUpdate(): void {
    this.updatedAt = new Date().toISOString();
  }

  static relationMappings: RelationMappings = {
    content: {
      relation: Model.BelongsToOneRelation,
      modelClass: Contents,
      join: { from: 'uploads.contentId', to: 'contents.id' },
    },
  };
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
            table.integer('contentId').references('contents.id').notNullable();

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
