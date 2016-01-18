var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

function combineAuthorsBooks(books, authors){
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
      var list = combineAuthorsBooks(books, authors);
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
  });
});

router.get('/:id/delete', function(req, res, next){
  var author;
  var books;
  knex('authors').where('id', req.params.id).then(function(data){
    author = data;
    knex('books').then(function(data){
      books = data;
      var list = combineAuthorsBooks(books, author);
      res.render('author_delete', {authors: list});
    });
  });
});

router.post('/:id/delete', function(req, res, next){
  knex('books_authors').delete().where('author_id', req.params.id).then(function(){
    knex('authors').delete().where('id', req.params.id).then(function(data){
      res.redirect('/authors');
    });
  });
});

router.get('/:id/edit', function(req, res, next){
  knex('authors').select().where('id', req.params.id).first().then(function(data){
    console.log(data);
    res.render('author_edit', {author: data});
  });
});

router.post('/:id/edit', function(req, res, next){
  knex('authors').update({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    bio: req.body.bio,
    portrait_url: req.body.portrait_url
  }).where('id', req.params.id).then(function(){
    res.redirect('/authors');
  });
});

module.exports = router;
