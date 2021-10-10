const router = require("express").Router()
const bcrypt = require("bcryptjs")

const User = require("../models/User.model")

router.post("/register", async (req, res) => {
	const { fullname, email, password } = req.body

	if (!fullname || !email || !password) {
		return res.status(400).json({
			status: "error",
			message: "a required field is missing",
		})
	}

	try {
		const passwordHash = await bcrypt.hash(password, 10)
		await User.create({ 
			fullname, 
			email, 
			password: passwordHash 
		})
		res.status(201).json({ 
			status: "ok",
			message: "user created",
		})

	} catch (err) {
		console.error(err)
		res.status(500).json({
			status: "error",
			message: "an unexpected error occurred",
		})
	}
})

module.exports = router