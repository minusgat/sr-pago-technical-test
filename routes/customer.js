const {container} = require('../di-setup');
const express = require('express');
const validateSchema = require('../middleware/validateSchema');
const {validateJWT} = require('../middleware/manageJWT');
const {createCustomerSchema, authCustomerSchema} = require('../dto/customer');

const customerController = container.resolve('customerController');

const router = express.Router();
router.post('/', validateSchema(createCustomerSchema), customerController.createCustomer);
router.post('/auth', validateSchema(authCustomerSchema), customerController.authCustomer);
router.get('/:id', validateJWT(),customerController.getCustomer);

module.exports = router;
