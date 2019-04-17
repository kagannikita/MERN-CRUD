var mongoose = require('./../database.js');
var Product = mongoose.model('product', {
  name: String,
  country: String,
  description: {
    type: String,
    required: true,
    trim: true,
  },
  price:Number,
  value:String,
  createdAt: {
    type: String,
    default: new Date()
  },
  image: String
});
module.exports = Product;
