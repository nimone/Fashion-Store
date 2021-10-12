const router = require("express").Router()
const Cart = require("../models/Cart.model")
const { 
	verifyToken,
	verifyAuthorization,
	verifyAdminAccess,
} = require('../middlewares/verifyAuth')


// Get all carts - admin only
router.get("/", verifyAdminAccess, async (req, res) => {
	try {
		const carts = await Cart.find()
		return res.json(carts)

	} catch (err) {
		console.error(err)
		return res.status(500).json(cartResponse.unexpectedError)
	}
})

// Create a new cart - any authenticated user
router.post("/", verifyToken, async (req, res) => {
	const { products } = req.body

	try {
		await Cart.create({ 
			userID: req.user.uid,
			products,
		})
		return res.json(cartResponse.cartCreated)

	} catch (err) {
		console.log(err)
		return res.status(500).json(cartResponse.unexpectedError)
	}
})

// Get a cart - authorized user & admin only
router.get("/:id", verifyAuthorization, async (req, res) => {
	try {
		let cart = await Cart.findOne({ userID: req.params.id })
		return res.json(cart)

	} catch (err) {
		console.error(err)
		return res.status(500).json(cartResponse.unexpectedError)
	}
})

// Update a cart - authorized user & admin only
router.put("/:id", verifyAuthorization, async (req, res) => {
	try {
		await Cart.updateOne(
			{userID: req.params.id},
			{$set: req.body},
			{new: true},
		)
		return res.json(cartResponse.cartUpdated)
		
	} catch (err) {
		console.error(err)
		return res.status(500).json(cartResponse.unexpectedError)
	}
})

// Delete a cart - authorized user & admin only
router.delete("/:id", verifyAuthorization, async (req, res) => {
	try {
		await Cart.deleteOne({ userID: req.params.id })
		res.json(cartResponse.cartDeleted)

	} catch (err) {
		console.log(err)
		return res.status(500).json(cartResponse.unexpectedError)
	}
})

const cartResponse = {
	cartCreated: { 
		status: "ok",
		message: "cart has been created",
	},	
	cartUpdated: { 
		status: "ok",
		message: "cart has been updated",
	},
	cartDeleted: { 
		status: "ok",
		message: "cart has been deleted",
	},
	unexpectedError: {
		status: "error",
		message: "an unexpected error occurred",
	},
}

module.exports = router