let Exception = require('../models/exception');

module.exports.index = async (req, res) => {

	const queryStr = req.query.filter(el => ['stage', 'severity'].indexOf(el) >= 0);

	console.log(queryStr);

	let query = Exception.find(queryStr);

	const collection = await query;

	return res.json(collection);
};

module.exports.store = async (req, res) => {
	const exception = await Exception.create(req.body);
	res.status(201).json(exception);
};

module.exports.update = async (req, res) => {

	let exception = await Exception.findByIdAndUpdate(req.params.id, req.body, {
		new: true
	});

	if (! exception) {
		return res.json({
			status: false,
			message: 'Model not found.',
		})
	}

	return res.json(exception);
};

module.exports.show = async (req, res) => {
	const exception = await Exception.findById(req.params.id);
	return res.json(exception);
};

module.exports.delete = async (req, res) => {

	const result = await Exception.findByIdAndRemove(req.params.id);

	if (! result) {
		return res.json({
			status: false,
			message: 'Model not found.',
		})
	}

	return res.json({deleted: true});
};
