/* eslint no-console: off */

const express = require('express');
const posts = require('./data/data.json');

const postsList = Object.keys(posts).map((value) => posts[value]);

const app = express();

app.use('/static', express.static(`${__dirname}/public`));

app.set('view engine', 'pug');
app.set('views', './views');

app.get('/', (request, response) => {
  const path = request.path;
  
  response.locals.path = path;
  
  response.render('index');
});

app.get('/blog', (request, response) => {
  response.render('blog', { posts: postsList });
});

app.get('/blog/:title', (request, response) => {
  const title = request.params.title;
  const post = posts[title];

  if (post === undefined) {
    response.status(503);
    response.render('blog', { posts: postsList });
  } else {
    response.render('post', { post: post });
  }
});

app.get('/posts', (request, response) => {
  if (request.query.raw) {
    response.json(posts);
  } else {
    response.json(postsLists);
  }
});

app.listen(3000, () => {
  console.log('Server running on port 3000...');
});
