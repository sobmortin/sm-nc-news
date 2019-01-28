exports.up = (connection, Promise) => {
  console.log("creating topics table");
  return connection.schema.createTable("topics", topicsTable => {
    topicsTable.string("slug").primary();
    topicsTable.string("description").notNullable();
  });
};

exports.down = (connection, Promise) => {
  return connection.schema.dropTable("topics");
};
