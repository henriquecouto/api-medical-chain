const router = require('express').Router();
const controller = require('../controllers/userController');

router.route('/register').post(controller.createUser);
router.route('/login').post(controller.login);

module.exports = router;
