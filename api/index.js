const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')

const authRouter = require('./routes/auth') 
const userRouter = require('./routes/user') 
const productRouter = require('./routes/product') 
const cartRouter = require('./routes/cart') 
const orderRouter = require('./routes/order') 

const app = express()

dotenv.config()

// mongodb
mongoose.connect(process.env.DB_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true
}).then(() => console.log("Connected to database"))
	.catch(err => console.error(err))


// global middlewares
app.use(express.json())


// routes
app.use("/auth", authRouter)
app.use("/users", userRouter)
app.use("/products", productRouter)
app.use("/carts", cartRouter)
app.use("/orders", orderRouter)

// server status
app.get("/", (req, res) => {
	res.json({status: "ok"})
})


app.listen(process.env.PORT || 5000, () => {
	console.log(`Listening on port ${process.env.PORT || 5000}`)
})