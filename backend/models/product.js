const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const db = require('../config/db');

productSchema = new Schema({
	active: { type: Boolean, default: true },
	title: { type: String, default: '' },
	shortDescription: { type: String, default: '' },
	description: { type: String, default: '' },
	images: {
		type: [{
			format: String,
			imageB64: String
		}], default: []
	},
	price: { type: Number, required: [true, 'price has to be filled'] },
}, { timestamps: { createdAt: true }, collection: 'products' });

productSchema.set('autoIndex', false);


export default db.model('Product', productSchema);