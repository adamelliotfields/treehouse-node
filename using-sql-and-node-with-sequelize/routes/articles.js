const express = require('express');
const Article = require('../models').Article;

const router = express.Router();

// GET articles listing
router.get('/', (req, res, next) => {
  Article.findAll({order: [['createdAt', 'DESC']]}).then( (articles) => {
    res.render('articles/index', {articles, title: 'My Awesome Blog' });
  }).catch( (err) => {
    res.send(500);
  });
});

// POST create article.
router.post('/', (req, res, next) => {
  Article.create(req.body).then( (article) => {
    res.redirect(`/articles/${article.id}`);
  }).catch( (err) => {
    if (err.name === 'SequelizeValidationError') {
      res.render('articles/new', {
        article: Article.build(req.body),
        title: 'New Article',
        errors: err.errors
      });
    } else {
      throw err;
    }
  }).catch( (err) => {
    res.send(500);
  });
});

// Create a new article form
router.get('/new', (req, res, next) => {
  res.render('articles/new', {article: {}, title: 'New Article'});
});

// Edit article form
router.get('/:id/edit', (req, res, next) => {
  Article.findById(req.params.id).then( (article) => {
    if (article) {
      res.render('articles/edit', {article, title: 'Edit Article'});
    } else {
      res.send(404);
    }
  }).catch( (err) => {
    res.send(500);
  });
});

// Delete article form
router.get('/:id/delete', (req, res, next) => {
  Article.findById(req.params.id).then( (article) => {
    if (article) {
      res.render('articles/delete', {article, title: 'Delete Article'});
    } else {
      res.send(404);
    }
  }).catch( (err) => {
    res.send(500);
  });
});

// GET individual article
router.get('/:id', (req, res, next) => {
  Article.findById(req.params.id).then( (article) => {
    if (article) {
      res.render('articles/show', {article, title: article.title});
    } else {
      res.send(404);
    }
  }).catch( (err) => {
    res.send(500);
  });
});

// PUT update article
router.put('/:id', (req, res, next) => {
  Article.findById(req.params.id).then( (article) => {
    if (article) {
      return article.update(req.body);
    } else {
      res.send(404);
    }
  }).then( (article) => {
    res.redirect(`/articles/${article.id}`);
  }).catch( (err) => {
    if (err.name === 'SequelizeValidationError') {
      const article = Article.build(req.body);
      article.id = req.params.id;
      res.render('articles/edit', {
        article,
        title: 'Edit Article',
        errors: err.errors
      });
    } else {
      throw err;
    }
    res.send(500);
  });
});

// DELETE individual article
router.delete('/:id', (req, res, next) => {
  Article.findById(req.params.id).then( (article) => {
    if (article) {
      return article.destroy();
    } else {
      res.send(404);
    }
  }).then( () => {
    res.redirect('/articles');
  }).catch( (err) => {
    res.send(500);
  });
});

module.exports = router;
