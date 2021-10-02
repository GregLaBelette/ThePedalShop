//Vaiables

let pedals;

//Query Selectors

const categoryDivs = document.querySelectorAll('.category');

// Onload Event

window.onload = function() {
	fetch('/shop/pedal/search?name=&brand=&category=&description=&price=')
	.then((response) => {
		response.json()
		.then((response) => {
			pedals = response;
			
			categoryDivs.forEach((categoryDiv) => {
				let pedalCount = 0;

				pedals.forEach((pedal) => {

					if (categoryDiv.children[0].value === pedal.category._id) {
						pedalCount ++;
					}
				})
				categoryDiv.children[3].innerHTML = `<span class = 'count'>${pedalCount} Pedals</span>`;
			}) 
		})
	});
}