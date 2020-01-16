let Exception = require('../models/exception');
let Paginator = require('../utils/paginator');

module.exports.index = async (req, res) => {

	// TODO
	// const queryStr = req.query.filter(el => ['stage', 'severity'].indexOf(el) >= 0);

	let sort = req.params.sort || '-created_at';
	let fields = req.params.fields || '';

	let query = Exception.find({})
		.select(fields.split(',').join(' '))
		.sort(sort.split(',').join(' '));

	let results = await new Paginator(query, req.params.offset, req.params.limit)
		.paginate();

	return res.json(results);
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
