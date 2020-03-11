const router = require('express').Router();
const Cart = require('../cart/models/Cart');

router.get('/', (req, res, next) => {
  Cart.findOne({ owner: req.user._id })
    .populate('items.item')
    .exec((err, foundCart) => {
      if (err) {
        return next(err);
      }
      return res.render('main/cart', { foundCart });
    });
});

router.post('/:product_id', (req, res, next) => {
  Cart.findOne({ owner: req.user._id }, (err, cart) => {
    if (err) {
      return next(err);
    }
    cart.items.push({
      item: req.body.product_id,
      price: parseFloat(req.body.priceValue),
      quantity: parseInt(req.body.quantity)
    });

    cart.total = (cart.total + parseFloat(req.body.priceValue)).toFixed(2);
    cart
      .save()
      .then(cart => {
        return res.redirect('/api/cart');
      })
      .catch(err => {
        return next(err);
      });
  });
});

module.exports = router;
