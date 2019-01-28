exports.up = function(connection, Promise) {
  return connection.schema.createTable("comments", commentsTable => {
    console.log("creating comments table");

    commentsTable.increments("comment_id").primary();

    commentsTable.string("username").references("users.username");

    commentsTable.integer("article_id").references("articles.article_id");

    commentsTable.integer("votes", 0).notNullable();

    commentsTable.timestamp("created_at").defaultTo(connection.fn.now());

    commentsTable.text("body").notNullable();

    // commentsTable.text("articles").references("articles.article_id");
  });
};

exports.down = function(connection, Promise) {
  return connection.schema.dropTable("comments");
};
