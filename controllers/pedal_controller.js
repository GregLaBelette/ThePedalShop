var Pedal = require('../models/pedal_model');
var Category = require('../models/pedal_model');

//-------------------------> Home page

exports.index = function (req, res, next) {
	
	Pedal.find({}, 'name category price')
	.populate('category')
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
	res.send('Not implemented: Pedal Create');
}

//Category Delete

exports.category_delete = function (req, res) {
	res.send('Not implemented: Pedal Create');
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

