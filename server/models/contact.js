import mongoose from 'mongoose';
import findGeocoordinates from './../util/findgeocoordinates';

const contactSchema = mongoose.Schema({
  number: {
    type: String,
    required: true
  },
  street: String,
  city: String,
  postcode: String,
  lat: Number,
  lng: Number,
  firstname: String,
  lastname: String,
  deletedAt: Date
});

contactSchema.pre('save', function (next) {
  if (!this.isNew) return next();

  findGeocoordinates(
    encodeURIComponent(`${this.street}, ${this.city} ${this.postcode}`),
    (err, coordinates) => {
      if (!err) {
        this.lat = coordinates.lat;
        this.lng = coordinates.lng;
      } else {
        console.error(err);
      }

      next();
    })
});

mongoose.model('Contact', contactSchema);

export default mongoose.model('Contact');
