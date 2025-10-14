const {Router} = require('express')
const courseRouter = Router()


courseRouter.post('/purchase', function (req, res) {
    // You would expect the user to pay you money 
    res.json({
        message: "The course that user want to buy"
    })
})

courseRouter.get('/preview', function (req, res) {
    res.json({
        message: "Show all the courses available for sale"
    })
})


module.exports = {
    courseRouter: courseRouter
}