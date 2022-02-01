const { Joi } = require('celebrate')

const MIN_PASSWORD_LENGTH = 6
const ID_LENGTH = 24
const ALLOWED_ORDER_STATUS = ['pending', 'shipped', 'in transit', 'delivered']

module.exports = {
	auth: {
		login: Joi.object().keys({
			email: Joi.string().email().required(),
			password: Joi.string().required(),
		}),
		register: Joi.object().keys({
			fullname: Joi.string().required(),
			email: Joi.string().email().required(),
			password: Joi.string().min(MIN_PASSWORD_LENGTH).required(),
		}),
	},
	user: {
		query: Joi.object().keys({
			new: Joi.boolean(),
		}),
		update: Joi.object().keys({
			fullname: Joi.string(),
			currentPassword: Joi.string(),
			newPassword: Joi.string().min(MIN_PASSWORD_LENGTH),
		}).with('newPassword', 'currentPassword'),
	},
	product: {
		query: Joi.object().keys({
			new: Joi.boolean(),
			category: Joi.string()
		}),
		new: Joi.object().keys({
			title: Joi.string().required(),
			description: Joi.string().required(),
			image: Joi.string().uri().required(),
			price: Joi.number().positive().required(),
			inStock: Joi.boolean(),
			categories: Joi.array().items(Joi.string()).single(),
			size: Joi.array().items(Joi.string()).single(),
			color: Joi.array().items(Joi.string()).single(),
		}),
		update: Joi.object().keys({
			title: Joi.string(),
			description: Joi.string(),
			image: Joi.string().uri(),
			price: Joi.number().positive(),
			inStock: Joi.boolean(),
			categories: Joi.array().items(Joi.string()).single(),
			size: Joi.array().items(Joi.string()).single(),
			color: Joi.array().items(Joi.string()).single(),
		}),
	},
	order: {
		query: Joi.object().keys({
			status: Joi.string().valid(...ALLOWED_ORDER_STATUS),
		}),
		new: Joi.object().keys({
			products: Joi.array().items(
				Joi.object().keys({
					productID: Joi.string().length(ID_LENGTH).alphanum().required(),
					quantity: Joi.number().positive(),
				}).required(),
			).single().min(1),
			amount: Joi.number().positive().required(),
			address: Joi.any().required(),
			status: Joi.string().valid(...ALLOWED_ORDER_STATUS),
		}),
		update: Joi.object().keys({
			products: Joi.array().items(
				Joi.object().keys({
					productID: Joi.string().length(ID_LENGTH).alphanum().required(),
					quantity: Joi.number().positive(),
				}).required(),
			).single(),
			amount: Joi.number().positive(),
			address: Joi.any(),
			status: Joi.string().valid(...ALLOWED_ORDER_STATUS),
		}),
	},
	cart: {
		new: Joi.object().keys({
			products: Joi.array().items(
				Joi.object().keys({
					productID: Joi.string().length(ID_LENGTH).alphanum().required(),
					quantity: Joi.number().positive(),
				}).required(),
			).single(),
		}),
		update: Joi.object().keys({
			products: Joi.array().items(
				Joi.object().keys({
					productID: Joi.string().length(ID_LENGTH).alphanum().required(),
					quantity: Joi.number().positive(),
				}).required(),
			).single(),
		}),
		patch: Joi.object().keys({
			productID: Joi.string().length(ID_LENGTH).alphanum().required(),
			quantity: Joi.number().integer().min(0),
		}),
	},
}