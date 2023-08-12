import mongoose from 'mongoose';
import express from 'express';
import Favorite from './model/Favorite.js';
import bodyParser from 'body-parser';

const app = express();
const port = 5000;
const CLIENT_URL = 'http://localhost:5173';
const MONGO_DB_URL =
  'mongodb+srv://shcoobz:Zjtd3N89YHY4Xk9p@cluster0.fm2y2ig.mongodb.net/fetch-the-countries';

// mongoose.connect(MONGO_DB_URL);

mongoose
  .connect(MONGO_DB_URL)
  .then(() => console.log('Successfully connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.use(bodyParser.json());

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', CLIENT_URL);
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  next();
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/welcome', (req, res) => {
  res.send('Welcome to the server!');
});

app.post('/favorites', async (req, res) => {
  const { country, population } = req.body;

  try {
    const existingCountry = await Favorite.findOne({ country });

    if (existingCountry) {
      res.status(400).json({ message: 'Country already in favorites.' });
    } else {
      const favorite = new Favorite({
        country,
        population,
        time: new Date(),
      });

      const newFavCountry = await favorite.save();
      res.status(201).json(newFavCountry);
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get('/favorites', async (req, res) => {
  try {
    const favorites = await Favorite.find({});
    res.status(200).json(favorites);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get('/favorites/highestPopulation', (req, res) => {
  Favorite.find()
    .sort({ population: -1 }) // sort by population in descending order
    .limit(1) // get only one document
    .then((result) => {
      console.log('Result server:', result);
      res.send(result);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send({ error: 'An error occurred' });
    });
});

app.delete('/favorites/all', async (req, res) => {
  try {
    await Favorite.deleteMany({});
    res.status(200).send('All favorites deleted.');
  } catch (err) {
    res.status(500).send(err);
  }
});

app.delete('/favorites/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const existingCountry = await Favorite.findById(id);

    if (!existingCountry) {
      res.status(400).json({ message: 'Country not found in favorites.' });
    } else {
      await Favorite.deleteOne({ _id: id });
      res.status(200).json({ message: 'Country removed from favorites.' });
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

app.listen(port, () => {
  console.log(`Server at http://localhost:${port}`);
});
