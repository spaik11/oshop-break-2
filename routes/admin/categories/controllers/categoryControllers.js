const { validationResult } = require('express-validator');
const Category = require('../models/Category');

module.exports = {
  getAddCategory: (req, res, next) => {
    return res.render('admin/add-category');
  },
  createCategory: (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors);
      // return res.status(422).json({ errors: errors.array() });
      req.flash('error', 'Category cannot be empty');
      return res.redirect('/api/admin/add-category');
    }
    const category = new Category();
    category.name = req.body.name;
    category
      .save()
      .then(category => {
        //   console.log(category);
        //   res.json({ category });

        return res.redirect(`/api/admin/add-products/${category.name}`);
      })
      .catch(err => {
        if (err.code === 11000) {
          req.flash('error', 'Category already exists');
          // res.json({ message: 'Exists' });
          return res.redirect('/api/admin/add-category');
        } else {
          return next(err);
        }
      });
  }
};
