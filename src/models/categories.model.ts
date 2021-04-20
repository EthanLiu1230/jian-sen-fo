// See https://vincit.github.io/objection.js/#models
// for more of what you can do here.
import { JSONSchema, Model, RelationMappingsThunk } from 'objection';
import Knex from 'knex';
import { Application } from '../declarations';

class Categories extends Model {
  name!: string;
  level!: string;
  parentId?: number;

  createdAt!: string;
  updatedAt!: string;

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

  async setLevelByParentId() {
    if (!this.parentId) return;
    const parent = await Categories.query().findById(this.parentId);
    this.level = parent.level + 1;
  }

  async $beforeInsert() {
    this.createdAt = this.updatedAt = new Date().toISOString();
    await this.setLevelByParentId();
  }

  async $beforeUpdate() {
    this.updatedAt = new Date().toISOString();
    await this.setLevelByParentId();
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
            table.integer('level').defaultTo(0);

            table.timestamp('createdAt');
            table.timestamp('updatedAt');

            table.integer('parentId').references('categories.id');
            table.unique(['parentId', 'name']);
          })
          .then(() => console.log('Created categories table')) // eslint-disable-line no-console
          .catch((e) => console.error('Error creating categories table', e)); // eslint-disable-line no-console
      }
    })
    .catch((e) => console.error('Error creating categories table', e)); // eslint-disable-line no-console

  return Categories;
}
