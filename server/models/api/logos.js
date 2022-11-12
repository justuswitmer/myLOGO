import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const LogoSchema = new Schema({
  logos: {
    type: Array,
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
});

const logo = mongoose.model('Logo', LogoSchema);
export default logo;