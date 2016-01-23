
import express from 'express';
import Contact from './../models/contact';

const router = express.Router();

router.get('/contacts', (req, res) => {
  Contact.find({}).then(contacts =>
    res.json(contacts));
});

router.post('/contacts', (req, res) => {
  let contact = new Contact(req.body);

  contact.save().then(contact =>
    res.status(201).json(contact.toObject()));
});

export default router;
