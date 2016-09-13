import request from 'supertest';
import passportStub from 'passport-stub';
import mongoose from 'mongoose';
import chai from 'chai';
import database from '../../config/database.json';
import List from '../../server/models/List';
import User from '../../server/models/User';
import Card from '../../server/models/Card';
import app from '../../server/app';
import _ from 'lodash';

passportStub.install(app);
const expect = chai.expect;
const when = describe;

describe('ListCards', () => {
  let user;
  let list;
  let firstCard;

  before(done => {
    mongoose.Promise = global.Promise;
    if (mongoose.connection.db) return done();
    mongoose.connect(database[process.env.NODE_ENV]);
  });

  afterEach(done => {
    mongoose.connection.db.dropCollection('users', (err, result) => {
      mongoose.connection.db.dropCollection('lists', (err, result) => {
        done();
      });
    });
  });

  describe('when a User is logged in', () => {
    beforeEach(done => {
      user = new User({ googleId: '1234' })
      user.save((err, savedUser) => {
        passportStub.login(user);
        firstCard = new Card({ name: 'List Card 1', content: 'Default markdown' });
        list = new List({ name: 'Foo', userId: savedUser._id.toString() });
        list.cards = [firstCard];
        list.save((err, savedList) => {
          done();
        });
      });
    });

    describe('GET /lists/:id/cards', () => {
      it('fetches all of the given list\'s cards', done => {
        request(app)
          .get(`/lists/${list._id.toString()}/cards`)
          .expect(200)
          .end((err, res) => {
            const firstCard = res.body[0];
            expect(firstCard.name).to.equal('List Card 1');
            done();
          });
      });
    });

    describe('POST /lists/:id/cards', () => {
      it('adds a Card to the List\'s array of cards', done => {
        request(app)
          .post(`/lists/${list._id.toString()}/cards`)
          .send({ card: { name: 'List Card 2' } })
          .expect(201)
          .end((err, res) => {
            List.findById(list._id.toString(), (err, foundList) => {
              expect(foundList.cards.length).to.equal(2);
              expect(foundList.cards.map(card => card.name))
                .to.have.members(['List Card 1', 'List Card 2']);
              done();
            });
          });
      });

      it('returns the created Card as the response body', done => {
        request(app)
          .post(`/lists/${list._id.toString()}/cards`)
          .send({ card: { name: 'List Card 2' } })
          .expect(201)
          .end((err, res) => {
            expect(res.body.name).to.equal('List Card 2');
            done();
          });
      });
    });

    describe('PUT /lists/:id/cards/:id', () => {
      let req;
      beforeEach(done => {
        const secondCard = new Card({ name: 'This is card #2' });
        list.cards.push(secondCard);
        list.save((err, savedList) => {
          req = request(app)
            .put(`/lists/${list._id.toString()}/cards/${firstCard._id.toString()}`)
          done();
        });
      });

      it('updates the card provided', done => {
        req
          .send({ card: { name: 'Foobar Card 1' } })
          .expect(200)
          .end((err, res) => {
            List.findById(list._id.toString(), (err, foundList) => {
              const card = foundList.cards[0];
              expect(card.name).to.equal('Foobar Card 1');
              done();
            });
          });
      });

      it('updates ALL attributes of the card', done => {
        const updatedCard = {
          card: {
            name: 'Stony Brook University',
            content: 'Some new markdown',
          }
        }
        req
          .send(updatedCard)
          .expect(200)
          .end((err, res) => {
            List.findById(list._id.toString(), (err, foundList) => {
              const alteredCard = _.find(foundList.cards, card => (
                card._id.toString() === firstCard._id.toString()
              ));
              expect(alteredCard.name).to.equal('Stony Brook University');
              expect(alteredCard.content).to.equal('Some new markdown');
              done();
            });
          });
      });

      it('updates ONLY the card passed', done => {
        req
          .send({ card: { name: 'Renaming the first card' } })
          .expect(200)
          .end((err, res) => {
            List.findById(list._id.toString(), (err, foundList) => {
              const foundCards = foundList.cards.map(card => card.name);
              expect(foundCards).to.have.members(
                ['Renaming the first card', 'This is card #2']
              );
              done();
            });
          });
      });

      it('sends the updated card as the response body', done => {
        req
          .send({ card: { name: 'Renaming the first card' } })
          .expect(200)
          .end((err, res) => {
            expect(res.body.name).to.equal('Renaming the first card');
            expect(res.body.content).to.equal('Default markdown');
            done();
          });
      });
    });

    describe('DELETE /lists/:id/cards/:id', () => {
      beforeEach(done => {
        const secondCard = new Card({ name: 'This is card #2' });
        list.cards.push(secondCard);
        list.save((err, savedList) => {
          done();
        });
      });

      it('removes the card from the collection', done => {
        request(app)
          .delete(`/lists/${list._id.toString()}/cards/${firstCard._id.toString()}`)
          .expect(200)
          .end((err, res) => {
            List.findById(list._id.toString(), (err, foundList) => {
              expect(foundList.cards.length).to.equal(1);
              expect(foundList.cards[0].name).to.equal('This is card #2');
              done();
            });
          });
      });
    });
  });
});
