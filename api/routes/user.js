const router = require("express").Router()

router.get("/:id", (req, res) => {
	res.json({userid: req.params.id})
})

router.post("/create", (req, res) => {
	const { username } = req.body
	console.log(username)
	res.status(201).json({message: `${username} created`})
})

module.exports = router