//Vaiables

let pedals;

//Query Selectors

const brandDivs = document.querySelectorAll('.brand');

// Onload Event

window.onload = function() {
	fetch('/shop/pedal/search?name=&brand=&category=&description=&price=')
	.then((response) => {
		response.json()
		.then((response) => {
			pedals = response;
			
			brandDivs.forEach((brandDiv) => {
				let pedalCount = 0;

				pedals.forEach((pedal) => {

					if (brandDiv.children[0].value === pedal.brand._id) {
						pedalCount ++;
					}
				})
				brandDiv.children[3].innerHTML = `<span class = 'count'>${pedalCount} Pedals</span>`;
			}) 
		})
	});
}