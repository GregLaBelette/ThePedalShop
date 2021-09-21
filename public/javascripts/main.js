// querySelectors

const nameInput  = document.getElementById('name');
const brandInput  = document.getElementById('brand');
const categoryInput  = document.getElementById('category');
const descriptionInput  = document.getElementById('description');
const priceInput  = document.getElementById('price');

// Search results onclick events

const pedals = document.querySelectorAll('.pedal');

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
	}
})  

// Search filters onchange events

nameInput.oninput = search;
brandInput.onchange = search;
categoryInput.onchange = search;
descriptionInput.oninput = search;
priceInput.oninput = search;

function search () {

}

// CRUD Button events handlers

