const router = require('express').Router();
const ordersControllers = require('../controllers/ordersControllers');
const existTable = require('../middlewares/existTable');
router.get('/', ordersControllers.getAllTables);
router.get('/:table_slug', existTable, ordersControllers.getDataByTable);

module.exports = router;
