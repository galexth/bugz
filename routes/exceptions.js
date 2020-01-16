let express = require('express');
let controller = require('../controllers/exceptionController');

let router = express.Router();

router.route('/')
    .get(controller.index)
    .post(controller.store);

router.route('/:id')
	.get(controller.show)
	.put(controller.update)
	.delete(controller.delete);

module.exports = router;
