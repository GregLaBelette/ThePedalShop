const {Brand, Category, Pedal} = require('../models/pedal_model');
var async = require('async');
const { body,validationResult } = require('express-validator');

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
		res.render('categories', { title: 'The Pedal Shop', categories: categoriesfound, message: `${categoriesfound.length} Pedal categories found`} );
	})

}

//Category create

exports.category_create = [

	//validate and sanitise
	body('name', 'A new category name is required!').trim().isLength({min: 1}).escape(),

	// Process
	
	(req, res, next) => {

		//Extract errors from validation
		const errors = validationResult(req);

		//Create new Category
		var newCategory = new Category({
			name: req.body.name
		})

		if (!errors.isEmpty()) {
			// There are errors, render page with errors named
			
			Category.find({})
			.exec(function (err, categoriesfound) {
				if (err) { return next(err) };
				let errorText = '';
				errors.array().forEach((error) => {
					errorText += `${error.msg} `
				})
				res.render('categories', {title: 'The Pedal Shop', categories: categoriesfound, message: `${errorText}`} );
			})
		}
		else {
			//Data is valid

			//Check for category with same name
			Category.findOne( {'name': req.body.name} )
			.exec(function (err, found_category) {
				if (err) { return next(err) };

				if (found_category) {
					
					//Category Exists, render!
					Category.find({})
					.exec(function (err, categoriesfound) {
						if (err) { return next(err) }
						res.render('categories', {title: 'The Pedal Shop', categories: categoriesfound, message: `There is already a category named '${req.body.name}'`} );
					})
				}
				else {

					//Save new category
					newCategory.save( function (err) {
						if (err) { return next(err) }
						// Success
						Category.find({})
						.exec(function (err, categoriesfound) {
							if (err) {return next(err) }
							res.render('categories', {title: 'The Pedal Shop', categories: categoriesfound, message: `Successfully created category '${req.body.name}'`} ); 
						})
					});
				}

			});
		}
	}
]

//Category Update

exports.category_update = [

	//validate and sanitise
	body('name', 'A new category name is required!').trim().isLength({min: 1}).escape(),

	// Process
	
	(req, res, next) => {

		//Extract errors from validation
		const errors = validationResult(req);

		//Create new Category
		var newCategory = new Category({
			name: req.body.name,
			_id: req.params.id
		})

		if (!errors.isEmpty()) {
			// There are errors, render page with errors named
			
			Category.find({})
			.exec(function (err, categoriesfound) {
				if (err) { return next(err) };
				let errorText = '';
				errors.array().forEach((error) => {
					errorText += `${error.msg} `
				})
				res.render('categories', {title: 'The Pedal Shop', categories: categoriesfound, message: `${errorText}`} );
			})
		}
		else {
			//Data is valid

			//Check for category with same name
			Category.findOne( {'name': req.body.name} )
			.exec(function (err, found_category) {
				if (err) { return next(err) };

				if (found_category) {
					
					//Category Exists, render!
					Category.find({})
					.exec(function (err, categoriesfound) {
						if (err) { return next(err) }
						res.render('categories', {title: 'The Pedal Shop', categories: categoriesfound, message: `There is already a category named '${req.body.name}'`} );
					})
				}
				else {

					//Save new category
					Category.findByIdAndUpdate(req.params.id, newCategory, {}, function (err) {
						if (err) { return next(err) }
						// Success
						Category.find({})
						.exec(function (err, categoriesfound) {
							if (err) {return next(err) }
							res.render('categories', {title: 'The Pedal Shop', categories: categoriesfound, message: `Successfully updated category to '${req.body.name}'`} ); 
						})
					});
				}

			});
		}
	}
]

//Category Delete

exports.category_delete = function (req, res, next) {

		Category.findByIdAndRemove(req.params.id, function (err, removedCategory) {
			if (err) { return next(err) }

			Category.find({})
			.exec( function (err, categoriesfound) {
				if (err) {return next(err) }

				res.render('categories', {title:'The Pedal Shop', categories: categoriesfound, message: `Successfully deleted category '${removedCategory.name}'`});
			})
	})
}

//-------------------------> Brand controllers

//Brands manage

