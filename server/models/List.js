import mongoose from 'mongoose';

const listSchema = mongoose.Schema({
  name: String,
  cards: [],
  userId: mongoose.Schema.ObjectId
});

export default mongoose.model('List', listSchema);
