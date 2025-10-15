const express = require('express')
const {Router} = require('express')
const adminRouter = Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const JWT_ADMIN_SECRET = "123@random"


const {Adminmodel} = require('../db')


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
        res.status(403).json({
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
 

adminRouter.get('/bulk', function(req, res){
    res.json({
        message: "Show me all my courses"
    })
})

module.exports = {
    adminRouter: adminRouter
}
