const express = require('express')
const { mongoose } = require('mongoose')
const {userRouter} = require('./routes/user.js')
const {courseRouter} = require('./routes/course.js')
const {adminRouter} = require('./routes/admin.js')
require('dotenv').config()

const app = express()

app.use('/api/v1/user', userRouter)
app.use('/api/v1/admin', adminRouter)
app.use('/api/v1/course', courseRouter)

const databaseUrl = process.env.DATABASE_URL

async function main() {
    await mongoose.connect(databaseUrl)
    app.listen(3000)
    console.log("Listening on 3000 port")
}

main()