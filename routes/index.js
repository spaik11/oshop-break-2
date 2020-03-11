const express = require('express');
const router = express.Router();
const Product = require('./admin/products/models/Product');

function paginate(req, res, next) {
  const perPage = 6;
  const page = req.params.pageNumber;
  Product.find()
    .skip(perPage * (page - 1))
    .limit(perPage)
    .populate('category')
    .exec((err, products) => {
      if (err) return next(err);
      Product.countDocuments().exec((err, count) => {
        if (err) return next(err);
        return res.render('main/home-products', {
          products,
          pages: Math.ceil(count / perPage),
          page: Number(page)
        });
      });
    });
}

// Render Home Page
router.get('/', (req, res, next) => {
  if (req.isAuthenticated()) {
    paginate(req, res, next);
  } else {
    return res.render('main/home');
  }
});

router.get('/page/:pageNumber', (req, res, next) => {
  paginate(req, res, next);
});

router.get('/logout', (req, res) => {
  req.logout();
  return res.redirect('/');
});

module.exports = router;
