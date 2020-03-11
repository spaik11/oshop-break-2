const async = require('async');
const faker = require('faker');

const Product = require('../models/Product');
const Category = require('../../categories/models/Category');

module.exports = {
  addProducts: (req, res, next) => {
    async.waterfall([
      callback => {
        Category.findOne({ name: req.params.name }, (err, category) => {
          if (err) return next(err);
          console.log('Waterfall category...', category);
          callback(null, category);
        });
      },
      (category, callback) => {
        for (let i = 0; i < 24; i++) {
          const product = new Product();
          product.category = category._id;
          product.name = faker.commerce.productName();
          product.price = faker.commerce.price();
          product.image = `/images/products2/${i}.jpg`;
          product.description = faker.lorem.paragraph();
          product.save();
        }
      }
    ]);
    req.flash('message', 'Category created');
    return res.redirect('/api/admin/add-category');
  }
};
