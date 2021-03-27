const {container} = require('../di-setup');
const express = require('express');
const validateSchema = require('../middleware/validateSchema');
const {validateJWT} = require('../middleware/manageJWT');
const {createCustomerSchema, authCustomerSchema} = require('../dto/customer');

const moviesController = container.resolve('moviesController');

const router = express.Router();
router.get('/:id', moviesController.getMovies);
router.get('/', moviesController.getAllMovies);

module.exports = router;
