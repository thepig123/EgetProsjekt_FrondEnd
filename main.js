
// -----------------------------------
// Dark mode
// ----------------------------------

// Dark mode
function setDark() {
	document.documentElement.style.setProperty("--title", "#ffffff");
	document.documentElement.style.setProperty("--content", "#d7d7d7");
	document.documentElement.style.setProperty("--background", "#151515");
	document.documentElement.style.setProperty("--shadow", "255, 255, 255, 0.1");
}

// Light mode
function setLight() {
	document.documentElement.style.setProperty("--title", "#111111");
	document.documentElement.style.setProperty("--content", "#000000");
	document.documentElement.style.setProperty("--background", "#ffffff");
	document.documentElement.style.setProperty("--shadow", "0, 0, 0, 0.1");
}



// Onload window
window.onload = () => {

	// Check if darkmode
	setDark()
	let darkmode = localStorage.getItem("darkmode") == "true"
	if (darkmode == true) {
		setDark()
	}


	// Darkmode button
	document.getElementById("dark-mode-toggle").onclick = () => {
		if (darkmode) {
			setLight()
		} else if (!darkmode) {
			setDark()
		}
		darkmode = !darkmode
		localStorage.setItem("darkmode", darkmode)
	}
}





// -----------------------------------
// Vue
// ----------------------------------

var app = new Vue({
  el: '#app',
  data: {
		// This one is currently null, but gets dynamically changed after api data is fetched
		tracks: null
  },
	methods: {

		getScore(score, count) {
			return Number(score) / Number(count)
		},

		// Method (aka. function) for getting data from api
		getTracks() {

			// We use Axios to get data from the api
			axios.get('https://api.martin-playlist.v4.is/tracks')
				.then((response) => {
					console.log(response)
					this.tracks = response.data
					this.sortScores()
				})
				.catch((error) => {
					console.log(error);
				})

		},

		vote(id) {
			const score = prompt('Skriv inn score av ti. Bruk punktum for desimaltall.')
			axios.post('https://api.martin-playlist.v4.is/vote', {
				id: id,
				score: score
			})
			.then(function (response) {
    		console.log(response);
  		})
  		.catch(function (error) {
    		console.log(error);
  		});
		},

		// Sort scores after most scores
		sortScores() {

		}
	},

	// Runs when Vue is loaded
	mounted() {
		this.getTracks()
	}
})
