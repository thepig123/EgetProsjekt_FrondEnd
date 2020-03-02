
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
		tracks: null,


		token: null,
		password: null
  },
	methods: {

		login() {

			axios.get('https://api.martin-playlist.v4.is/token?password='+ this.password)	
				.then((response) => {
					this.token = response.data

					this.getImported()
				})
				.catch((error) => {
					console.log(error);
				})


		},

		addTrack(id) {
			axios.get('https://api.martin-playlist.v4.is/submit?id='+ id +'&token='+ this.token)	
				.then((response) => {
					alert(response.data)
				})
				.catch((error) => {
					console.log(error);
				})


		},

		getScore(score, count) {
			return Number(score) / Number(count)
		},

		// Method (aka. function) for getting data from api
		getTracks() {

			// We use Axios to get data from the api
			axios.get('https://api.martin-playlist.v4.is/tracks')	
			// axios.get('http://localhost:8080/tracks')
				.then((response) => {
					console.log(response)
					this.tracks = response.data
					this.sortScores()
				})
				.catch((error) => {
					console.log(error);
				})

		},

		getImported() {

			axios.get('https://api.martin-playlist.v4.is/imported')	
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


			// axios.get('http://localhost:8080/vote?id='+ id +'&score='+ score)
			axios.get('https://api.martin-playlist.v4.is/vote?id='+ id +'&score='+ score)
			.then(function (response) {
    		console.log(response);
				alert(response.data);
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
