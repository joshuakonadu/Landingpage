const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const db = require('../config/db');

const partnerSchema = new Schema({
	active: { type: Boolean, default: true },
	title: { type: String, default: '' },
	image: {
		imageB64: { type: String, default: '' },
		format: { type: String, default: 'jpeg' }
	},
	uri: { type: String, default: '' }
}, { collection: 'partners' })

partnerSchema.set('autoIndex', false);

export default db.model('Partner', partnerSchema);