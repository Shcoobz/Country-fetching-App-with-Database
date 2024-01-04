import mongoose from 'mongoose';
import express from 'express';
import Favorite from './model/Favorite.js';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Express application
 * @type {express.Express}
 */
const app = express();

/**
 * Port number for the server
 * @type {number}
 */
const port = 5000;

/**
 * URL of the client application
 * @type {string}
 */
const CLIENT_URL = 'http://localhost:5173';

/**
 * MongoDB URL obtained from environment variable
 * @type {string}
 */
const MONGO_DB_URL = process.env.MONGO_DB_URL;

/**
 * Establishes a connection to the MongoDB database using the specified URL.
 * @function
 * @async
 * @param {string} MONGO_DB_URL - The MongoDB database URL to connect to.
 * @returns {Promise<void>} A Promise that resolves when the connection is established successfully, or rejects with an error if the connection fails.
 * @throws {Error} If the MongoDB connection encounters an error, it will be caught and logged.
 */
mongoose
  .connect(MONGO_DB_URL)
  .then(() => console.log('Successfully connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

/**
 * Configures Express middleware to parse incoming requests with JSON payloads.
 * @function
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @param {Function} next - The next middleware function in the request-response cycle.
 */
app.use(bodyParser.json());

/**
 * Configures Express middleware for handling Cross-Origin Resource Sharing (CORS).
 * @function
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @param {Function} next - The next middleware function in the request-response cycle.
 */
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

/**
 * Route to the root of the server
 * @name GET /
 * @function
 * @memberof module:server
 * @param {Express.Request} req - Express request object.
 * @param {Express.Response} res - Express response object.
 * @returns {void}
 */
app.get('/', (req, res) => {
  res.send('Hello World!');
});

/**
 * Route to a welcome message
 * @name GET /welcome
 * @function
 * @memberof module:server
 * @param {Express.Request} req - Express request object.
 * @param {Express.Response} res - Express response object.
 * @returns {void}
 */
app.get('/welcome', (req, res) => {
  res.send('Welcome to the server!');
});

/**
 * Route to add a favorite country
 * @name POST /favorites
 * @function
 * @memberof module:server
 * @param {Express.Request} req - Express request object.
 * @param {Express.Response} res - Express response object.
 * @returns {void}
 */
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

/**
 * Route to get all favorite countries
 * @name GET /favorites
 * @function
 * @memberof module:server
 * @param {Express.Request} req - Express request object.
 * @param {Express.Response} res - Express response object.
 * @returns {void}
 */
app.get('/favorites', async (req, res) => {
  try {
    const favorites = await Favorite.find({});
    res.status(200).json(favorites);
  } catch (err) {
    res.status(500).send(err);
  }
});

/**
 * Route to get the country with the highest population
 * @name GET /favorites/highestPopulation
 * @function
 * @memberof module:server
 * @param {Express.Request} req - Express request object.
 * @param {Express.Response} res - Express response object.
 * @returns {void}
 */
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

/**
 * Route to delete all favorite countries
 * @name DELETE /favorites/all
 * @function
 * @memberof module:server
 * @param {Express.Request} req - Express request object.
 * @param {Express.Response} res - Express response object.
 * @returns {void}
 */
app.delete('/favorites/all', async (req, res) => {
  try {
    await Favorite.deleteMany({});
    res.status(200).send('All favorites deleted.');
  } catch (err) {
    res.status(500).send(err);
  }
});

/**
 * Route to delete a favorite country by ID
 * @name DELETE /favorites/:id
 * @function
 * @memberof module:server
 * @param {Express.Request} req - Express request object.
 * @param {Express.Response} res - Express response object.
 * @returns {void}
 */
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

/**
 * Start the server and listen on the specified port
 * @memberof module:server
 */
app.listen(port, () => {
  console.log(`Server at http://localhost:${port}`);
});
