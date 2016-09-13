import List from '../models/List';
import Card from '../models/Card';
import _ from 'lodash';
import mongoose from 'mongoose';

function Index(req, res) {
  List.findById(req.params.id, (err, foundList) => {
    res.status(200).send(foundList.cards);
  });
}

function Create(req, res) {
  List.findById(req.params.id, (err, foundList) => {
    const newCard = new Card(req.body.card);
    foundList.cards.push(newCard);
    foundList.save((err, savedList) => {
      res.status(201).send(newCard);
    });
  });
}

function Update(req, res) {
  const listId = new mongoose.Types.ObjectId(req.params.id);
  const cardId = new mongoose.Types.ObjectId(req.params.cardId);
  List.findOneAndUpdate(
    { _id: listId, 'cards._id': cardId },
    { $set: constructUpdateObj(req.body.card) },
    { new: true },
    (err, foundList) => {
      const list = _.find(foundList.cards, card => card._id.toString() == cardId.toString());
      res.status(200).send(list);
    }
  );
}

function Delete(req, res) {
  const listId = new mongoose.Types.ObjectId(req.params.id);
  const cardId = new mongoose.Types.ObjectId(req.params.cardId);
  List.findOneAndUpdate(
    { _id: listId, 'cards._id': cardId },
    { $pull: { cards: { _id: cardId } } },
    { new: true },
    (err, foundList) => {
      res.status(200).send();
    }
  );
}

function constructUpdateObj(resource) {
  let set = {};
  _.forEach(resource, (value, key) => {
    set[`cards.$.${key}`] = value;
  });
  return set;
}

export default { Index, Create, Update, Delete };
