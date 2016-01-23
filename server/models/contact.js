import mongoose from 'mongoose';

const contactSchema = mongoose.Schema({
  number: {
    type: String,
    required: true
  },
  street: String,
  city: String,
  postcode: String,
  firstname: String,
  lastname: String,
  deletedAt: Date
});

mongoose.model('Contact', contactSchema);

export default mongoose.model('Contact');
