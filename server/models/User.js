import mongoose from 'mongoose';
import findOrCreate from 'mongoose-findorcreate';

const userSchema = mongoose.Schema({
  name: String,
  googleId: String
});

userSchema.plugin(findOrCreate);

export default mongoose.model('User', userSchema);
