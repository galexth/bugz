let mongoose = require('mongoose');

let schema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	language: {
		type: String,
		required: true,
		enum: ['php', 'js', 'java'],
	},
	type: {
		type: String,
		required: true,
		enum: ['lumen', 'laravel', 'nodejs'],
	},
	api_key: {
		type: String,
		required: true,
	},
}, {
	timestamps: {
		createdAt: 'created_at',
		updatedAt: 'updated_at',
	}
});

module.exports = mongoose.model('Project', schema);