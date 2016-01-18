var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

function combineBooksAuthors(books, authors){
  authors.map(function(author){
    author.books = [];
    books.map(function(book){
      if (author.id === book.author_id){
        author.books.push(book.title);
      }else{
        return;
      }
    });
    author.bookList = author.books.join('\n');
  });
  return authors;
}
/* GET home page. */
router.get('/', function(req, res, next) {
  var authors;
  var books;
  knex('authors').then(function(data){
    authors = data;
    knex('books').join('books_authors', {'books_authors.book_id' : 'books.id'}).then(function(data){
      books = data;
      var list = combineBooksAuthors(books, authors);
      res.render('authors', {authors: list});
    });
  });
});

module.exports = router;
