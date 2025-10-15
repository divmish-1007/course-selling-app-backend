const { Router } = require('express')
const adminRouter = Router()

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

adminRouter.post('/signin', function(req, res){
    res.json({
        message: "admin signin end point"
    })
})

adminRouter.post('/course', function(req, res){
    res.json({
        message: "Create course"
    })
})

adminRouter.put('/course', function(req, res){
    res.json({
        message: "Edit course"
    })
})

adminRouter.get('/course', function(req, res){
    res.json({
        message: "Show me all my courses"
    })
})

module.exports = {
    adminRouter: adminRouter
}
