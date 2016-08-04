import mongoose from 'mongoose';

const listSchema = mongoose.Schema({
  name: String,
  cards: [],
});

export default mongoose.model('List', listSchema);