exports.brand_read = function (req, res, next) {

	Brand.find ({})
	.exec( function (err, brandsfound) {

		if (err) { return next(err); }
		res.render('brands', { title: 'The Pedal Shop', brands: brandsfound, message: `${brandsfound.length} Pedal brands found`} );
	})

}

//Brand create

exports.brand_create = [

	//validate and sanitise
	body('name', 'A new brand name is required!').trim().isLength({min: 1}).escape(),

	// Process
	
	(req, res, next) => {

		//Extract errors from validation
		const errors = validationResult(req);

		//Create new Brand
		var newBrand = new Brand({
			name: req.body.name
		})

		if (!errors.isEmpty()) {
			// There are errors, render page with errors named
			
			Brand.find({})
			.exec(function (err, brandsfound) {
				if (err) { return next(err) };
				let errorText = '';
				errors.array().forEach((error) => {
					errorText += `${error.msg} `
				})
				res.render('brands', {title: 'The Pedal Shop', brands: brandsfound, message: `${errorText}`} );
			})
		}
		else {
			//Data is valid

			//Check for category with same name
			Brand.findOne( {'name': req.body.name} )
			.exec(function (err, found_brand) {
				if (err) { return next(err) };

				if (found_brand) {
					
					//Brand Exists, render!
					Brand.find({})
					.exec(function (err, brandsfound) {
						if (err) { return next(err) }
						res.render('brands', {title: 'The Pedal Shop', brands: brandsfound, message: `There is already a brand named '${req.body.name}'`} );
					})
				}
				else {

					//Save new category
					newBrand.save( function (err) {
						if (err) { return next(err) }
						// Success
						Brand.find({})
						.exec(function (err, brandsfound) {
							if (err) {return next(err) }
							res.render('brands', {title: 'The Pedal Shop', brands: brandsfound, message: `Successfully created brand '${req.body.name}'`} ); 
						})
					});
				}

			});
		}
	}
]

//Brand Update

exports.brand_update = [

	//validate and sanitise
	body('name', 'A new brand name is required!').trim().isLength({min: 1}).escape(),

	// Process
	
	(req, res, next) => {

		//Extract errors from validation
		const errors = validationResult(req);

		//Create new Brand
		var newBrand = new Brand({
			name: req.body.name,
			_id: req.params.id
		})

		if (!errors.isEmpty()) {
			// There are errors, render page with errors named
			
			Brand.find({})
			.exec(function (err, brandsfound) {
				if (err) { return next(err) };
				let errorText = '';
				errors.array().forEach((error) => {
					errorText += `${error.msg} `
				})
				res.render('brands', {title: 'The Pedal Shop', brands: brandsfound, message: `${errorText}`} );
			})
		}
		else {
			//Data is valid

			//Check for brand with same name
			Brand.findOne( {'name': req.body.name} )
			.exec(function (err, found_brand) {
				if (err) { return next(err) };

				if (found_brand) {
					
					//Brand Exists, render!
					Brand.find({})
					.exec(function (err, brandsfound) {
						if (err) { return next(err) }
						res.render('brands', {title: 'The Pedal Shop', brands: brandsfound, message: `There is already a brand named '${req.body.name}'`} );
					})
				}
				else {

					//Save new brand
					Brand.findByIdAndUpdate(req.params.id, newBrand, {}, function (err) {
						if (err) { return next(err) }
						// Success
						Brand.find({})
						.exec(function (err, brandsfound) {
							if (err) {return next(err) }
							res.render('brands', {title: 'The Pedal Shop', brands: brandsfound, message: `Successfully updated brand to '${req.body.name}'`} ); 
						})
					});
				}

			});
		}
	}
]

//Brand Delete

exports.brand_delete = function (req, res, next) {

	Brand.findByIdAndRemove(req.params.id, function (err, removedBrand) {
		if (err) { return next(err) }

		Brand.find({})
		.exec( function (err, brandsfound) {
			if (err) {return next(err) }

			res.render('brands', {title:'The Pedal Shop', brands: brandsfound, message: `Successfully deleted brand '${removedBrand.name}'`});
		})
})
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
		if (err) { return next(err) }
		//Success
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

