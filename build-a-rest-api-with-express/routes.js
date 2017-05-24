const express = require('express');
const Question = require('./models').Question;

const router = express.Router();

router.param('qid', (request, response, next, id) => {
  Question.findById(id, (error, doc) => {
    if (error) return next(error);
    if (!doc) {
      error = new Error('Not Found');
      error.status = 404;
      return next(error);
    }
    request.question = doc;
    return next();
  });
});

router.param('aid', (request, response, next, id) => {
  request.answer = request.question.answers.id(id);
  if (!request.answer) {
    error = new Error('Not Found');
    error.status = 404;
    return next(error);
  }
  next();
});

router.get('/', (request, response, next) => {
  Question.find({}).sort({ createdAt: -1 }).exec((error, questions) => {
    if (error) return next(error);
    response.json(questions);
  });
});

router.post('/', (request, response, next) => {
  const question = new Question(request.body);
  question.save((error, question) => {
    if (error) return next(error);
    response.status(201);
    response.json(question);
  });
});

router.get('/:qid', (request, response, next) => {
  response.json(request.question);
});

router.post('/:qid/answers', (request, response, next) => {
  request.question.answers.push(request.body);
  request.question.save((error, question) => {
    if (error) return next(error);
    response.status(201);
    response.json(question);
  });
});

router.put('/:qid/answers/:aid', (request, response, next) => {
  request.answer.update(request.body, (error, result) => {
    if (error) return next(error);
    response.json(result);
  });
});

router.delete('/:qid/answers/:aid', (request, response, next) => {
  request.answer.remove((error) => {
    if (error) return next(error);
    request.question.save((error, question) => {
      if (error) return next(error);
      response.json(question);
    });
  });
});

router.post('/:qid/answers/:aid/vote-:vote', (request, response, next) => {
  if (request.params.vote.search(/^(up|down)$/) === -1) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
  } else {
    request.vote = request.params.vote;
    next();
  }
}, (request, response, next) => {
  request.answer.vote(request.vote, (error, question) => {
    if (error) return next(error);
    response.json(question);
  });
});

module.exports = router;
