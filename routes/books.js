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
router.get('/', function(req, res, next){
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

router.get('/:id/delete', function(req, res, next){
  knex('books').where('id', req.params.id).then(function(data){
    books = data;
    knex('authors').join('books_authors', {'authors.id' : 'books_authors.author_id'}).then(function(data){
      authors = data;
      var list = combineBooksAuthors(books, authors);
      res.render('book_delete', {books: list});
    });
  });
});

router.post('/:id/delete', function(req, res, next){
  knex('books_authors').delete().where('book_id', req.params.id).then(function(){
    knex('books').delete().where('id', req.params.id).then(function(){
      res.redirect('/books');
    });
  });
});

router.get('/new', function(req, res, next){
  knex('authors').select().then(function(authors){
    console.log(authors);
    res.render('addBook', {authors: authors});
  });
});

router.post('/new', function(req, res, next){
  console.log(req.body.authors);
  knex('books').insert({
    title: req.body.title,
    genre: req.body.genre,
    description: req.body.description,
    cover_url: req.body.cover_url
  }, 'id').then(function(id){
    console.log(id);
    console.log(id.value);
    console.log(parseInt(id.value));
    knex('books_authors').insert({
      book_id: id[0],
      author_id: req.body.authors
    }).then(function(){
    res.redirect('/books');
  });
});
});


module.exports = router;
