// Modules

var express = require('express');
var mongoose = require('mongoose');
var async = require('async');

// Models

const {Brand, Category, Pedal} = require('../models/pedal_model');

//Database connection

var mongoDB = 'mongodb+srv://gregLaBelette:WgvCzBCpWtbYu4v5@pedalshopcluster.cgddo.mongodb.net/PedalShop-Dev?retryWrites=true&w=majority';
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error'));


//Pedal Data

let brands = ['Fulltone','J.Rockett Audio Designs','JHS Pedals','Jam Pedals','Xotic Effects','Electro Harmonix'];

let categories = ['Overdrive','Distortion','Delay','Tremolo'];

let pedals  = [
{
	name:'OCD',
	brand:'Fulltone',
	category:'Overdrive',
	description:'The OCD was the first pedal to use Mosfets as clipping devices. Another first was their configuration as "hard clippers connected to v-ref" instead of to ground, as was the norm. These things contribute greatly as to why the OCD has such touch-sensitivity...why they react so well when the strings are hit hard or soft, and why they sound & feel different than all other pedals out there, 90% of which are just slight tweaks of the Tube Screamer.',
	price:166
},
{
	name:'Custom-Shop OCD-GE',
	brand:'Fulltone',
	category:'Distortion',
	description:'Recently I stumbled across a reasonably large stash of the right kind of Germanium diodes so I ponied-up and bought all of them. So I decided to do a run of the ultimate OCD: a Custom Shop offering with a few circuit tweaks using 2 x Mosfets plus 2 x Germanium diodes, and one hell of a beautiful paint job... Metallic Teal with a chrome undercoat! This beauty morphs between blues and greens depending on the light and angle. And what would the ultimate OCD be without a Blue LED? The sound? Great definition, more tube-like feel, a bit wider dynamic range, more sustain, and a more focused single-note tone. And as with all Fulltone pedals... 100% Built in the USA.',
	price:242
},
{
	name:'Supa-Trem Jr',
	brand:'Fulltone',
	category:'Tremolo',
	description:'It\'s a much, much smaller than the ST-1 at only 3.9" wide x 4" deep, and more intelligent version of the epic Supa-Trem1. Sporting True-Bypass,Tap-Tempo, external Tap jack, Half/Double hold feature, up to 15dB boost, true Square, Sine, and the natural heartbeat-like Warble wave-forms! It also can do speeds so slow that a full cycle takes around 10 seconds, and fast speeds beyond 220bpm. The heart of the ST-1 is still there, the warm Analog Devices JFET preamp. And this pedal is so small it will fit in your pocket, and with its top-mounted jacks, will fit in any little spot on your board. Don\'t forget, just like the ST-1, the Jr also works as an incredible clean boost with the Mix control turned down!',
	price:189
},
{
	name:'.45 Caliber',
	brand:'J.Rockett Audio Designs',
	category:'Overdrive',
	description:'It is a recreation of the original 1962 JTM 45 sound, overdriven. The sonic influence came directly from the old Malcolm Young, brilliantly crunchy rhythm tones and the old Pete Townsend Live at Leeds, “face-melting” goodness! To achieve that sound seems like an easy task but this design proved to be quite a challenge. After a year or so we feel we have nailed it, not only in sound, but also in feel.',
	price:215
},
{
	name:'Clockwork',
	brand:'J.Rockett Audio Designs',
	category:'Delay',
	description:'This is old school meets new school. Classic BBD delay chips that are digitally controlled for tap tempo only. True stereo output (One side out of phase) (2) Expression pedal inputs to control Time and Repeats. Foot switchable modulation with speed and depth. “Always On” boost which can be used whether the delay is engaged or not. Experimenting with the modulation controls will get you chorus, rotating speaker and flange sounds. This is as musical as an echo can get, go from lush long delays to amazing room like slap back echoes. Repeats can be set short enough to achieve chorus/flange sounds and long enough for crazy long repeats into oscillation if you so desire.',
	price:444
},
{
	name:'Tidewater Tremolo',
	brand:'JHS Pedals',
	category:'Tremolo',
	description:'Have you ever ridden the sonic waves of a vintage Fender blackface or Vox tremolo flowing like water from the speaker? Then you know that this kind of tone can make you feel like you’re sailing on a million dollar yacht. The Tidewater tremolo faithfully recreates this beloved amp tremolo with a warmth and character you would only expect from a vintage amp. With simple controls and a small footprint, you’ll be sailing the high seas of tone with the Tidewater tremolo.',
	price:165
},
{
	name:'Morning Glory',
	brand:'JHS Pedals',
	category:'Overdrive',
	description:'The Morning Glory is undoubtedly our most well-known overdrive pedal, winning more awards and receiving more accolades than any of our other designs. We worked hard to make it one of the most transparent overdrives out there. When you want to add some mid- to low-level grit to your crystal-clean tone, use the Morning Glory. When you want to boost a crunchy tone into thicker sustain, use the Morning Glory. When you need to add tube-like touch response to a less-than-ideal amp, use the Morning Glory. When you need to switch between two gain levels on the fly...Yeah, you get the idea.',
	price:239
},
{
	name:'Angry Charlie',
	brand:'JHS Pedals',
	category:'Distortion',
	description:'The Angry Charlie has become a staple of the JHS line over the years, and it’s a force to be reckoned with in the high-gain pedal territory. Its ability to convincingly and accurately breathe JCM800 tones into any rig has made it a popular choice for guitarists of all genres. And unlike many other British amp-in-a-box pedals, the Angry Charlie V3 sports a 3-band tone stack, just like the Marshalls, helping nail those warm yet searing tones and boundless sustain. If you are a glutton for high-gain overdrive/distortion that has a British flavor, the Angry Charlie V3 will change your life. Well, your gear life.',
	price:239
},
{
	name:'The Bonsai',
	brand:'JHS Pedals',
	category:'Overdrive',
	description:'In the late 1970\'s the overdrive pedal was arguably perfected when Japanese engineers designed the sound that we now know as the heart and soul of so many of our favorite artists, recordings and sounds. Players ranging from The Edge, Trey Anastasio, Buddy Guy, Kirk Hammett, John Mayer, SRV, Carlos Santana and thousands more from every possible genre have utilized and depended on this classic iconic green box. If a single effect pedal was chosen to board a Voyager 3 mission and be solely responsible for showing the universe the sound of overdrive, it would undoubtably be Tube Screamer. It is probably the most produced and sold pedal in the history of guitar pedals! The Bonsai is our tribute to one of the greatest pedals ever created.',
	price:249
},
{
	name:'3 Series Delay',
	brand:'JHS Pedals',
	category:'Delay',
	description:'The JHS Pedals 3 Series is a collection of pedals designed to give you affordability and simplicity without compromising quality. Each 3 Series pedal is made by us in Kansas City, MO, using high-quality parts, quality control, and attention to every detail. Each pedal has three simple controls and one toggle that offer a wide range of sounds, perfect for beginners and professionals alike. The JHS Pedals 3 Series will inspire your playing and help you explore new sounds at a totally approachable price point.',
	price:119
},
{
	name:'Tube Dreamer',
	brand:'Jam Pedals',
	category:'Overdrive',
	description:'Back when we originally introduced the Tubedreamer58 there weren’t as many 808 style pedals out there. We claimed then as we claim now; this is probably the best 808 style overdrive you can get your hands on! With a carefully tuned, added midrange frequency register, the Tubedreamer delivers warm and rich overdriven sound through any amp. A pivotal difference between the Tubedreamer and other Tubescreamers, is our choice to go with 3 diodes for asymmetrical clipping instead of symmetrical, enhancing the responsiveness of the pedal to fretting and picking nuances. Made with carbon comp resistors, the Tubedreamer employs the legendary JRC4558D chip to deliver its classic sound, just like in the original, sought-after 808\'s, and also introduces a wider gain range accessible by the high-gain-stage toggle-switch.',
	price:168
},
{
	name:'Eureka! Fuzz',
	brand:'Jam Pedals',
	category:'Distortion',
	description:'We set out to create a circuit that combined the singing, dynamic mid-range of germanium fuzz pedals with the gritty, full-bodied and well-rounded Muff-style fuzz distortion. Well... Eureka! Utilizing silicon transistors in a proprietary architecture to get the best of both worlds, the Eureka! is a phenomenal team player, flawlessly performing with all kinds of different effects, guitars and amps, all-the-while managing to maintain its distinct head-turning personality.',
	price:188
},
{
	name:'Delay Llama',
	brand:'Jam Pedals',
	category:'Delay',
	description:'The Delay Llama is a tone machine that will become an indispensable part of your sound adding warmth and depth through organic repeats which seamlessly integrate into your playing, courtesy of its BBD chips, faithful reproductions of the Panasonic MN3205. Its straight forward traditional 3-knob layout is addressed to delay users who are looking to elegantly enhance their hard-earned tone, similarly to how a tape-echo machine would. The Delay Llama can also be used with bass guitars.',
	price:218
},
{
	name:'Lucky Cat Pink',
	brand:'JHS Pedals',
	category:'Delay',
	description:'In 2007, we released our very first delay pedal, the Pink Panther. That pedal was instantly recognizable with it’s bright pink case and shiny silver knobs. Unfortunately, not every cat has nine lives, and we only produced about 100 units before the chip set was no longer available, forcing the pedal out of production. It was also quirky and unreliable, as early designs tend to be. We decided to revisit this now beloved delay and rebuild it from the ground up. We now present a simple digital delay/echo that has everything you need and nothing you don’t. This may be your lucky day!',
	price:239
},
{
	name:'Harmonious Monk Tremolo',
	brand:'Jam Pedals',
	category:'Tremolo',
	description:'We have a deep love for the harmonic tremolo’s unique modulation character: a little bit phase-y and a little bit pulsing. It can add a complete, enveloping texture over your whole guitar tone, or sit more subtly as a fantastic ‘widening’ effect either straight mono or in a wet/dry rig. We wanted to address some of the issues we found in our other favourite examples of the effect and add a superb amplitude trem to boot; enter the Harmonious Monk, a collaboration between JAM pedals and That Pedal Show!',
	price:248
},
{
	name:'Soul Driven',
	brand:'Xotic Effects',
	category:'Overdrive',
	description:'Add “Soul” to your sound by producing creamy boost and overdriven tones that enhance harmonics while maintaining the transparency of your guitar tone. The pedal is equipped with incredibly flexible tone shaping options to help customize your sound.',
	price:179
},
{
	name:'RC Booster',
	brand:'Xotic Effects',
	category:'Overdrive',
	description:'Production of the RC Booster (Version 1) was discontinued by end of 2017. We faithfully (promise) re-created the RC Booster, but added a twist!',
	price:179
},
{
	name:'Green Russian Big Muff',
	brand:'Electro Harmonix',
	category:'Distortion',
	description:'Back by overwhelming demand… in a mini package! The cult classic Green Russian Big Muff first shook the ground in the mid-1990s. Since then it has been heralded by guitarists and bassists for its devastating low-end and unique sludge and sizzle. The EHX Green Russian Big Muff creates a huge tone that is all its own, but is undeniably Big Muff.',
	price:88
},
{
	name:'Deluxe Memory Man',
	brand:'Electro Harmonix',
	category:'Delay',
	description:'Nothing can compare to the organic sound of analog delay, and no one does analog like the Deluxe Memory Man — the most in-demand analog delay ever built! ',
	price:209
},
{
	name:'Super Pulsar',
	brand:'Electro Harmonix',
	category:'Tremolo',
	description:'Sculpt the tremolo’s shape with adjustable sine, triangle and pulse waveforms while tap tempo and tap divide ensure synchronicity. Create your own rhythmic patterns and store them. Save and recall up to eight customized preset programs. Conjure moving tremolos on-the-fly with EXP control over Rate, Depth, Shape, Phase or Volume. Deluxe I/O lets you choose stereo in/out, mono in/stereo out, stereo in/mono out or mono in/mono out operation.',
	price:231
},
{
	name:'Chill',
	brand:'Jam Pedals',
	category:'Tremolo',
	description:'Plug your guitar into this no-frills analog sine-wave tremolo, dial in your settings and enjoy lush tremolo sounds like those found in vintage Fender® Amps! The Chill is built with carbon comp resistors and as such it can also produce a warm and harmonically rich boost of your sound by setting the Depth control to 0, and adjusting the Level to your preference.',
	price:188
}
]


