const router = require("express").Router()
const bcrypt = require("bcryptjs")
const { celebrate } = require('celebrate')

const User = require("../models/User.model")
const { user: userSchema } = require('../models/schema')
const { 
	verifyToken,
	verifyAuthorization,
	verifyAdminAccess,
} = require('../middlewares/verifyAuth')


// Get all users - admin only
router.get("/", 
	verifyAdminAccess, 
	celebrate({ query: userSchema.query }), 
	async (req, res) => {
	const query = req.query
	try {
		let users 
		if (query.new) {
			users = await User
				.find({}, { password: 0 }) // exclude password
				.sort({ createdAt: -1 })
				.limit(5)
		} else {
			users = await User.find({}, { password: 0 })
		}
		return res.json(users)

	} catch (err) {
		console.error(err)
		return res.status(500).json(userResponse.unexpectedError)
	}
})

// Get current user - any authenticated user
router.get("/me", verifyToken, async (req, res) => {
	try {
		const user = await User.findById(
			req.user.uid,
			{ password: 0 },
		)
		return res.json({"status": "ok", user})

	} catch (err) {
		console.error(err)
		return res.status(500).json(userResponse.unexpectedError)
	}
})

// Update a user - authorized user & admin only
router.put("/:id", 
	verifyAuthorization, 
	celebrate({ body: userSchema.update }),
	async (req, res) => {
	let { currentPassword, newPassword, fullname } = req.body

	// reset password
	let password
	if (newPassword) { 
		const user = await User.findById(req.params.id)
		const isValid = await bcrypt.compare(currentPassword, user.password)

		if (isValid) {
			password = await bcrypt.hash(newPassword, 10)
		} else {
			return res.status(401).json(userResponse.userUpdateFailed)
		}
	}

	try {
		await User.findByIdAndUpdate(
			req.params.id,
			{$set: { fullname, password } },
			{new: true},
		)
		return res.json(userResponse.userUpdated)
		
	} catch (err) {
		console.error(err)
		return res.status(500).json(userResponse.unexpectedError)
	}
})

// Delete a user - authorized user & admin only
router.delete("/:id", verifyAuthorization, async (req, res) => {
	try {
		await User.findByIdAndDelete(req.params.id)
		res.json(userResponse.userDeleted)

	} catch (err) {
		console.log(err)
		return res.status(500).json(userResponse.unexpectedError)
	}
})

// Get user statistics - admin only
router.get("/stats", verifyAdminAccess, async (req, res) => {
	const date = new Date()
	const lastYear = new Date(date.setFullYear(date.getFullYear() - 1))

	try {
		const data = await User.aggregate([
			{$match: {
				createdAt: { $gte: lastYear },
			}},
			{$project: {
				month: { $month: "$createdAt" },
			}},
			{$group: {
				_id: "$month",
				total: { $sum: 1},
			}}
		])
		res.json(data)

	} catch (err) {
		console.error(err)
		return res.status(500).json(userResponse.unexpectedError)
	}
})

// Get any user - admin only
router.get("/:id", verifyAdminAccess, async (req, res) => {
	try {
		const user = await User.findById(
			req.params.id, 
			{ password: 0 },
		)
		return res.json(user)

	} catch (err) {
		console.error(err)
		return res.status(500).json(userResponse.unexpectedError)
	}
})

const userResponse = {
	unexpectedError: {
		status: "error",
		message: "an unexpected error occurred",
	},
	userDeleted: {
		status: "ok",
		message: "user has been deleted",
	},
	userUpdateFailed: {
		status: "error",
		message: "user update failed"
	},
	userUpdated: {
		status: "ok",
		message: "user has been updated",
	}
}

module.exports = router