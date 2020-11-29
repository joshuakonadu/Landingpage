const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const db = require('../config/db');

const notificationSchema = new Schema({
    seen: { type: Boolean, default: false },
    name: { type: String, default: '' },
    email: { type: String, default: '' },
    phone: { type: String, default: '' },
    message: { type: String, default: '' },
}, { timestamps: { createdAt: true }, collection: 'notifications' });

notificationSchema.set('autoIndex', false);

export default db.model('Notification', notificationSchema);