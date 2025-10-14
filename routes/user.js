const {Router} = require('express')

const userRouter = Router()

userRouter.post('/signup', function (req, res) {
    res.json({
        message: "signup endpoint"
    })
})

userRouter.post('/signin', function (req, res) {
    res.json({
        message: "User signin endpoint"
    })
})

userRouter.get('/purchase', function (req, res) {
    res.json({
        message: "Courses purchased by a user"
    })
})


module.exports = {
    userRouter: userRouter
}