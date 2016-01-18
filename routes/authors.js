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

router.get('/new', function(req, res, next){
  res.render('add_author', {});
});

router.post('/new', function(req, res, next){
  knex('authors').insert({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    bio: req.body.bio,
    portrait_url: req.body.portrait_url
  }, 'id').then(function(id){
    res.redirect('/authors');
  })
});

module.exports = router;
