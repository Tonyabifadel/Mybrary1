const mongoose = require('mongoose')
const Book = require('./book')

const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }
})

authorSchema.pre('remove1',function(next)  {
Book.find({ author: this.id} , (err,books) =>{
  if(err){
    console.log('error1')
    next(err)
  }
  else if(books.length > 0){
    console.log('error2')

    next(new Error("This author has book still"))

      }
      else{
        next()
      }
    })
    })
module.exports = mongoose.model('Author', authorSchema)