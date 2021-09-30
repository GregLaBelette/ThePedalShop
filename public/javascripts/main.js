// querySelectors

const message = document.getElementById('message');

const nameInput  = document.getElementById('name');
const brandInput  = document.getElementById('brand');
const categoryInput  = document.getElementById('category');
const descriptionInput  = document.getElementById('description');
const priceInput  = document.getElementById('price');

const clearbtn = document.getElementById('btn-clear');
const createbtn = document.getElementById('btn-create');
const updatebtn = document.getElementById('btn-update');
const deletebtn = document.getElementById('btn-delete');

const picture = document.getElementById('picture-container');

let pedals = document.querySelectorAll('.pedal');
const searchresults = document.getElementById('searchresults');

//Onload events

window.onload = function () {

	setPedalsOnclickEvents();
	getPicturesInList(pedals);

}


// Search results onclick events


function setPedalsOnclickEvents () {

	pedals.forEach((pedal) => {
		pedal.onclick = function () {

			pedals.forEach((elt) => {
				elt.classList.remove('selected')
			});

			pedal.classList.add('selected');

			const id = pedal.childNodes[0].value;
			const name = pedal.childNodes[1].value;
			const brand = pedal.childNodes[2].value;
			const category = pedal.childNodes[3].value;
			const description = pedal.childNodes[4].value;
			const price = pedal.childNodes[5].value;

			nameInput.value = name;
			brandInput.value = brand;
			categoryInput.value = category;
			descriptionInput.value = description;
			priceInput.value = price;

			fetch(`/images/pedals/${id.toString()}.jpg`)
			.then((response) => {

				if (response.status !== 200) {
					picture.innerHTML = `<img id='picture' class='rounded' src='images/pedal-white.png'></img>`;
				}
				else {
					picture.innerHTML = `<img id='picture' class='rounded' src='images/pedals/${id}.jpg'></img>`;
				}
			})
		}
	})  
}  


// Search filters onchange events

nameInput.oninput = search;
brandInput.onchange = search;
categoryInput.onchange = search;
descriptionInput.oninput = search;
priceInput.oninput = search;

function search () {
	const domain = window.location.href;
	let searchUrl = domain + '/pedal/search';
	searchUrl = addQueryParams(searchUrl);
	fetch(searchUrl)
	.then((response) => response.json())
	.then((response) => displaySearchResults(response))
}

function addQueryParams (url) {
	url += `?name=${nameInput.value}`;
	url += `&brand=${brandInput.value}`;
	url += `&category=${categoryInput.value}`;
	url += `&description=${descriptionInput.value}`;
	url += `&price=${priceInput.value}`;
	return (url);
}

function displaySearchResults (response) {
	
	const numberOfResults = response.length;
	if (numberOfResults === 0) {
		message.innerHTML = `<h2>Sorry, no results found</h2>`;
	}
	else if (numberOfResults === 1) {
		message.innerHTML = `<h2>Found 1 pedal, click on it!</h2>`	
	}
	else {
		message.innerHTML = `<h2>Found ${numberOfResults} pedals, pick one!</h2>`
	}

	emptyPedalDiv();
	populatePedalDiv();
	pedals = document.querySelectorAll('.pedal');
	setPedalsOnclickEvents();
	getPicturesInList(pedals);

}

function emptyPedalDiv() {
	searchresults.innerHTML = '';
}

function populatePedalDiv() {
	
}

// CRUD Button events handlers

clearbtn.onclick = function () {
	location.reload();
	nameInput.value = null;
	brandInput.value = null;
	categoryInput.value = null;
	descriptionInput.value = null;
	priceInput.value = null;
}

// Pictures management

function getPicturesInList (pedals) {

	pedals.forEach((pedal) => {

			const id = pedal.childNodes[0].value;
			const miniature = pedal.lastChild.firstChild;

			fetch(`/images/pedals/${id.toString()}.jpg`)
			.then((response) => {

				if (response.status !== 200) {
					console.log(response.status);
				}
				else {
					miniature.style.cssText = `background-image: url("../images/pedals/${id.toString()}.jpg")`;
				}


			});

	})

}

