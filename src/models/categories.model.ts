// See https://vincit.github.io/objection.js/#models
// for more of what you can do here.
import { JSONSchema, Model, RelationMappingsThunk } from 'objection';
import Knex from 'knex';
import { Application } from '../declarations';

class Categories extends Model {
  id!: number;
  name!: string;

  createdAt!: string;
  updatedAt!: string;

  parent?: Categories;
  children?: Categories[];

  static get tableName(): string {
    return 'categories';
  }

  static get jsonSchema(): JSONSchema {
    return {
      type: 'object',
      required: ['name'],

      properties: {
        id: { type: 'number' },
        name: { type: ['string'] },
        parentId: { type: ['integer', 'null'] },
      },
    };
  }

  $beforeInsert(): void {
    this.createdAt = this.updatedAt = new Date().toISOString();
  }

  $beforeUpdate(): void {
    this.updatedAt = new Date().toISOString();
  }

  static relationMappings: RelationMappingsThunk = () => ({
    parent: {
      relation: Model.BelongsToOneRelation,
      modelClass: Categories,
      join: { from: 'categories.parentId', to: 'categories.id' },
    },
    children: {
      relation: Model.HasManyRelation,
      modelClass: Categories,
      join: { from: 'categories.id', to: 'categories.parentId' },
    },
  });
}

export default function (app: Application): typeof Categories {
  const db: Knex = app.get('knex');

  db.schema
    .hasTable('categories')
    .then((exists) => {
      if (!exists) {
        db.schema
          .createTable('categories', (table) => {
            table.increments('id');

            table.string('name');

            table.timestamp('createdAt');
            table.timestamp('updatedAt');

            table.integer('parentId').references('categories.id');
          })
          .then(() => console.log('Created categories table')) // eslint-disable-line no-console
          .catch((e) => console.error('Error creating categories table', e)); // eslint-disable-line no-console
      }
    })
    .catch((e) => console.error('Error creating categories table', e)); // eslint-disable-line no-console

  return Categories;
}