//Controllers

module.exports.populatebrands = function () {
	
	brands.forEach((elt) => {

		let newBrand = new Brand({
			name: elt
		});

		newBrand.save(() => {
			console.log('brand saved');
		});

	});

}

module.exports.populatecategories = function () {

	categories.forEach((elt) => {

		let newCategory = new Category({
			name: elt
		});

		newCategory.save(() => {console.log('category saved')});

	})

}

module.exports.populatepedals = function () {

	pedals.forEach((elt) => {

		async.parallel ({

			brand: function (callback) {
				Brand.findOne({ 'name': elt.brand })
				.exec(callback);
			},
			category: function (callback) {
				Category.findOne({ 'name': elt.category })
				.exec(callback);
			}

		}, function (err, results) {

			if (err) { return next(err); }

			if (results.brand == null) {
				let err = new Error('Brand not found');
				err.status = 404;
				return next(err)
			}

			if (results.category == null) {
				let err = new Error('Category not found');
				err.status = 404;
				return next(err)
			}
		// Success, create Pedal with Brand ID and Category ID
		let newPedal = new Pedal({
			name: elt.name,
			brand: results.brand._id,
			category: results.category.id,
			description: elt.description,
			price:elt.price,
		});
		newPedal.save(() => { console.log(newPedal) });

	});

	});

}

deletebrands = function (next) {
	Brand.deleteMany({}, () => {
		console.log('Brands emptied');
		next();
		} );
}

deletecategories = function (next) {
	Category.deleteMany({}, () => {
		console.log('Categories emptied');
		next();
		});
}

deletepedals = function (next) {
	Pedal.deleteMany({}, () => {
		console.log('Pedals emptied');
		next();
		});
}


module.exports.deleteall = function () {

	async.parallel([deletebrands,deletecategories,deletepedals],process.exit);

};

