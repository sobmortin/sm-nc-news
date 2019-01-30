// migrating  articles table

exports.up = function (connection, Promise) {
  return connection.schema.createTable('articles', (articlesTable) => {
    articlesTable.increments('article_id').primary();

    articlesTable.string('title').notNullable();

    articlesTable.text('body');

    articlesTable.integer('votes').defaultTo(0);

    articlesTable.string('topic').references('topics.slug');

    articlesTable.string('username').references('users.username');

    articlesTable.timestamp('created_at').defaultTo(connection.fn.now());
  });
};

exports.down = function (connection, Promise) {
  return connection.schema.dropTable('articles');
};
