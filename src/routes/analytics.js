const router = require('express').Router();
const controller = require('../controllers/analyticsController');

router.route('/blocked').get(controller.blocked);
router.route('/assurance').get(controller.assurance);
router.route('/period').get(controller.period);
router.route('/sended').get(controller.sended);
router.route('/notification').get(controller.notification);

module.exports = router;
