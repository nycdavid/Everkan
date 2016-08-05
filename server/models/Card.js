import mongoose from 'mongoose';

const Card = mongoose.Schema({
  name: String,
  content: String,
  dueDate: Number
});

export default mongoose.model('Card', Card);
