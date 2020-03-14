let Exception = require('../models/exception');
let Paginator = require('../utils/paginator');
let catchAsync = require('../utils/catchAsync');
const createError = require('http-errors');
let _ = require('lodash');

module.exports.index = catchAsync(async (req, res) => {

	let queryStr = _.pick(req.query, ['stage', 'severity']);
	queryStr.project = req.params.project;

	let sort = req.params.sort || '-created_at';
	let fields = req.params.fields || '';

	let query = Exception.find(queryStr)
		.select(fields.split(',').join(' '))
		.sort(sort.split(',').join(' '));

	let results = await new Paginator(query, req.params.offset, req.params.limit)
		.paginate();

	return res.json(results);
});

module.exports.store = catchAsync(async (req, res) => {

	if (! req.body.project) req.body.project = req.params.project;

	const exception = await Exception.create(req.body);
	res.status(201).json(exception);
});

module.exports.update = catchAsync(async (req, res) => {

	if (! req.body.project) req.body.project = req.params.project;

	let exception = await Exception.findByIdAndUpdate(req.params.id, req.body, {
		new: true
	});

	if (! exception) {
		return createError('Model not found.', 404);
	}

	return res.json(exception);
});

module.exports.show = catchAsync(async (req, res) => {
	const exception = await Exception.findById(req.params.id);
	return res.json(exception);
});

module.exports.delete = catchAsync(async (req, res) => {

	const result = await Exception.findByIdAndRemove(req.params.id);

	if (! result) {
		return createError('Model not found.', 404);
	}

	return res.json({deleted: true});
});
