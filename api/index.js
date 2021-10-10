const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')

const userRouter = require('./routes/user') 

const app = express()

dotenv.config()

mongoose.connect(process.env.DB_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true
}).then(() => console.log("Connected to database"))
	.catch(err => console.error(err))

app.use(express.json())
app.use("/users", userRouter)

app.get("/", (req, res) => {
	res.json({status: "ok"})
})


app.listen(process.env.PORT || 5000, () => {
	console.log(`Listening on port ${process.env.PORT || 5000}`)
})