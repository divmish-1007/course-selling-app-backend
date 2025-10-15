const mongoose = require('mongoose')

const Schema = mongoose.Schema
const ObjectId = mongoose.Types.ObjectId

console.log("Connected to")
// mongoose.connect('mongodb+srv://divakarmishra5301_db_user:Divakar%402704@cluster0.itwplte.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/coursera-app')
mongoose.connect('mongodb+srv://divakarmishra5301_db_user:Divakar%402704@cluster0.itwplte.mongodb.net/coursera-app')

const userschema = new Schema({
    email: {type: String, unique: true},
    password: String, 
    firstName: String,
    lastName: String
})

const adminschema = new Schema({
    email: String,
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
    Adminmodel: Adminmodel

}