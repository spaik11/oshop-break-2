const router = require('express').Router();
const Product = require('./models/Product');

router.get('/all-products/:id', (req, res, next) => {
  Product.find({ category: req.params.id })
    .populate('category')
    .exec((err, products) => {
      if (err) return next(err);
      //   return res.json({ products });
      return res.render('main/category', { products });
    });
});

router.get('/single-product/:id', (req, res, next) => {
  Product.findById({ _id: req.params.id }, (err, product) => {
    if (err) return next(err);
    res.render('main/single-product', { product });
  });
});

module.exports = router;
