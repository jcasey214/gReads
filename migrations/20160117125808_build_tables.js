
exports.up = function(knex, Promise) {
  return knex.schema.createTable('genre', function(table){
    table.string('genre').unique();
  }).then(function(){
    return knex.schema.createTable('authors', function(table){
      table.increments();
      table.string('first_name');
      table.string('last_name');
      table.text('bio');
      table.string('portrait_url');
    });
  }).then(function(){
    return knex.schema.createTable('books', function(table){
      table.increments();
      table.string('title');
      table.string('genre').references('genre').inTable('genre');
      table.text('description');
      table.string('cover_url');
    });
  }).then(function(){
    return knex.schema.createTable('books_authors', function(table){
      table.integer('book_id').references('id').inTable('books');
      table.integer('author_id').references('id').inTable('authors');
    });
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('books_authors')
  .then(function(){
    return knex.schema.dropTable('books');
  }).then(function(){
    return knex.schema.dropTable('authors');
  }).then(function(){
    return knex.schmea.dropTable('genre');
  });
};
