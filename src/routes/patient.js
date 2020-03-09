const router = require('express').Router();
const controller = require('../controllers/patientController');
const authMiddleware = require('../middlewares/auth');

router.use(authMiddleware);

router.route('/').get(controller.getPatients);
router.route('/:id').get(controller.getPatient);
router
  .route('/:id')
  .put(controller.update)
  .patch(controller.update);

module.exports = router;
