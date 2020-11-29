const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const db = require('../config/db');

const gallerySchema = new Schema({
	title: { type: String, default: '' },
	imageUri: { type: String, default: '' },
	description: { type: String, default: '' }
}, { timestamps: { createdAt: true }, collection: 'galleryimages' });

gallerySchema.set('autoIndex', false);

export default db.model('Gallery', gallerySchema);