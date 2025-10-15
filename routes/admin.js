const { Router } = require('express')
const adminRouter = Router()


const {Adminmodel} = require('../db')
const { configDotenv } = require('dotenv')

adminRouter.post('/signup', function(req, res){
    res.json({
        message: "admin signup end point"
    })
})

adminRouter.post('/signin', function(req, res){
    res.json({
        message: "admin signin end point"
    })
})

//   /api/v1/course
adminRouter.post('/', function(req, res){
    res.json({
        message: "Create course"
    })
})

adminRouter.put('/', function(req, res){
    res.json({
        message: "Edit course"
    })
})
 

adminRouter.get('/bulk', function(req, res){
    res.json({
        message: "Show me all my courses"
    })
})

module.exports = {
    adminRouter: adminRouter
}
