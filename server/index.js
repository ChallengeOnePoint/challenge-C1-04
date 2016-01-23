
import express from 'express';

const app = express();

app.get('/api', (req, res) => res.json({message: 'hello world'}));

app.use(express.static('public'));
app.listen(3000);
console.log('listening port 3000');