var Product = require('../models/product')
var Cart = require('../models/cart')

var cartCtrl = {
  // Get add to cart a product
  getAllProduct: (req, res) => {
    // Product.find({published: {$ne: false}})
    //   .exec(function (err, products) {
    //     if (err) {
    //       req.flash('error_msg', 'Une erreur est survenue')
    //       res.redirect('/')
    //     }
    //     res.render('partials/cart/catalogue', {products: products})
    //   })
    var products = require('../../catalogue/products')
    res.render('partials/cart/catalogue', { products: products })
  },
  // Get reduce product cart quantity by one
  getAddToCart: (req, res) => {
    var productId = req.params.id
    var cart = new Cart(req.session.cart ? req.session.cart : {items: {}})

    Product.findById(productId, (err, product) => {
      if (err) {
        res.redirect('/')
      }
      cart.add(product, product.id)
      req.session.cart = cart
      res.redirect('/catalogue/')
    })
  },
  // Get increase product cart quantity by one
  getReduceByOne: (req, res) => {
    var productId = req.params.id
    var cart = new Cart(req.session.cart ? req.session.cart : {})

    cart.reduceByOne(productId)
    req.session.cart = cart
    res.redirect('/catalogue/panier')
  },
  // Get reduce product cart quantity by X
  getIncreaseByOne: (req, res) => {
    var productId = req.params.id
    var cart = new Cart(req.session.cart ? req.session.cart : {})

    cart.increaseByOne(productId)
    req.session.cart = cart
    res.redirect('/catalogue/panier')
  },
  // Get increase product cart quantity by X
  getReduceByX: (req, res) => {
    var productId = req.params.id
    var qtyX = req.query.remove * 1
    var cart = new Cart(req.session.cart ? req.session.cart : {})

    cart.reduceByX(productId, qtyX)
    req.session.cart = cart
    res.redirect('/catalogue/panier')
  },
  // Get remove a product in cart
  getIncreaseByX: (req, res) => {
    var productId = req.params.id
    var qtyX = req.query.add * 1
    var cart = new Cart(req.session.cart ? req.session.cart : {})

    cart.increaseByX(productId, qtyX)
    req.session.cart = cart
    res.redirect('/catalogue/panier')
  },
  // Get a product
  getRemoveProductCart: (req, res) => {
    var productId = req.params.id
    var cart = new Cart(req.session.cart ? req.session.cart : {})

    cart.removeItem(productId)
    req.session.cart = cart
    res.redirect('/catalogue/panier')
  },
  // Get cart
  getProductById: (req, res) => {
    Product.findById(req.params.id, (err, produit) => {
      if (err) {
        req.flash('error_msg', 'Une erreur est survenue')
        res.redirect('/')
      }
      if (produit.published) {
        res.render('partials/shop/produit', {product: produit})
      } else {
        res.redirect('/catalogue/')
      }
    })
  },
  // Get all product
  getCart: (req, res) => {
    if (!req.session.cart) {
      return res.render('partials/cart/panier', {products: null})
    }
    var cart = new Cart(req.session.cart)
    res.render('partials/cart/panier', {products: cart.generateArray(), totalPrice: cart.totalPrice})
  }
}

module.exports = cartCtrl
