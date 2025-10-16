const express = require('express')
const {Router} = require('express')
const adminRouter = Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { JWT_ADMIN_SECRET } = require("../config.js")
const { adminMiddleware } = require("../middlewares/admin.js")



const {Adminmodel, Coursemodel} = require('../db')
const admin = require('../middlewares/admin.js')


adminRouter.post('/signup', async function(req, res){

    const {email, password, firstName, lastName} = req.body

    const hashedPassword = await bcrypt.hash(password, 5)

    try{
        await Adminmodel.create({
            email: email,
            password: hashedPassword,
            firstName: firstName, 
            lastName: lastName
        })
    } catch(e){
        res.status(403).send("Admin Email already exist")
    }
    
    res.json({
        message: "Admin successfully signed up"
    })

})

adminRouter.post('/signin', async function(req, res){
    const {email, password} = req.body

    const admin = await Adminmodel.findOne({
        email:email
    })

    if(!admin){
        res.status (403).json({
           message: "Admin with this email does not exist"
        })
    }

    const passwordMatch = await bcrypt.compare(password, admin.password)

    if(!passwordMatch){

        res.status(403).send({
            message: "Password not mathced"
        })

    } else {
        const token = jwt.sign({
            id: admin._id
        }, JWT_ADMIN_SECRET)
        res.json({
            token:token,
            message:"Admin looged in successfully"
        })
    }

})

adminRouter.post('/course', adminMiddleware, async function(req, res){
    const adminId = req.adminId
    const {title, description, imageUrl, price } = req.body

    const course = await Coursemodel.create({
        title:title,
        description: description,
        imageUrl: imageUrl,
        price: price,
        creatorId: adminId
    })

    res.json({
        message: "Course created",
        courseId: course._id
    })
})

adminRouter.put('/course', adminMiddleware, async function(req, res){
    
    const adminId = req.adminId
    const {title, decription, price, imageUrl, courseId} = req.body

    const course = await Coursemodel.updateOne({
        _id: courseId,
        creatorId: adminId
    },
        {
        title:title,
        decription: decription,
        imageUrl: imageUrl,
        price: price,
    })

    res.json({
        message: "Course Updated",
        courseId: course._id
    })
})
 

adminRouter.get('/course/bulk', adminMiddleware, async function(req, res){

    const adminId = req.adminId
    const courses = await Coursemodel.find({
        creatorId:adminId
    })
    res.json({
        message:"Your all Courses",
        courses
    })
    
})

module.exports = {
    adminRouter: adminRouter
}
