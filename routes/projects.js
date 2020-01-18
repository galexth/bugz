let express = require('express');
let controller = require('../controllers/projectController');
const exceptionRouter = require('./exceptions');

let router = express.Router();

router.route('/')
    .get(controller.index)
    .post(controller.store);

router.route('/:project')
	.get(controller.show)
	.put(controller.update)
	.delete(controller.delete);

router.use('/:project/exceptions', exceptionRouter);

module.exports = router;
