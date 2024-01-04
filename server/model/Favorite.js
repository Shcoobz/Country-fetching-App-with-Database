/**
 * Represents a MongoDB schema for storing favorite countries.
 * @typedef {Object} FavoriteSchema
 * @property {string} country - The name of the favorite country.
 * @property {number} population - The population of the favorite country.
 * @property {Date} time - The timestamp when the country was added as a favorite.
 */

/**
 * A Mongoose Model representing the 'Favorite' collection in MongoDB.
 * @typedef {import('mongoose').Model<FavoriteSchema>} FavoriteModel
 */

/**
 * Represents a favorite country stored in the 'Favorite' collection.
 * @class Favorite
 * @type {FavoriteModel}
 * @property {string} country - The name of the favorite country.
 * @property {number} population - The population of the favorite country.
 * @property {Date} time - The timestamp when the country was added as a favorite.
 */
import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const favoriteSchema = new Schema({
  country: String,
  population: Number,
  time: Date,
});

/**
 * Mongoose model representing the 'Favorite' collection in MongoDB.
 * @type {FavoriteModel}
 */
const Favorite = model('Favorite', favoriteSchema);

export default Favorite;
