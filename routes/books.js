var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

function Books(){
  return knex('books');
}
function combineBooksAuthors(books, authors){
  books.map(function(book){
    book.authors = [];
    authors.map(function(author){
      if (author.book_id === book.id){
        book.authors.push(author.first_name + " " + author.last_name);
      }else{
        return;
      }
    });
    book.authorList = book.authors.join( " & ");
  });
  return books;
}
/* GET home page. */
router.get('/', function(req, res){
  var books;
  var authors;
  knex('books')/*.leftJoin('books_authors', {'books.id' : 'books_authors.book_id'})*/
  .then(function(data){
    books = data;
    knex('authors').join('books_authors', {'authors.id' : 'books_authors.author_id'}).then(function(data){
      authors = data;
      var list = combineBooksAuthors(books, authors);
      // res.json(list);
      res.render('books', {books: list});
    });
  });
});


module.exports = router;
