import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const favoriteSchema = new Schema({
  country: String,
  population: Number,
  time: Date,
});

const Favorite = model('Favorite', favoriteSchema);

export default Favorite;
