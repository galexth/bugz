let User = require('../models/user');

module.exports.index = async (req, res) => {
	let collection = await User.find();
	return res.json(collection);
};

module.exports.store = async (req, res) => {
	const user = await User.create(req.body);
	res.status(201).json(user);
};

module.exports.update = async (req, res) => {

	let user = await User.findByIdAndUpdate(req.params.id, req.body, {
		new: true
	});

	if (! user) {
		return res.json({
			status: false,
			message: 'Model not found.',
		})
	}

	return res.json(user);
};

module.exports.show = async (req, res) => {
	const user = await User.findById(req.params.id);
	return res.json(user);
};

module.exports.delete = async (req, res) => {

	const result = await User.findByIdAndRemove(req.params.id);

	if (! result) {
		return res.json({
			status: false,
			message: 'Model not found.',
		})
	}

	return res.json({deleted: true});
};
