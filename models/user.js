const mongoose = require('mongoose')
const bcrypt = require('bcrypt-nodejs')

const userSchema = mongoose.Schema({
    username: {type: String, unique: true},
    fullname: {type: String, default: ''},
    email: {type: String, unique: true},
    password: {type: String, default: ''},
    userImage: {type: String, default: 'default.png'},
    facebook: {type: String, default: ''},
    fbTokens: Array,
    google: {type: String, default: ''},
    googleTokens: Array
})

userSchema.methods.encryptPassword = (password) => {
    bcrypt.hashSync(password, bcrypt.genSaltSync(10), null)
}

userSchema.methods.validUserPassword = (password) => {
    bcrypt.compareSync(password, this.password)
}

module.exports = mongoose.model('User', userSchema)