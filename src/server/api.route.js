const Router = require('express').Router;
const router = new Router();
const multer = require('multer');
const csvFormatterMiddleware = require('./middleware/csvFormatterMiddleware');
const sqlFormatterMiddleware = require('./middleware/sqlFormatterMiddleware');

const formatters = [csvFormatterMiddleware, sqlFormatterMiddleware];

router.use(multer().array());

router.post('/order', formatters, require('./api/orderBy'));
router.post('/group', formatters, require('./api/groupBy'));

module.exports = router;
