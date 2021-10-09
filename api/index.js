const express = require('express')
const app = express()

app.get("/", (req, res) => {
	res.json({status: "ok"})
})

app.listen(5000, () => console.log("Listening on localhost:5000"))