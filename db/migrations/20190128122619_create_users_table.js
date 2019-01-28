exports.up = function(connection, Promise) {
  return connection.schema.createTable("users", usersTable => {
    usersTable
      .string("username")
      .primary()
      .unique();
    usersTable.string("name").notNullable();
    usersTable.string("avatar_url").notNullable();
  });
};

exports.down = function(connection, Promise) {
  return connection.schema.dropTable("users");
};
