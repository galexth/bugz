let mongoose = require('mongoose');

let schema = new mongoose.Schema({
	first_name: {
		type: String,
		required: true,
	},
	last_name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		trim: true,
		lowercase: true,
		unique: true,
		validate: {
			validator: function(v) {
				return /^([\w-.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
			},
		},
	},
	projects: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Project',
	},
}, {
	timestamps: {
		createdAt: 'created_at',
		updatedAt: 'updated_at',
	}
});

module.exports = mongoose.model('User', schema);