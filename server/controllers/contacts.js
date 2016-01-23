
import express from 'express';
import multer from 'multer';
import bluebird from 'bluebird';
import Contact from './../models/contact';

const upload = multer();
const router = express.Router();

router.get('/contacts', (req, res) => {
  const projection = { deletedAt: { $exists: false }};

  if (req.query.before) {
    projection._id = { $lt: req.query.before };
  } else if (req.query.after) {
    projection._id = { $gt: req.query.after };
  }

  Contact
    .find(projection)
    .exists('deletedAt', false)
    .sort({ _id: -1 })
    .limit(20)
    .exec()
    .then(contacts => res.json(contacts));
});

router.post('/contactns', (req, res) => {
  let contact = new Contact(req.body);

  contact.save().then(contact =>
    res.status(201).json(contact.toObject()));
});

router.post('/contacts/batch', upload.single('contactsFile'), (req, res) => {
  let contacts = JSON.parse(req.file.buffer.toString());

  bluebird.all(contacts.map(contact => {
    let model = new Contact(contact);

    return model.save();
  })).then(() => res.status(202).send(''))
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

router.get('/contacts/:id', (req, res) => {
  Contact.findOne({_id: req.params.id}).then(instance => {
    if (!instance) {
      return res.status(404).json({error: 'not found'});
    }

    res.json(instance.toObject());
  });
});

router.delete('/contacts/:id', (req, res) => {
  Contact.findOne({_id: req.params.id}).then(instance => {
    if (!instance) {
      return res.status(404).json({error: 'not found'});
    }

    instance.deletedAt = new Date();

    instance.save().then(() => res.status(204).send(''));
  });
});

router.put('/contacts/:id/undo-delete', (req, res) => {
  Contact.findOne({_id: req.params.id}).then(instance => {
    if (!instance) {
      return res.status(404).json({error: 'not found'});
    }

    instance.deletedAt = undefined;

    instance.save().then(() => res.status(204).send(''));
  });
});

export default router;
