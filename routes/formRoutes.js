const router = require('express').Router();
const formControllers = require('../controllers/formControllers');
router.get('/', formControllers.getForm);
router.post('/', formControllers.uploadFile);
module.exports = router;
