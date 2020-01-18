let express = require('express');
let controller = require('../controllers/exceptionController');

let router = express.Router({ mergeParams: true });

// TODO
// router.route('/alias').get(controller.indexAlias, controller.index);

router.route('/')
    .get(controller.index)
    .post(controller.store);

router.route('/:id')
	.get(controller.show)
	.put(controller.update)
	.delete(controller.delete);

module.exports = router;
