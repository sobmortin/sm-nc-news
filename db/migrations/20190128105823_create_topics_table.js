exports.up = (connection, Promise) => connection.schema.createTable('topics', (topicsTable) => {
  topicsTable
    .string('slug')
    .primary()
    .unique();
  topicsTable.string('description').notNullable();
});

exports.down = (connection, Promise) => connection.schema.dropTable('topics');
