const {Router} = require('express')
const courseRouter = Router()
const { userMiddleware } = require("../middlewares/user")
const { Purchasemodel, Coursemodel } = require('../db')


courseRouter.post('/purchase', userMiddleware, async function (req, res) {
    // You would expect the user to pay you money 
    const userId = req.userId
    const courseId = req.body.courseId 

    await Purchasemodel.create({
        userId,
        courseId
    })
    res.json({
        message: "You have successfully bought the course"
    })
})

courseRouter.get('/preview', async function (req, res) {
    // Without login or authenticated user can see all the courses listed on website 
    const courses = await Coursemodel.find({})
    res.json({
        courses
    })
})


module.exports = {
    courseRouter: courseRouter
}