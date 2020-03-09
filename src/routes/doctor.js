const router = require('express').Router();
const controller = require('../controllers/doctorController');
const authMiddleware = require('../middlewares/auth');

router.use(authMiddleware);

router.route('/').get(controller.getDoctors);
router.route('/:id').get(controller.getDoctor);
router
  .route('/:id')
  .put(controller.update)
  .patch(controller.update);

module.exports = router;
