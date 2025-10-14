const express = require('express')
const jwt = require('jsonwebtoken')
const JWT_SECRET = "random@123"

const app = express()

app.post('/user/signup', function(req, res){
    res.json({
        message: "signup endpoint"
    })
})

app.post('/user/signin', function(req, res){
    res.json({
       message: "User signin endpoint"
    })
})

app.get('/user/purchase', function(req, res){
    res.json({
        message: "Courses purchased by a user"
    })
})

app.post('/course/purchase', function(req, res){
    // You would expect the user to pay you money 
    res.json({
        message: "The course that user want to buy"
    })
})

app.get('/allcourses', function(req, res){
    res.json({
        message: "Show all the courses available for sale"
    })
})