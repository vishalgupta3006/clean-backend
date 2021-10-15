const router = require("express").Router();

router.use('/auth', require('./auth'));
router.use('/register',require('./register'));
router.use('/lead', require('./lead'));
router.use('/data/lead', require('./dataLead'))

module.exports = router;