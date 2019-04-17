var express = require('express');
var router = express.Router();
var multer = require('multer');
var path = require('path');
var uploadDir = path.join(__dirname, "../uploads");
var upload = multer({ dest: uploadDir });
var base64Img = require('base64-img');
var Product = require('./../database/models/product.js');
router.get('/api/products', function(request, response) {
  Product.find().then(function(products) {
    response.status(200).send({
      products: products
    });
  }).catch(function(error) {
    console.log(error);
    response.status(500).send(error);
  })
});
// СОЗДАНИЕ НОВОГО ПОСТА
router.post('/api/products', upload.single('file'), function(request, response) {
  var name = request.body.name;
  var description = request.body.description;
  var country = request.body.country;
  var price = request.body.price;
  var value = request.body.value;
  var newProductData = {
    name: name,
    description: description,
    country: country,
    price: price,
    value: value,
  };
  var filePath = '';
  try {
    filePath = request.file.path;
  } catch(e) {
    console.log('File not found');
  }
  base64Img.base64(filePath, function(err, data) {
    if (err)
      console.log(err);
    else
      newProductData.image = data;
    var newProduct = new Product(newProductData);
    newProduct.save().then(function(savedProduct) {
      response.send({
        savedProduct: savedProduct
      })
    }).catch(function(error) {
      console.log(error);
      res.status(403).send(error);
    })
  });

});

//localhsot:3000/api/posts/1234
router.delete('/api/products/:productId', function(request, response) {
  var productId = request.params.productId;
  Product.findByIdAndDelete(productId).then((deletedProduct) => {
    if (deletedProduct == null) {
      response.status(400).send({message: 'Data with id does not exist'})
    } else {
      response.status(200).send({
        deletedProduct: deletedProduct
      })
    }
  }).catch((error) => {
    console.log(error);
    response.status(500).send(error);
  })
});

router.put('/api/products/:productId', upload.single('file'), function(request, response) {
  var productId = request.params.productId;
  var name = request.body.name;
  var description = request.body.description;
  var country = request.body.country;
  var price = request.body.price;
  var value = request.body.value;
  var filePath = '';
  try {
    filePath = request.file.path;
  } catch(e) {
    console.log('File not found');
  }
  const updateProduct = {
    name: name,
    description: description,
    country: country,
    price: price,
    value: value,
  };
  base64Img.base64(filePath, function(err, data) {
    if (err)
      console.log(err);
    else
      updateProduct.image = data;
    Product.findByIdAndUpdate(productId, {$set: updateProduct}, {new: true})
        .then(function(updatedProduct) {
          response.send({
            updatedProduct: updatedProduct
          })
        }).catch(function(error) {
      console.log(error);
      response.status(500).send(error);
    });

  });
});

module.exports = router;
