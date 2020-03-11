const router = require('express').Router();

const categoryValidation = require('./validation/categoryValidation');
const { addProducts } = require('./products/controllers/productControllers');
const {
  getAddCategory,
  createCategory
} = require('./categories/controllers/categoryControllers');

router.get('/add-category', getAddCategory);
router.post('/add-category', categoryValidation, createCategory);
router.get('/add-products/:name', addProducts);

// router.get('/add-category', (req, res, next) => {
//   return res.render('admin/add-category');
// });

// router.post('/add-category', categoryValidation, (req, res, next) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     console.log(errors);
//     // return res.status(422).json({ errors: errors.array() });
//     req.flash('error', 'Category cannot be empty');
//     return res.redirect('/api/admin/add-category');
//   }
//   const category = new Category();
//   category.name = req.body.name;
//   category
//     .save()
//     .then(category => {
//       //   console.log(category);
//       //   res.json({ category });

//       return res.redirect(`/api/admin/add-products/${category.name}`);
//     })
//     .catch(err => {
//       if (err.code === 11000) {
//         req.flash('error', 'Category already exists');
//         // res.json({ message: 'Exists' });
//         return res.redirect('/api/admin/add-category');
//       } else {
//         return next(err);
//       }
//     });
// });

// router.get('/add-products/:name', (req, res, next) => {
//   async.waterfall([
//     callback => {
//       Category.findOne({ name: req.params.name }, (err, category) => {
//         if (err) return next(err);
//         console.log('Waterfall category...', category);
//         callback(null, category);
//       });
//     },
//     (category, callback) => {
//       for (let i = 0; i < 24; i++) {
//         const product = new Product();
//         product.category = category._id;
//         product.name = faker.commerce.productName();
//         product.price = faker.commerce.price();
//         product.image = `/images/products2/${i}.jpg`;
//         product.description = faker.lorem.paragraph();
//         product.save();
//       }
//     }
//   ]);
//   req.flash('message', 'Category created');
//   return res.redirect('/api/admin/add-category');
//   //   return res.json({ message: 'Success' });
// });

module.exports = router;
