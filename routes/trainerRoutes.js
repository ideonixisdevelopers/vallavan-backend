const express = require('express');
const router = express.Router();
const trainerController = require('../controllers/trainerController');
const upload = require('../middleware/upload');

router.post(
  '/register',
  upload.fields([
    { name: 'profileImage', maxCount: 1 },
    { name: 'certificate', maxCount: 1 }
  ]),
  trainerController.registerTrainer
);
router.get('/status/:trainerId', trainerController.getTrainerStatus);

module.exports = router;
