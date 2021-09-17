var express = require('express');
var router = express.Router();

//Require controller module
var controller = require('../controllers/pedal_controller');


//-------------------------> HOME PAGE

router.get('/', controller.index);


//-------------------------> Category routes

// GET for reading categories

router.get('/category', controller.category_read);

// POST for creating a category

router.post('/category/create', controller.category_create);

// POST for updating a category

router.post('/category/:id/update', controller.category_update);

// POST for deleting a category

router.post('/category/:id/delete', controller.category_delete);


//-------------------------> Brand routes

// GET for reading brands

router.get('/brand', controller.brand_read);

// POST for creating a brand

router.post('/brand/create', controller.brand_create);

// POST for updating a category

router.post('/brand/:id/update', controller.brand_update);

// POST for deleting a category

router.post('/brand/:id/delete', controller.brand_delete);


//-------------------------> Pedals routes

// GET for searching thru pedals

router.get('/pedal/search', controller.pedal_search);

// POST for creating a pedal

router.post('/pedal/create', controller.pedal_create);

// POST for updating a pedal

router.post('/pedal/:id/update', controller.pedal_update);

// POST for deleting a pedal

router.post('/pedal/:id/delete', controller.pedal_delete);


//-------------------------> Pictures handling

module.exports = router;