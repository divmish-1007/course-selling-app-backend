const express = require('express')
const { mongoose } = require('mongoose')
const {userRouter} = require('./routes/user.js')
const {courseRouter} = require('./routes/course.js')
const {adminRouter} = require('./routes/admin.js')

const app = express()

app.use('/api/v1/user', userRouter)
app.use('/api/v1/admin', adminRouter)
app.use('/api/v1/course', courseRouter)


async function main() {
    await mongoose.connect('mongodb+srv://divakarmishra5301_db_user:Divakar%402704@cluster0.itwplte.mongodb.net/coursera-app')
    app.listen(3000)
    console.log("Listening on 3000 port")
}

main()