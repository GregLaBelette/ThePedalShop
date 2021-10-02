var express = require('express');
var router = express.Router();

//Require controller module
var controller = require('../controllers/pedal_controller');


//-------------------------> HOME PAGE

router.get('/', controller.index);


//-------------------------> Category routes

// GET for displaying categories management page

router.get('/category', controller.category_read);

// POST for creating a category

router.post('/category/create', controller.category_create);

// POST for updating a category

router.post('/category/:id/update', controller.category_update);

// GET for deleting a category

router.get('/category/:id/delete', controller.category_delete);


//-------------------------> Brand routes

// GET for displaying brand management page

router.get('/brand', controller.brand_read);

// POST for creating a brand

router.post('/brand/create', controller.brand_create);

// POST for updating a brand

router.post('/brand/:id/update', controller.brand_update);

// GET for deleting a brand

router.get('/brand/:id/delete', controller.brand_delete);


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