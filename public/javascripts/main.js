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
	setPedalsOnclickEvents(pedals);
	getPicturesInList(pedals);

}


// Search results onclick events


function setPedalsOnclickEvents (pedals) {

	pedals.forEach((pedal) => {
		pedal.onclick = function () {

			pedals.forEach((elt) => {
				elt.classList.remove('selected')
			});

			pedal.classList.add('selected');

			const id = pedal.children[0].value;
			const name = pedal.children[1].value;
			const brand = pedal.children[2].value;
			const category = pedal.children[3].value;
			const description = pedal.children[4].value;
			const price = pedal.children[5].value;

			nameInput.value = name;
			brandInput.value = brand;
			categoryInput.value = category;
			descriptionInput.value = description;
			priceInput.value = price;

      message.innerHTML = `<h2 class='px-5'>${name}, from ${pedal.querySelector('.brand').innerText} selected</h2>`

			fetch(`/images/pedals/${id.toString()}.jpg`)
			.then((response) => {

				if (response.status !== 200) {
					picture.innerHTML = `<img id='picture' class='rounded' src='/images/pedal-white.png'></img>`;
				}
				else {
					picture.innerHTML = `<img id='picture' class='rounded' src='/images/pedals/${id}.jpg'></img>`;
				}
			})
		}
	})
}


// Search filters onchange events

nameInput.oninput = function () {
	if (categoryInput.value === 'manage') {
		categoryInput.value = '';
	}
	if (brandInput.value === 'manage') {
		brandInput.value = '';
	}
	search();
};
brandInput.onchange = function () {
	if (categoryInput.value === 'manage') {
		categoryInput.value = '';
	}
	search();
};
categoryInput.onchange = function () {
	if (brandInput.value === 'manage') {
		brandInput.value = '';
	}
	search();
};
descriptionInput.oninput = function () {
	if (categoryInput.value === 'manage') {
		categoryInput.value = '';
	}
	if (brandInput.value === 'manage') {
		brandInput.value = '';
	}
	search();
};
priceInput.oninput = function () {
	if (categoryInput.value === 'manage') {
		categoryInput.value = '';
	}
	if (brandInput.value === 'manage') {
		brandInput.value = '';
	}
	search();
};

function search () {

	if (brandInput.value === 'manage') {
		location.href = 'shop/brand';
		return;
	}

	if (categoryInput.value === 'manage') {
		location.href = 'shop/category';
		return;
	}

	let searchUrl = '/shop/pedal/search';
	searchUrl = addQueryParams(searchUrl);
	fetch(searchUrl)
	.then((response) => {
		response.json()
		.then(function (response) {
			displaySearchResults(response);
		})
	})
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
	populatePedalDiv(response);
	pedals = document.querySelectorAll('.pedal');
	setPedalsOnclickEvents(pedals);
	getPicturesInList(pedals);

}

function emptyPedalDiv() {
	searchresults.innerHTML = '';
}

function populatePedalDiv(response) {
	response.sort(function(a, b) {let textA = a.name.toUpperCase(); let textB = b.name.toUpperCase(); return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;})
	response.forEach(pedal => {
		createPedalDiv(pedal)
	});
}

function createPedalDiv(pedal) {

	let pedalLogoClass;
	if (pedal.category.name=='Overdrive') { pedalLogoClass = 'fas fa-fire'}
	else if (pedal.category.name=='Distortion') { pedalLogoClass = 'fas fa-bolt'}
	else if (pedal.category.name=='Tremolo') { pedalLogoClass = 'fas fa-water'}
	else if (pedal.category.name=='Delay') { pedalLogoClass = 'fas fa-wifi'}
	else { pedalLogoClass = 'fas fa-volume-up'};

	const html =
	`<div class='row text-center pedal unselected'>
		<input id='hiddenId' value=${pedal._id} type='hidden'></input>
		<input id='hiddenName' value='${pedal.name}' type='hidden'></input>
		<input id='hiddenBrand' value=${pedal.brand._id} type='hidden'></input>
		<input id='hiddenCategory' value=${pedal.category._id} type='hidden'></input>
		<input id='hiddenDescription' value='${pedal.description}' type='hidden'></input>
		<input id='hiddenPrice' value=${pedal.price} type='hidden'></input>
		<div class='col-1 d-flex justify-content-center align-items-center'>
			<span class='${pedalLogoClass}'></span>
		</div>
		<div class='col d-flex justify-content-center align-items-center brand'>
			<span>${pedal.brand.name}</span>
		</div>
		<div class='col d-flex justify-content-center align-items-center'>
			<span class='pedal-name'>${pedal.name}</span>
		</div>
		<div class='col d-flex justify-content-center align-items-center category'>
			<span>${pedal.category.name}</span>
		</div>
		<div class='col d-flex justify-content-center align-items-center'>
			<span>${pedal.price} €</span>
		</div>
		<div class='col d-flex justify-content-center align-items-center'>
			<div class='miniature' style='background-image: url("../images/pedal-white.png")'>
			</div>
		</div>

	</div>`
	searchresults.innerHTML += html;

}

// CRUD Button events handlers

clearbtn.onclick = function () {
	location.href = '/shop';
	emptyFields();
}

function emptyFields() {
	nameInput.value = null;
	brandInput.value = '';
	categoryInput.value = '';
	descriptionInput.value = null;
	priceInput.value = null;
}

createbtn.onclick = function (e) {
  // POST request
  document.getElementById('form').setAttribute('method', 'POST');
  document.getElementById('form').setAttribute('action', '/shop/pedal/create');
}

updatebtn.onclick = function () {
  // PATCH request here

}

deletebtn.onclick = function () {
  // DELETE request here
  if (document.querySelector('.selected')) {
    const id = document.querySelector('.selected').querySelector('#hiddenId').value
    document.getElementById('form').setAttribute('method', 'POST');
    document.getElementById('form').setAttribute('action', `/shop/pedal/delete/${id}`);
  } else {
    message.innerHTML = `<h2 class='px-5'>Please select a pedal to delete</h2>`
  }
}

// Pictures management

function getPicturesInList (pedals) {

	pedals.forEach((pedal) => {

			const id = pedal.children[0].value;
			const miniature = pedal.children[pedal.children.length-1].children[0];

			fetch(`/images/pedals/${id.toString()}.jpg`)
			.then((response) => {

				if (response.status !== 200) {
					console.log(response.status);
				}
				else {
					miniature.style.cssText = `background-image: url("/images/pedals/${id.toString()}.jpg")`;
				}


			});

	})

}
