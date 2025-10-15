const mongoose = require('mongoose')

const Schema = mongoose.Schema
const ObjectId = mongoose.Types.ObjectId


const userschema = new Schema({
    email: {type: String, unique: true},
    password: String, 
    firstName: String,
    lastName: String
})

const adminschema = new Schema({
    email: {type: String, unique: true},
    password: String,
    firstName: String,
    lastName: String
})

const courseschema = new Schema({
    title: String,
    description: String,
    price: Number,
    imageUrl:String,
    creatId: ObjectId
})

const purchaseschema = new Schema({
    courseId: ObjectId,
    userId: ObjectId 
})

const Usermodel = mongoose.model('user', userschema)
const Adminmodel = mongoose.model('admin', adminschema)
const Coursemodel = mongoose.model('course', courseschema)
const Purchasemodel = mongoose.model('purchase', purchaseschema)

module.exports = {
    Usermodel: Usermodel,
    Adminmodel: Adminmodel,
    Coursemodel: Coursemodel,
    Purchasemodel: Purchasemodel
}