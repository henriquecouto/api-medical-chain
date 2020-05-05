const router = require('express').Router();
const controller = require('../controllers/analyticsController');

router.route('/blocked').get(controller.blocked);
router.route('/assurance').get(controller.assurance);
router.route('/period').get(controller.period);

module.exports = router;
