const router = require("express").Router()
const { celebrate } = require("celebrate")
const ObjectId = require("mongoose").Types.ObjectId

const Cart = require("../models/Cart.model")
const { cart: cartSchema } = require('../models/schema')
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
router.post("/", 
	verifyToken, 
	celebrate({ body: cartSchema.new }),
	async (req, res) => {
	const { products } = req.body

	try {
		await Cart.create({ 
			userID: ObjectId(req.user.uid),
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
		let cart = await Cart.findOne({ userID: ObjectId(req.params.id) })
		cart = await cart.populate({
			path: 'products.productID',
			select: ['title','price']
		})
		return res.json(cart)

	} catch (err) {
		console.error(err)
		return res.status(500).json(cartResponse.unexpectedError)
	}
})

// Update a cart - authorized user & admin only
router.put("/:id", 
	verifyAuthorization, 
	celebrate({ body: cartSchema.update }),
	async (req, res) => {
	const { products } = req.body

	try {
		await Cart.updateOne(
			{userID: ObjectId(req.params.id)},
			{$push: { products }},
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
		await Cart.deleteOne({ userID: ObjectId(req.params.id) })
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