const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')
dotenv.config()

const authRouter = require('./routes/auth') 
const userRouter = require('./routes/user') 
const productRouter = require('./routes/product') 
const cartRouter = require('./routes/cart') 
const orderRouter = require('./routes/order')
const checkoutRouter = require('./routes/checkout')
const { 
  handleMalformedJson,
  formatCelebrateErrors
} = require('./middlewares/handleError')

const app = express()


// mongodb
mongoose.connect(process.env.DB_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true
}).then(() => console.log("Connected to database"))
	.catch(err => console.error(err))


// global middlewares
app.use(cors())
app.use(express.json())
app.use(handleMalformedJson) // handle common req errors


// routes
app.use("/auth", authRouter)
app.use("/users", userRouter)
app.use("/products", productRouter)
app.use("/carts", cartRouter)
app.use("/orders", orderRouter)
app.use("/checkout", checkoutRouter)

// server status
app.get("/", (req, res) => {
	res.json({status: "ok"})
})

// format celebrate paramater validation errors
app.use(formatCelebrateErrors)

app.listen(process.env.PORT || 5000, () => {
	console.log(`Listening on port ${process.env.PORT || 5000}`)
})