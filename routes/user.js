const express = require('express')
const {Router} = require('express')
const userRouter = Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { JWT_USER_SECRET }= require("../config.js")



const { Usermodel, Purchasemodel, Coursemodel } = require("../db")
const { userMiddleware } = require('../middlewares/user.js')

userRouter.post('/signup', async function (req, res) {
    const email = req.body.email
    const password = req.body.password
    const firstName = req.body.firstName
    const lastName = req.body.lastName

    const hashedPassword = await bcrypt.hash(password, 5)

    try {
        await Usermodel.create({
            email: email,
            password: hashedPassword,
            firstName: firstName,
            lastName: lastName
        })
    }
    catch (e) {
        res.status(403).send("Email already exist")
    }

    res.json({
        message: "User successfully signed up"
    })
})

userRouter.post('/signin', async function (req, res) {
    const email = req.body.email
    const password = req.body.password

    const user = await Usermodel.findOne({
        email: email
    })
    if (!user) {

        res.status(403).json({
            message: "User not found with this email"
        })
        return

    }

    const passwordMatch = await bcrypt.compare(password, user.password)

    if (passwordMatch) {

        const token = jwt.sign({
            id: user._id
        }, JWT_USER_SECRET)

        res.json({
            token: token,
            message: "User Successfully Looged in"
        })

    } else {

        res.status(403).send({
            message: "password not matched"
        })

    }
})

userRouter.get('/purchases', userMiddleware, async function (req, res) {
    const userId = req.userId
   
    const purchases = await Purchasemodel.find({
        userId
    })

    const courseData = await Coursemodel.find({
        _id: { $in: purchases.map(x => x.courseId)}
    })
    res.json({
        purchases,
        courseData
    })
})


module.exports = {
    userRouter: userRouter
}