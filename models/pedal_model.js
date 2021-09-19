var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var categorySchema = new Schema ({
	name: {type: String, required: true}
});

var brandSchema = new Schema ({
	name: {type: String, required: true}
});

var pedalSchema = new Schema ({
	name: {type: String, required: true, maxLength: 30},
	brand: {type: Schema.Types.ObjectId, ref: 'Brand', required: true},
	category: {type: Schema.Types.ObjectId, ref: 'Category', required: true},
	description: {type: String, required: true, maxLength: 3000},
	price: {type: Number, required: true}
});

const Category = mongoose.model('Category', categorySchema);
const Brand = mongoose.model('Brand', brandSchema);
const Pedal = mongoose.model('Pedal', pedalSchema);

module.exports = {Category, Brand, Pedal};