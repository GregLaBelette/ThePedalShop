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
	brand: [{type: Schema.Types.ObjectId, ref: 'Brand', required: true}],
	category: [{type: Schema.Types.ObjectId, ref: 'Category', required: true}],
	description: {type: String, required: true, maxLength: 300},
	price: {type: Number, required: true}
});

module.exports = mongoose.model('Pedal', pedalSchema);
module.exports = mongoose.model('Category', categorySchema);
module.exports = mongoose.model('Brand', brandSchema);