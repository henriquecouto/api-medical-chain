const router = require('express').Router();
const controller = require('../controllers/userController');
const authMiddleware = require('../middlewares/auth');

router.route('/login').post(controller.login);

router.use(authMiddleware);
router.route('/register').post(controller.createUser);

module.exports = router;
