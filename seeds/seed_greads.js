
exports.seed = function(knex, Promise) {
  return knex('books_authors').del()
  .then(function(){
    return knex('books').del();
  }).then(function(){
    return knex('authors').del();
  }).then(function(){
    return knex('genre').del();
  }).then(function(){
    return knex.raw('ALTER SEQUENCE "books_id_seq" RESTART WITH 1');
  }).then(function(){
    return knex.raw('ALTER SEQUENCE "authors_id_seq" RESTART WITH 1');
  }).then(function(){
    return Promise.all([
      knex('genre').insert({
        genre: 'Python'
      }),
      knex('genre').insert({
        genre: 'Javascript'
      })
    ]);
  }).then(function(){
    return Promise.all([
      knex('authors').insert({
      first_name: 'Alex',
      last_name: 'Martelli',
      bio: "Alex Martelli spent 8 years with IBM Research, winning three Outstanding Technical Achievement Awards.He then spent 13 as a Senior Software Consultant at think3 inc, developing libraries, network protocols, GUI engines, event frameworks, and web access frontends. He has also taught programming languages, development methods, and numerical computing at Ferrara University and other venues. He's a C++ MVP for Brainbench, and a member of the Python Software Foundation. He currently works for AB Strakt, a Python-centered software house in Göteborg, Sweden, mostly by telecommuting from his home in Bologna, Italy. Alex's proudest achievement is the articles that appeared in Bridge World (January/February 2000), which were hailed as giant steps towards solving issues that had haunted contract bridge theoreticians for decades.",
      portrait_url: "https://s3-us-west-2.amazonaws.com/assessment-images/galvanize_reads/photos/alex_martelli.jpg"
    }),
    knex('authors').insert({
      first_name: 'Anna',
      last_name: 'Ravenscroft',
      bio: "Anna Martelli Ravenscroft is an experienced speaker and trainer, with diverse background developing curricula for church, regional transit, disaster preparedness; developing web applications for therapy, learning, fitness; writing technical books, articles and presentations; active member of Open Source community; skilled at translating between IT professionals and end users.",
      portrait_url: "https://s3-us-west-2.amazonaws.com/assessment-images/galvanize_reads/photos/anna_ravenscroft.jpg"
      }),
    knex('authors').insert({
      first_name: 'Steve',
      last_name: 'Holden',
      bio: "Steve Holden Is a consultant, advising clients on system and network architectures and the design and implementation of programmed web systems. He also teaches classes on TCP/IP, network security, database and programming topics, and is the author of \"Python Web Programming\", the O'Reilly School of Technology's \"Certificate series in Python\" and O'Reilly Media's \"Intermediate Python\" video series.",
      portrait_url: "https://s3-us-west-2.amazonaws.com/assessment-images/galvanize_reads/photos/steve_holden.jpg"
      }),
    knex('authors').insert({
      first_name: 'Allen B.',
      last_name: 'Downey',
      bio: "Allen Downey is a Professor of Computer Science at Olin College of Engineering. He has taught at Wellesley College, Colby College and U.C. Berkeley. He has a Ph.D. in Computer Science from U.C. Berkeley and Master's and Bachelor's degrees from MIT.",
      portrait_url: "https://s3-us-west-2.amazonaws.com/assessment-images/galvanize_reads/photos/allen_downey.jpg"
      }),
    knex('authors').insert({
      first_name: 'Bonnie',
      last_name: 'Eisenmen',
      bio: "Bonnie Eisenman is a software engineer at Codecademy, with previous experience at Fog Creek Software and Google. She has spoken at several conferences on topics ranging from ReactJS to musical programming and Arduinos. In her spare time, she enjoys building electronic musical instruments, tinkering with hardware projects, and laser-cutting chocolate. Find her on Twitter as @brindelle.",
      portrait_url: "https://s3-us-west-2.amazonaws.com/assessment-images/galvanize_reads/photos/bonnie_eisenman.jpg"
      }),
    knex('authors').insert({
      first_name: 'Kyle',
      last_name: 'Simpson',
      bio: "Kyle Simpson is an Open Web Evangelist who's passionate about all things JavaScript. He's an author, workshop trainer, tech speaker, and OSS contributor/leader.",
      portrait_url: "https://s3-us-west-2.amazonaws.com/assessment-images/galvanize_reads/photos/kyle_simpson.jpg"
      })
    ]);
  }).then(function(){
    return Promise.all([
      knex('books').insert({
        title: 'Python In A Nutshell',
        genre: 'Python',
        description: "This book offers Python programmers one place to look when they need help remembering or deciphering the syntax of this open source language and its many powerful but scantily documented modules. This comprehensive reference guide makes it easy to look up the most frequently needed information--not just about the Python language itself, but also the most frequently used parts of the standard library and the most important third-party extensions.",
        cover_url: "https://s3-us-west-2.amazonaws.com/assessment-images/galvanize_reads/photos/python_in_a_nutshell.jpg"
      }),
      knex('books').insert({
        title: 'Think Python',
        genre: 'Python',
        description: "If you want to learn how to program, working with Python is an excellent way to start. This hands-on guide takes you through the language a step at a time, beginning with basic programming concepts before moving on to functions, recursion, data structures, and object-oriented design. This second edition and its supporting code have been updated for Python 3.",
        cover_url: "https://s3-us-west-2.amazonaws.com/assessment-images/galvanize_reads/photos/think_python.jpg"
      }),
      knex('books').insert({
        title: 'Learning React Native',
        genre: 'Javascript',
        description: "Get a practical introduction to React Native, the JavaScript framework for writing and deploying fully featured mobile apps that look and feel native. With this hands-on guide, you’ll learn how to build applications that target iOS, Android, and other mobile platforms instead of browsers. You’ll also discover how to access platform features such as the camera, user location, and local storage.",
        cover_url: "https://s3-us-west-2.amazonaws.com/assessment-images/galvanize_reads/photos/learning_react_native.jpg"
      }),
      knex('books').insert({
        title: 'You Don\'t Know JS: ES6 & Beyond',
        genre: 'Javascript',
        description: "No matter how much experience you have with JavaScript, odds are you don’t fully understand the language. As part of the \"You Don’t Know JS\" series, this compact guide focuses on new features available in ECMAScript 6 (ES6), the latest version of the standard upon which JavaScript is built.",
        cover_url: 'https://s3-us-west-2.amazonaws.com/assessment-images/galvanize_reads/photos/es6_and_beyond.jpg'
      }),
      knex('books').insert({
        title: 'You Dont\'t Know JS: Scope & Closures',
        genre: 'Javascript',
        description: "No matter how much experience you have with JavaScript, odds are you don’t fully understand the language. This concise yet in-depth guide takes you inside scope and closures, two core concepts you need to know to become a more efficient and effective JavaScript programmer. You’ll learn how and why they work, and how an understanding of closures can be a powerful part of your development skillset.",
        cover_url: 'https://s3-us-west-2.amazonaws.com/assessment-images/galvanize_reads/photos/scope_and_closures.jpg'
      }),
      knex('books').insert({
        title: 'You Dont\'t Know JS: Async & Performance',
        genre: 'Javascript',
        description: "No matter how much experience you have with JavaScript, odds are you don’t fully understand the language. As part of the \"You Don’t Know JS\" series, this concise yet in-depth guide focuses on new asynchronous features and performance techniques—including Promises, generators, and Web Workers—that let you create sophisticated single-page web applications and escape callback hell in the process.",
        cover_url: 'https://s3-us-west-2.amazonaws.com/assessment-images/galvanize_reads/photos/async_and_performance.jpg'
      })
    ]);
  }).then(function(){
    return Promise.all([
      knex('books_authors').insert({
        book_id: '1',
        author_id: '1'
      }),
      knex('books_authors').insert({
        book_id: '1',
        author_id: '2'
      }),
      knex('books_authors').insert({
        book_id: '1',
        author_id: '3'
      }),
      knex('books_authors').insert({
        book_id: '2',
        author_id: '4'
      }),
      knex('books_authors').insert({
        book_id: '3',
        author_id: '5'
      }),
      knex('books_authors').insert({
        book_id: '4',
        author_id: '6'
      }),
      knex('books_authors').insert({
        book_id: '5',
        author_id: '6'
      }),
      knex('books_authors').insert({
        book_id: '6',
        author_id: '6'
      })
    ]);
  });
};
