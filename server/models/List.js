import mongoose from 'mongoose';

const List = mongoose.Schema({
  name: String,
  cards: Array,
  userId: mongoose.Schema.ObjectId,
  content: String
});

export default mongoose.model('List', List);
