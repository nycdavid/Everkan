import request from 'supertest';
import passportStub from 'passport-stub';
import mongoose from 'mongoose';
import chai from 'chai';
import database from '../../config/database.json';
import List from '../../server/models/List';
import User from '../../server/models/User';
import app from '../../server/app';
import _ from 'lodash';

passportStub.install(app);
const expect = chai.expect;
const when = describe;

describe('Lists', () => {
  let user;
  let list;

  before(done => {
    mongoose.Promise = global.Promise;
    if (mongoose.connection.db) return done();
    mongoose.connect(database[process.env.NODE_ENV]);
  });

  after(done => {
    mongoose.connection.db.dropCollection('users', (err, result) => {
      mongoose.connection.db.dropCollection('lists', (err, result) => {
        done();
      });
    })
  });

  describe('when a User is logged in', () => {
    before(done => {
      user = new User({ googleId: '1234' })
      user.save((err, savedUser) => {
        list = new List({ name: 'Foo', userId: savedUser._id.toString() });
        list.save((err, savedList) => {
          done();
        });
      });
    });

    beforeEach(done => {
      passportStub.login(user);
      done();
    });

    describe('GET /lists', () => {
      it('returns all a User\'s lists', done => {
        request(app)
          .get('/lists')
          .expect(200)
          .end((err, res) => {
            expect(res.body.length).to.equal(1);
            done();
          });
      });
    });

    describe('PUT /lists/:id', () => {
      it('updates a User\'s list', done => {
        const someTime = Date.now();
        request(app)
          .put(`/lists/${list._id.toString()}`)
          .send({ name: 'Updated Name' })
          .expect(200)
          .end((err, res) => {
            List.findById(res.body._id, (err, foundList) => {
              expect(foundList.name).to.equal('Updated Name');
              expect(res.body.name).to.equal('Updated Name');
              done();
            });
          });
      });
    });

    describe('DELETE /lists/:id', () => {
      it('deletes a list', done => {
        request(app)
          .delete(`/lists/${list._id.toString()}`)
          .expect(200)
          .end((err, res) => {
            List.findById(list._id.toString(), (err, foundList) => {
              expect(foundList).to.equal(null);
              done();
            });
          });
      });
    });

    describe('POST /lists', () => {
      let req;
      beforeEach(() => {
        req = request(app)
          .post('/lists')
          .send({ name: 'Brand Spankin New List', userId: user._id.toString() })
          .expect(201);
      });

      it('sets the List name', done => {
        req.end((err, res) => {
          List.findById(res.body._id, (err, foundList) => {
            expect(foundList.name).to.equal('Brand Spankin New List');
            done();
          });
        });
      });

      it('sets the List\'s user', done => {
        req.end((err, res) => {
          List.findById(res.body._id, (err, foundList) => {
            expect(foundList.userId.toString()).to.equal(user._id.toString());
            done();
          });
        });
      });

      it('returns the saved List in the response body', done => {
        req.end((err, res) => {
          List.findById(res.body._id, (err, foundList) => {
            const expected = {
              id: foundList._id.toString(),
              name: foundList.name,
              cards: foundList.cards
            };
            const actual = {
              id: res.body._id,
              name: res.body.name,
              cards: res.body.cards
            };
            const comparison = _.isEqual(actual, expected);
            expect(comparison).to.equal(true);
            done();
          });
        });
      });
    });
  });
});
