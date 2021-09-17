var Pedal = require('../models/pedal_model');
var Category = require('../models/pedal_model');

//-------------------------> Home page

exports.index = function (req, res, next) {
	
	Pedal.find({}, 'name category price')
	.populate('category')
	.populate('brand')
	.exec(function (err, pedals) {
		if (err) {return next(err) };
		console.log('pedals: ');
		console.log(pedals);
		if (pedals.length===0) {
			res.render('index', {title: 'The Pedal Shop', error: err, pedals:pedals, message: 'No pedals here for the moment' });
			return;
		}
		// Sucess, found pedals
		res.render('index', {title: 'The Pedal Shop', error: err, pedals:pedals, message: 'Pick a pedal or create a new one' });
	});

};

//-------------------------> Category controllers

//Category read

exports.category_read = function (req, res) {
	res.send('Not implemented: Category Read');
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

//Brands read

exports.brand_read = function (req, res) {
	res.send('Not implemented: Brand Read');
}

//Category create

exports.brand_create = function (req, res) {
	res.send('Not implemented: Brand Create');
}

//Category Update

exports.brand_update = function (req, res) {
	res.send('Not implemented: Brand Update');
}

//Category Delete

exports.brand_delete = function (req, res) {
	res.send('Not implemented: Brand Delete');
}


//-------------------------> Pedal controllers

// Pedals search
exports.pedal_search = function (req, res) {
	res.send('Not implemented: Pedals Search');
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

