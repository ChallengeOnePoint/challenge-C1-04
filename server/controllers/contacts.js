
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

router.put('/contacts/:id', (req, res) => {
  Contact.findOne({_id: req.params.id}).then(instance => {
    if (!instance) {
      return res.status(404).json({error: 'not found'});
    }

    Object.keys(req.body).forEach(attrName =>
      instance[attrName] = req.body[attrName]);

    instance.save().then(() => res.status(204).send(''));
  });
});

export default router;
