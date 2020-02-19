const playlist_id = "2gaaotVgNvhLkb1gFFVgzT"

function setDark()
{
	document.documentElement.style.setProperty("--title", "#ffffff");
	document.documentElement.style.setProperty("--content", "#d7d7d7");
	document.documentElement.style.setProperty("--background", "#151515");
}

function setLight()
{
	document.documentElement.style.setProperty("--title", "#111111");
	document.documentElement.style.setProperty("--content", "#000000");
	document.documentElement.style.setProperty("--background", "#ffffff");
}

window.onload = () =>
{
	let darkmode = localStorage.getItem("darkmode") == "true"
	if (darkmode == true)
	{
		setDark()
	}

	document.getElementById("dark-mode-toggle").onclick = () =>
	{
		if (darkmode)
		{
			setLight()
		}
		if (!darkmode)
		{
			setDark()
		}
		darkmode = !darkmode
		localStorage.setItem("darkmode", darkmode)
	}
}