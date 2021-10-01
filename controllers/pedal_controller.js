const {Brand, Category, Pedal} = require('../models/pedal_model');
var async = require('async');

//-------------------------> Home page

exports.index = function (req, res) {
	
	async.parallel({
		brands: function (callback) {
			Brand.find({})
			.exec(callback);
		},
		categories: function (callback) {
			Category.find({})
			.exec(callback);
		},
		pedals: function (callback) {
			Pedal.find({})
			.populate('brand')
			.populate('category')
			.exec(callback)
		}
	}, function(err, results) {
		res.render('index', {title:'The Pedal Shop', error:err, brands:results.brands, categories:results.categories, pedals:results.pedals, message:`Pick a pedal among ${results.pedals.length} or create a new one`});
	})
};

//-------------------------> Category controllers

//Category manage

exports.category_read = function (req, res) {

	Category.find ({})
	.exec( function (err, categoriesfound) {

		if (err) { return next(err); }
		res.render('categories', { title: 'The Pedal Shop', message: `${categoriesfound.length} Pedal categories found`} );
	})

}

//Category create

exports.category_create = function (req, res) {
	res.send('Not implemented: Category Create');
}

//Category Update

exports.category_update = function (req, res) {
	res.send('Not implemented: Category Update');
}

//Category Delete

exports.category_delete = function (req, res) {
	res.send('Not implemented: Category Delete');
}

//-------------------------> Brand controllers

//Brands manage

exports.brand_read = function (req, res, next) {

	Brand.find ({})
	.exec( function (err, brandsfound) {

		if (err) { return next(err); }
		res.render('brands', { title: 'The Pedal Shop', message: `${brandsfound.length} Pedal brands found`} );
	})

}

//Brand create

exports.brand_create = function (req, res) {
	res.send('Not implemented: Brand Create');
}

//Brand Update

exports.brand_update = function (req, res) {
	res.send('Not implemented: Brand Update');
}

//Brand Delete

exports.brand_delete = function (req, res) {
	res.send('Not implemented: Brand Delete');
}


//-------------------------> Pedal controllers

// Pedals search
exports.pedal_search = function (req, res, next) {

	let query = {
		'name': { $regex: req.query.name, $options: 'i'},
		'description': { $regex: req.query.description, $options: 'i' }
	};

	if (req.query.brand !== '') {query.brand = {$in: req.query.brand}};
	if (req.query.category !== '') {query.category = {$in: req.query.category}};
	if (req.query.price !== '' && isNaN(parseInt(req.query.price)) === false) {query.price = {$in: req.query.price}};

	Pedal.find(query)
	.populate('brand')
	.populate('category')
	.exec( function (err, pedalsfound) {
		if (err) {console.log(err);
							return next(err)}
		//Success
		console.log(pedalsfound);
		res.json(pedalsfound);
	});

}

// Pedal create
exports.pedal_create = function (req, res) {
	res.send('Not implemented: Pedal Create');
}

// Pedal update

exports.pedal_update = function (req, res) {
	res.send('Not implemented: Pedal Update');
}

// Pedal Delete

exports.pedal_delete = function (req, res) {
	res.send('Not implemented: Pedal Delete');
}


//-------------------------> Pictures management

// Picture search

// Picture create

// Picture update

// Picture delete

