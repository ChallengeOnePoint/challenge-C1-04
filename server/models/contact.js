import mongoose from 'mongoose';

const contactSchema = Schema({
  number: {
    type: String,
    required: true
  },
  street: String,
  city: String,
  postcode: String,
  firstname: String,
  lastname: String
});

contactSchema.virtual('number').get(() => this._id;);

mongoose.model('Contact', contactSchema);

export default contactSchema;
