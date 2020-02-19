const https = require("https")

https.get(url, (result) =>
{
	let responsedata = ""
	result.on("data", (data) =>
	{
		responsedata += data
	})
	result.on("end", () =>
	{
		console.log(responsedata)
	})
})