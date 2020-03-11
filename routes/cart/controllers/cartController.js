const Cart = require('../models/Cart');

module.exports = {
  createUserCart: (req, res) => {
    let cart = new Cart();
    cart.owner = req.user._id;
    cart.save(err => {
      if (err) {
        return res.status(500).json({ message: 'Cart not saved', error: err });
      } else {
        return res.redirect('/');
      }
    });
  }
};
