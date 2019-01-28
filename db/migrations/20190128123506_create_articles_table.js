//migrating  articles table

exports.up = function(connection, Promise) {
  return connection.schema.createTable("articles", articlesTable => {
    console.log("creating articles table");

    articlesTable
      .increments("article_id")
      .primary()

    articlesTable.string("title").notNullable();

    articlesTable.text("body");

    articlesTable.integer("votes", 0);

    articlesTable.string("topic").references("topics.slug");

    articlesTable.string("created_by").references("users.username");

    articlesTable.timestamp("created_at").defaultTo(connection.fn.now());
  });
};

exports.down = function(connection, Promise) {
  return connection.schema.dropTable("articles");
};
