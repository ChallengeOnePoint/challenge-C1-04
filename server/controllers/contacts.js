
import express from 'express';
import Contact from './../models/contact';

const router = express.Router();

router.get('/contacts', (req, res) => {
  Contact.find({}).then(contacts =>
    res.json(contacts));
});

export default router;
