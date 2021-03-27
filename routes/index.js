const express = require('express');
const customerRouter = require('./customer');
const moviesRouter = require('./movies');

const router = express.Router();
router.use('/customers', customerRouter);
router.use('/movies', moviesRouter);

module.exports = router;
