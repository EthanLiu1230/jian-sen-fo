// See https://vincit.github.io/objection.js/#models
// for more of what you can do here.
import { JSONSchema, Model } from 'objection';
import Knex from 'knex';
import { Application } from '../declarations';

class Contents extends Model {
  title!: string;
  subtitle?: string;
  body?: string;

  createdAt!: string;
  updatedAt!: string;

  static get tableName(): string {
    return 'contents';
  }

  static get jsonSchema(): JSONSchema {
    return {
      type: 'object',
      required: ['title'],

      properties: {
        title: { type: 'string' },
        subtitle: { type: ['string', 'null'] },
        body: { type: ['string', 'null'] },
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

export default function (app: Application): typeof Contents {
  const db: Knex = app.get('knex');

  db.schema
    .hasTable('contents')
    .then((exists) => {
      if (!exists) {
        db.schema
          .createTable('contents', (table) => {
            table.increments('id');

            table.string('title');
            table.string('subtitle');
            table.text('body');

            table.timestamp('createdAt');
            table.timestamp('updatedAt');
          })
          .then(() => console.log('Created contents table')) // eslint-disable-line no-console
          .catch((e) => console.error('Error creating contents table', e)); // eslint-disable-line no-console
      }
    })
    .catch((e) => console.error('Error creating contents table', e)); // eslint-disable-line no-console

  return Contents;
}
