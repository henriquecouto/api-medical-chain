const router = require('express').Router();
const controller = require('../controllers/appointmentController');
const authMiddleware = require('../middlewares/auth');

router.route('/external').patch(controller.externalGetAppointments);

router.use(authMiddleware);

router.route('/').post(controller.createAppointment);
router.route('/').get(controller.getAppointments);
router.route('/:id').get(controller.getAppointment);
router
  .route('/:id')
  .put(controller.update)
  .patch(controller.update);

router.route('/blocked/:id').get(controller.getBlockedAppointment);
router.route('/update-treatment').post(controller.updateTreatment);
router.route('/allow-access').post(controller.allowAccess);

module.exports = router;
