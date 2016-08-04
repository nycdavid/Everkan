import mongoose from 'mongoose';
import findOrCreate from 'mongoose-findorcreate';

const userSchema = mongoose.Schema({
  name: String,
  googleId: String
});

export default mongoose.model('User', userSchema);
