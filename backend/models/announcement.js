const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const db = require('../config/db');

const announcementSchema = new Schema({
	title: { type: String, default: '' },
	image: {
		imageB64: { type: String, default: "" },
		format: { type: String, default: "jpeg" },
	},
	description: { type: String, default: '' },
}, { timestamps: { createdAt: true }, collection: 'announcements' });

announcementSchema.set('autoIndex', false);

export default db.model('Announcement', announcementSchema);