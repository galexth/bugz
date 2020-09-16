let Project = require('../models/project');

module.exports.index = async (req, res) => {
	let collection = await Project.find();
	return res.json(collection);
};

module.exports.store = async (req, res) => {
	const project = await Project.create(req.body);
	res.status(222).json(project);
};

module.exports.update = async (req, res) => {

	let project = await Project.findByIdAndUpdate(req.params.id, req.body, {
		new: true
	});

	if (! project) {
		return res.json({
			status: false,
			message: 'Model not found.',
		})
	}

	return res.json(project);
};

module.exports.show = async (req, res) => {
	const project = await Project.findById(req.params.id);
	return res.json(project);
};

module.exports.delete = async (req, res) => {

	const result = await Project.findByIdAndRemove(req.params.id);

	if (! result) {
		return res.json({
			status: false,
			message: 'Model not found.',
		})
	}

	return res.json({deleted: true});
};
