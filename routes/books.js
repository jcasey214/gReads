var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

function combineBooksAuthors(books, authors){
  books.map(function(book){
    book.authors = [];
    book.authorObjects = [];
    authors.map(function(author){
      if (author.book_id === book.id){
        book.authorObjects.push(author);
        book.authors.push(author.first_name + " " + author.last_name);
      }else{
        return;
      }
      console.log(book.authors);
    });
    console.log(book.authorObjects);
    book.authorList = book.authors.join( " & ");
  });
  return books;
}
/* GET home page. */
router.get('/', function(req, res, next){
  var books;
  var authors;
  knex('books').then(function(data){
      books = data;
      knex('authors').join('books_authors', {'authors.id' : 'books_authors.author_id'}).then(function(data){
        authors = data;
        var list = combineBooksAuthors(books, authors);
        // res.json(list);
        res.render('books', {books: list});
    });
  });
});

router.post('/', function(req, res, next){
  if(req.body.genre === "All"){
    res.redirect('/books');
  }else{
    knex('books').where('genre', req.body.genre)
    .then(function(data){
      books = data;
      knex('authors').join('books_authors', {'authors.id' : 'books_authors.author_id'}).then(function(data){
        authors = data;
        var list = combineBooksAuthors(books, authors);
        // res.json(list);
        res.render('books', {books: list});
      });
    });
  }
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
  console.log(req.body.genre);
  knex('books').insert({
    title: req.body.title,
    genre: req.body.genre,
    description: req.body.description,
    cover_url: req.body.cover_url
  }, 'id').then(function(id){
    knex('books_authors').insert({
      book_id: id[0],
      author_id: req.body.authors
    }).then(function(){
    res.redirect('/books');
  });
});
});

router.get('/:id', function(req, res, next){
  var books;
  var authors;
  knex('books').where('id', req.params.id)/*.leftJoin('books_authors', {'books.id' : 'books_authors.book_id'})*/
  .then(function(data){
    books = data;
    knex('authors').join('books_authors', {'authors.id' : 'books_authors.author_id'}).then(function(data){
      authors = data;
      var list = combineBooksAuthors(books, authors);
      // res.json(list);
      res.render('book', {books: list});
    });
  });
});

router.get('/:id/edit', function(req, res, next){
  knex('books').where('id', req.params.id).first().then(function(data){
    books = data;
    console.log(books);
    knex('authors').then(function(data){
      authors = data;
      res.render('book_edit', {book: books, authors: authors});
    });
  });
});

router.post('/:id/edit', function(req, res, next){
  knex('books').update({title: req.body.title, genre: req.body.genre, cover_url: req.body.cover_url, description: req.body.description}).where('id', req.params.id).then(function(){
    knex('books_authors').update({author_id: req.body.authors}).where('book_id', req.params.id).then(function(){
      res.redirect('/books');
    });
  });
  // return new Promise(function(resolve, reject){
  //   if(req.body.title){
  //     knex('books').update({title: req.body.title}).where('id', req.params.id);
  //   }
  //   if(req.body.genre){
  //     knex('books').update({genre: req.body.genre}).where('id', req.params.id);
  //   }
  //   if(req.body.description){
  //     knex('books').update({description: req.body.description}).where('id', req.params.id);
  //   }
  //   if(req.body.cover_url){
  //     knex('books').update({cover_url: req.body.cover_url}).where('id', req.params.id);
  //   }
  //   if(req.body.authors){
  //     knex('books_authors').update({author_id: req.body.authors}).where('book_id', req.params.id);
  //   }
  //   resolve();
  // }).then(function(){
  //   res.redirect('/books');
  // });
});


module.exports = router;
