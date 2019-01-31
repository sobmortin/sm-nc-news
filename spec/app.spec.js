process.env.NODE_ENV = 'test';
const { expect } = require('chai');
const supertest = require('supertest');
const app = require('../app');
const connection = require('../db/connection');

const request = supertest(app);

describe('/api', () => {
  //  mocha hooks
  beforeEach(() => connection.migrate
    .rollback()
    .then(() => connection.migrate.latest())
    .then(() => connection.seed.run()));
  after(() => connection.destroy());
  // ----
  describe('/topics', () => {
    it('GET / status:200 return an array of topic objects', () => request
      .get('/api/topics')
      .expect(200)
      .then(({ body }) => {
        expect(body.topics).to.be.an('array');
        expect(body.topics[0]).to.have.all.keys('slug', 'description');
      }));
    it('GET /topic should return a 404 status due to incorrect url spelling', () => request.get('/api/topic').expect(404));
    it('POST /topic should return 201 status and post the body', () => {
      const topic = { description: 'what an album', slug: 'hejira' };
      return request
        .post('/api/topics')
        .send(topic)
        .expect(201)
        .then(({ body }) => {
          expect(body.topic).to.be.an('object');
          expect(body.topic.slug).to.equal('hejira');
          expect(body.topic.description).to.equal('what an album');
        });
    });
    it('POST /topic should return a 400 error when malformed syntax', () => {
      const topic = { nonexistent: 'an empty string', slug: 'animal' };
      return request
        .post('/api/topics')
        .send(topic)
        .expect(400)
        .then(({ body }) => {
          expect(body.message).to.equal('bad syntax in post request');
        });
    });
    it('POST /topic should return a 400 error when breaking unique topic limitation', () => {
      const topic2 = { description: 'Not dogs', slug: 'cats' };
      return request
        .post('/api/topics')
        .send(topic2)
        .expect(400)
        .then(({ body }) => {
          expect(body.message).to.equal('breaking unique limitations');
        });
    });
    it('GET /:topic/articles should return articles that match topic query - mitch', () => request
      .get('/api/topics/mitch/articles')
      .expect(200)
      .then(({ body }) => {
        expect(body.articles[0].topic).to.equal('mitch');
      }));
    it('GET /:topic/articles should return articles that match topic query - cats', () => request
      .get('/api/topics/cats/articles')
      .expect(200)
      .then(({ body }) => {
        expect(body.articles[0].topic).to.equal('cats');
      }));
    it('GET /:topic/articles should return an array', () => request
      .get('/api/topics/cats/articles')
      .expect(200)
      .then(({ body }) => {
        expect(body.articles).to.be.an('array');
      }));
    it('GET /:topic/articles should return 404 error when searching for non-existent topic', () => request
      .get('/api/topics/fake/articles')
      .expect(404)
      .then((res) => {
        expect(res.error.text).to.equal('{"message":"no articles found"}');
      }));
    it('GET /:topic/articles should return with all relevant keys', () => request
      .get('/api/topics/cats/articles')
      .expect(200)
      .then(({ body }) => {
        expect(body.articles[0]).to.contain.keys(
          'article_id',
          'author',
          'title',
          'votes',
          'created_at',
          'topic',
        );
      }));
    it('GET /:topic/articles should return with a comment count key', () => request
      .get('/api/topics/cats/articles')
      .expect(200)
      .then(({ body }) => {
        expect(body.articles[0]).to.contain.keys('comment_count');
      }));
    it('GET /:topic/articles should have an article count property to equal number of returned articles, 1 - cats', () => request
      .get('/api/topics/cats/articles')
      .expect(200)
      .then(({ body }) => {
        expect(body).to.contain.keys('total_articles');
        expect(body.total_articles).to.equal('1');
      }));
    it('GET /:topic/articles should have an article count property to equal number of returned articles, 11 - mitch', () => request
      .get('/api/topics/mitch/articles')
      .expect(200)
      .then(({ body }) => {
        expect(body).to.contain.keys('total_articles');
        expect(body.total_articles).to.equal('11');
      }));
    it('GET /:topic/articles should return length of DEFAULT limit - 10', () => request
      .get('/api/topics/mitch/articles')
      .expect(200)
      .then(({ body }) => {
        expect(body.articles.length).to.equal(10);
      }));
    it('GET /:topic/articles should return length of limit query', () => request
      .get('/api/topics/mitch/articles?limit=5')
      .expect(200)
      .then(({ body }) => {
        expect(body.articles.length).to.equal(5);
      }));
    xit('GET status:200 defaults when passed invalid limit', () => request
      .get('/api/topics/mitch/articles?limit=false')
      .expect(200)
      .then(({ body }) => {
        expect(body.articles.length).to.equal(10);
      }));
    it('GET /:topic/articles should return sorted by DEFAULT - date', () => request
      .get('/api/topics/mitch/articles')
      .expect(200)
      .then(({ body }) => {
        expect(body.articles[0].created_at > body.articles[1].created_at).to.equal(true);
        expect(body.articles[2].created_at > body.articles[3].created_at).to.equal(true);
      }));
    it('GET /:topic/articles should return sorted by DEFAULT - date, order=asc', () => request
      .get('/api/topics/mitch/articles?order_by=asc')
      .expect(200)
      .then(({ body }) => {
        expect(body.articles[0].created_at < body.articles[1].created_at).to.equal(true);
        expect(body.articles[2].created_at < body.articles[3].created_at).to.equal(true);
      }));
    it('GET /:topic/articles should have pagination ability', () => request
      .get('/api/topics/mitch/articles?p=2')
      .expect(200)
      .then(({ body }) => {
        expect(body.articles).to.have.length(1);
      }));
    it('GET /:topic/articles should have pagination ability and change with limit query', () => request
      .get('/api/topics/mitch/articles?p=2&limit=5')
      .expect(200)
      .then(({ body }) => {
        expect(body.articles).to.have.length(5);
      }));
    it('POST /::topic/articles 201 status and returns posted article object', () => {
      const article = { title: 'code', body: 'is hard', username: 'rogersop' };
      return request
        .post('/api/topics/mitch/articles')
        .send(article)
        .expect(201)
        .then(({ body }) => {
          expect(body.article[0]).to.contain.keys(
            'article_id',
            'title',
            'body',
            'votes',
            'topic',
            'username',
            'created_at',
          );
          expect(body.article).to.be.an('array');
        });
    });
    it('POST /::topic/articles 400 Bad Request status', () => {
      const article = { title: 'code', body: 'is hard', username: 'seb' };
      return request
        .post('/api/topics/mitch/articles')
        .send(article)
        .expect(400)
        .then(({ text }) => {
          const { message } = JSON.parse(text);
          expect(message).to.equal('key is not present in table');
        });
    });
  });
  describe('/articles', () => {
    it('GET / status:200 return an object with articles array of topic objects', () => request
      .get('/api/articles')
      .expect(200)
      .then(({ body }) => {
        expect(body.articles).to.be.an('array');
        expect(body.articles[0]).to.contain.keys(
          'article_id',
          'title',
          'body',
          'votes',
          'topic',
          'author',
          'created_at',
          'comment_count',
        );
      }));
    it('GET / status:200 return an array of length 10 - DEFAULT', () => request
      .get('/api/articles')
      .expect(200)
      .then(({ body }) => {
        expect(body.articles).to.have.length(10);
      }));
    it('GET / status:200 return an object with key of total count of articles', () => request
      .get('/api/articles')
      .expect(200)
      .then(({ body }) => {
        expect(body.total_count).to.equal(12);
      }));
    it('GET / status:200 to be sorted by date, descending - DEFAULT', () => request
      .get('/api/articles')
      .expect(200)
      .then(({ body }) => {
        expect(body.articles[0].created_at > body.articles[1].created_at).to.equal(true);
        expect(body.articles[1].created_at > body.articles[2].created_at).to.equal(true);
      }));
    it('GET status:200 to be sorted by date, order=asc', () => request
      .get('/api/articles?order_by=asc')
      .expect(200)
      .then(({ body }) => {
        expect(body.articles[0].created_at < body.articles[1].created_at).to.equal(true);
        expect(body.articles[2].created_at < body.articles[3].created_at).to.equal(true);
      }));
    it('GET / status:200 returns article object with ID paramater', () => request
      .get('/api/articles/1')
      .expect(200)
      .then(({ body }) => {
        expect(body.article.article_id).to.equal(1);
      }));
    it('GET / status:200 returns article object with ID paramater', () => request
      .get('/api/articles/2')
      .expect(200)
      .then(({ body }) => {
        expect(body.article.article_id).to.equal(2);
      }));
    it('GET / status:400 returns error message', () => request
      .get('/api/articles/noID')
      .expect(400)
      .then(({ body }) => {
        expect(body.message).to.equal('invalid input syntax');
      }));
    it('PATCH should update the correct articles votes, id = 1', () => request
      .patch('/api/articles/1')
      .expect(202)
      .send({ inc_votes: 1 })
      .then(({ body }) => {
        expect(body.votedArticle.votes).to.equal(101);
      }));
    it('PATCH should update the correct articles votes, id = 2', () => request
      .patch('/api/articles/2')
      .expect(202)
      .send({ inc_votes: 1 })
      .then(({ body }) => {
        expect(body.votedArticle.article_id).to.equal(2);
        expect(body.votedArticle.votes).to.equal(1);
      }));
    it('PATCH should be able to decrement also, id = 1', () => request
      .patch('/api/articles/1')
      .expect(202)
      .send({ inc_votes: -1 })
      .then(({ body }) => {
        expect(body.votedArticle.votes).to.equal(99);
      }));
    it('PATCH should be able to decrement also, id = 2', () => request
      .patch('/api/articles/2')
      .expect(202)
      .send({ inc_votes: -1 })
      .then(({ body }) => {
        expect(body.votedArticle.votes).to.equal(-1);
      }));
    it('PATCH should be able to decrement also, id = 3', () => request
      .patch('/api/articles/3')
      .expect(202)
      .send({ inc_votes: -1 })
      .then(({ body }) => {
        expect(body.votedArticle.votes).to.equal(-1);
      }));
    it('PATCH should return error when passed incorrect type to vote', () => request
      .patch('/api/articles/3')
      .expect(400)
      .send({ inc_votes: 'rabbit' })
      .then(({ body }) => {
        console.log('in test:', body);
        expect(body.message).to.equal('invalid input syntax');
      }));
  });
});
