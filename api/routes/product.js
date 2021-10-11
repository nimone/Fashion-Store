const router = require("express").Router()
const Product = require("../models/Product.model")
const { 
	verifyToken,
	verifyAuthorization,
	verifyAdminAccess,
} = require('../middlewares/verifyAuth')


// Get all products - any user
router.get("/", async (req, res) => {
	const query = req.query
	try {
		let products 
		if (query.new) {
			products = await Product.find().sort({ createdAt: -1 }).limit(5)

		} else if (query.category) {
			products = await Product.find({
				categories: { $in: [query.category]}
			})

		} else {
			products = await Product.find()
		}
		return res.json(products)

	} catch (err) {
		console.error(err)
		return res.status(500).json(productResponse.unexpectedError)
	}
})

// Add a new product - admin only
router.post("/", verifyAdminAccess, async (req, res) => {
	const { title, description, image, price } = req.body

	// check required properties 
	if (!title || !description || !image || (price === undefined)) {
		return res.status(400).json(productResponse.missingField)
	}

	try {
		await Product.create(req.body)
		return res.json(productResponse.productAdded)

	} catch (err) {
		console.log(err)
		return res.status(500).json(productResponse.unexpectedErrorS)
	}
})

// Update a product - admin only
router.put("/:id", verifyAdminAccess, async (req, res) => {
	try {
		await Product.findByIdAndUpdate(
			req.params.id,
			{$set: req.body },
			{new: true},
		)
		return res.json(productResponse.productUpdated)
		
	} catch (err) {
		console.error(err)
		return res.status(500).json(productResponse.unexpectedError)
	}
})

// Delete a product - admin only
router.delete("/:id", verifyAdminAccess, async (req, res) => {
	try {
		await Product.findByIdAndDelete(req.params.id)
		res.json(productResponse.productDeleted)

	} catch (err) {
		console.log(err)
		return res.status(500).json(productResponse.unexpectedError)
	}
})

// Get any product - any user
router.get("/:id", async (req, res) => {
	try {
		const product = await Product.findById(req.params.id)
		return res.json(product)

	} catch (err) {
		console.error(err)
		return res.status(500).json(productResponse.unexpectedError)
	}
})

const productResponse = {
	productAdded: { 
		status: "ok",
		message: "product has been added",
	},	
	productUpdated: { 
		status: "ok",
		message: "product has been updated",
	},
	productDeleted: { 
		status: "ok",
		message: "product has been deleted",
	},
	missingField: {
		status: "error",
		message: "a required field is missing",
	},
	unexpectedError: {
		status: "error",
		message: "an unexpected error occurred",
	},
}

module.exports = router