let mongoose = require('mongoose');

let schema = new mongoose.Schema({
	project: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Project',
		required: true,
	},
	stage: {
		type: String,
		default: 'development',
		enum: ['development', 'production'],
	},
	severity: {
		type: String,
		default: 'error',
		enum: ['error', 'warning', 'info'],
	},
	handled: {
		type: Boolean,
		default: false,
	},
	status: {
		type: String,
		default: 'open',
		enum: ['open', 'closed', 'ignored', 'hidden'],
	},
	error_class: {
		type: String,
		required: true,
	},
	message: {
		type: String,
		required: true,
	},
	context: {
		type: String,
		required: true,
	},
	files: [{
		type: new mongoose.Schema({
			class: {
				type: String,
				required: true,
			},
			file: {
				type: String,
				required: true,
			},
			line: {
				type: Number,
				required: true,
			},
			code: {
				type: Object,
				default: {},
			},
		}),
		required: true,
	}],
}, {
	timestamps: {
		createdAt: 'created_at',
		updatedAt: 'updated_at',
	}
});

module.exports = mongoose.model('Exception', schema);