var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

function combineAuthorsBooks(books, authors){
  authors.map(function(author){
    author.books = [];
    author.bookObjects = [];
    books.map(function(book){
      if (author.id === book.author_id){
        author.books.push(book.title);
        author.bookObjects.push(book);
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
  knex('books').then(function(data){
    res.render('add_author', {books: data});
  });
});

router.post('/new', function(req, res, next){
  if(Array.isArray(req.body.books)){
    knex('authors').insert({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      bio: req.body.bio,
      portrait_url: req.body.portrait_url
    }, 'id').then(function(id){
      req.body.books.map(function(book){
          knex('books_authors').insert({
            book_id: book,
            author_id: id[0]
          }).then(function(){
            return;
          });
      });
    }).then(function(){
      res.redirect('/authors');
    });
  }else{
    knex('authors').insert({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      bio: req.body.bio,
      portrait_url: req.body.portrait_url
    }, 'id').then(function(id){
      knex('books_authors').insert({
        book_id: req.body.books,
        author_id: id[0]
      }).then(function(){
        res.redirect('/authors');
      });
    });
  }
});

router.get('/:id/delete', function(req, res, next){
  var author;
  var books;
  knex('authors').where('id', req.params.id).then(function(data){
    author = data;
    knex('books').join('books_authors', {'books.id' : 'books_authors.book_id'}).then(function(data){
      books = data;
      var list = combineAuthorsBooks(books, author);
      console.log(list);
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
  var authors;
  var books;
  knex('authors').select().where('id', req.params.id).first().then(function(data){
    author = data;
    knex('books').then(function(data){
      books = data;
    }).then(function(){
      res.render('author_edit', {author: author, books : books});
    });
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

router.get('/:id', function(req, res, next){
  var books;
  var authors;
  knex('authors').where('id', req.params.id).then(function(data){
    console.log(data);
    authors = data;
    knex('books').join('books_authors', {'books.id' : 'books_authors.book_id'}).then(function(data){
      books = data;
      combineAuthorsBooks(books, authors);
      res.render('author', {authors: authors, books: books});
    });
  });
});

module.exports = router;
