const { Brand, Category, Pedal } = require('../models/pedal_model');
var async = require('async');
const { body, validationResult } = require('express-validator');

//-------------------------> Home page

exports.index = function (req, res) {

  async.parallel({
    brands: function (callback) {
      Brand.find({})
        .exec(callback);
    },
    categories: function (callback) {
      Category.find({})
        .exec(callback);
    },
    pedals: function (callback) {
      Pedal.find({})
        .populate('brand')
        .populate('category')
        .exec(callback)
    }
  }, function (err, results) {
    res.render('index', { title: 'The Pedal Shop', error: err, brands: results.brands, categories: results.categories, pedals: results.pedals, message: `Pick a pedal among ${results.pedals.length} or create a new one` });
  })
};

//-------------------------> Category controllers

//Category manage

exports.category_read = function (req, res) {

  Category.find({})
    .exec(function (err, categoriesfound) {

      if (err) { return next(err); }
      res.render('categories', { title: 'The Pedal Shop', categories: categoriesfound, message: `${categoriesfound.length} Pedal categories found` });
    })

}

//Category create

exports.category_create = [

  //validate and sanitise
  body('name', 'A new category name is required!').trim().isLength({ min: 1 }).escape(),

  // Process

  (req, res, next) => {

    //Extract errors from validation
    const errors = validationResult(req);

    //Create new Category
    var newCategory = new Category({
      name: req.body.name
    })

    if (!errors.isEmpty()) {
      // There are errors, render page with errors named

      Category.find({})
        .exec(function (err, categoriesfound) {
          if (err) { return next(err) };
          let errorText = '';
          errors.array().forEach((error) => {
            errorText += `${error.msg} `
          })
          res.render('categories', { title: 'The Pedal Shop', categories: categoriesfound, message: `${errorText}` });
        })
    }
    else {
      //Data is valid

      //Check for category with same name
      Category.findOne({ 'name': req.body.name })
        .exec(function (err, found_category) {
          if (err) { return next(err) };

          if (found_category) {

            //Category Exists, render!
            Category.find({})
              .exec(function (err, categoriesfound) {
                if (err) { return next(err) }
                res.render('categories', { title: 'The Pedal Shop', categories: categoriesfound, message: `There is already a category named '${req.body.name}'` });
              })
          }
          else {

            //Save new category
            newCategory.save(function (err) {
              if (err) { return next(err) }
              // Success
              Category.find({})
                .exec(function (err, categoriesfound) {
                  if (err) { return next(err) }
                  res.render('categories', { title: 'The Pedal Shop', categories: categoriesfound, message: `Successfully created category '${req.body.name}'` });
                })
            });
          }

        });
    }
  }
]

//Category Update

exports.category_update = [

  //validate and sanitise
  body('name', 'A new category name is required!').trim().isLength({ min: 1 }).escape(),

  // Process

  (req, res, next) => {

    //Extract errors from validation
    const errors = validationResult(req);

    //Create new Category
    var newCategory = new Category({
      name: req.body.name,
      _id: req.params.id
    })

    if (!errors.isEmpty()) {
      // There are errors, render page with errors named

      Category.find({})
        .exec(function (err, categoriesfound) {
          if (err) { return next(err) };
          let errorText = '';
          errors.array().forEach((error) => {
            errorText += `${error.msg} `
          })
          res.render('categories', { title: 'The Pedal Shop', categories: categoriesfound, message: `${errorText}` });
        })
    }
    else {
      //Data is valid

      //Check for category with same name
      Category.findOne({ 'name': req.body.name })
        .exec(function (err, found_category) {
          if (err) { return next(err) };

          if (found_category) {

            //Category Exists, render!
            Category.find({})
              .exec(function (err, categoriesfound) {
                if (err) { return next(err) }
                res.render('categories', { title: 'The Pedal Shop', categories: categoriesfound, message: `There is already a category named '${req.body.name}'` });
              })
          }
          else {

            //Save new category
            Category.findByIdAndUpdate(req.params.id, newCategory, {}, function (err) {
              if (err) { return next(err) }
              // Success
              Category.find({})
                .exec(function (err, categoriesfound) {
                  if (err) { return next(err) }
                  res.render('categories', { title: 'The Pedal Shop', categories: categoriesfound, message: `Successfully updated category to '${req.body.name}'` });
                })
            });
          }

        });
    }
  }
]

//Category Delete

exports.category_delete = function (req, res, next) {

  Category.findByIdAndRemove(req.params.id, function (err, removedCategory) {
    if (err) { return next(err) }

    Category.find({})
      .exec(function (err, categoriesfound) {
        if (err) { return next(err) }

        res.render('categories', { title: 'The Pedal Shop', categories: categoriesfound, message: `Successfully deleted category '${removedCategory.name}'` });
      })
  })
}

//-------------------------> Brand controllers

//Brands manage

exports.brand_read = function (req, res, next) {

  Brand.find({})
    .exec(function (err, brandsfound) {

      if (err) { return next(err); }
      res.render('brands', { title: 'The Pedal Shop', brands: brandsfound, message: `${brandsfound.length} Pedal brands found` });
    })

}

//Brand create

exports.brand_create = [

  //validate and sanitise
  body('name', 'A new brand name is required!').trim().isLength({ min: 1 }).escape(),

  // Process

  (req, res, next) => {

    //Extract errors from validation
    const errors = validationResult(req);

    //Create new Brand
    var newBrand = new Brand({
      name: req.body.name
    })

    if (!errors.isEmpty()) {
      // There are errors, render page with errors named

      Brand.find({})
        .exec(function (err, brandsfound) {
          if (err) { return next(err) };
          let errorText = '';
          errors.array().forEach((error) => {
            errorText += `${error.msg} `
          })
          res.render('brands', { title: 'The Pedal Shop', brands: brandsfound, message: `${errorText}` });
        })
    }
    else {
      //Data is valid

      //Check for category with same name
      Brand.findOne({ 'name': req.body.name })
        .exec(function (err, found_brand) {
          if (err) { return next(err) };

          if (found_brand) {

            //Brand Exists, render!
            Brand.find({})
              .exec(function (err, brandsfound) {
                if (err) { return next(err) }
                res.render('brands', { title: 'The Pedal Shop', brands: brandsfound, message: `There is already a brand named '${req.body.name}'` });
              })
          }
          else {

            //Save new category
            newBrand.save(function (err) {
              if (err) { return next(err) }
              // Success
              Brand.find({})
                .exec(function (err, brandsfound) {
                  if (err) { return next(err) }
                  res.render('brands', { title: 'The Pedal Shop', brands: brandsfound, message: `Successfully created brand '${req.body.name}'` });
                })
            });
          }

        });
    }
  }
]

//Brand Update

exports.brand_update = [

  //validate and sanitise
  body('name', 'A new brand name is required!').trim().isLength({ min: 1 }).escape(),

  // Process

  (req, res, next) => {

    //Extract errors from validation
    const errors = validationResult(req);

    //Create new Brand
    var newBrand = new Brand({
      name: req.body.name,
      _id: req.params.id
    })

    if (!errors.isEmpty()) {
      // There are errors, render page with errors named

      Brand.find({})
        .exec(function (err, brandsfound) {
          if (err) { return next(err) };
          let errorText = '';
          errors.array().forEach((error) => {
            errorText += `${error.msg} `
          })
          res.render('brands', { title: 'The Pedal Shop', brands: brandsfound, message: `${errorText}` });
        })
    }
    else {
      //Data is valid

      //Check for brand with same name
      Brand.findOne({ 'name': req.body.name })
        .exec(function (err, found_brand) {
          if (err) { return next(err) };

          if (found_brand) {

            //Brand Exists, render!
            Brand.find({})
              .exec(function (err, brandsfound) {
                if (err) { return next(err) }
                res.render('brands', { title: 'The Pedal Shop', brands: brandsfound, message: `There is already a brand named '${req.body.name}'` });
              })
          }
          else {

            //Save new brand
            Brand.findByIdAndUpdate(req.params.id, newBrand, {}, function (err) {
              if (err) { return next(err) }
              // Success
              Brand.find({})
                .exec(function (err, brandsfound) {
                  if (err) { return next(err) }
                  res.render('brands', { title: 'The Pedal Shop', brands: brandsfound, message: `Successfully updated brand to '${req.body.name}'` });
                })
            });
          }

        });
    }
  }
]

//Brand Delete

exports.brand_delete = function (req, res, next) {

  Brand.findByIdAndRemove(req.params.id, function (err, removedBrand) {
    if (err) { return next(err) }

    Brand.find({})
      .exec(function (err, brandsfound) {
        if (err) { return next(err) }

        res.render('brands', { title: 'The Pedal Shop', brands: brandsfound, message: `Successfully deleted brand '${removedBrand.name}'` });
      })
  })
}


//-------------------------> Pedal controllers

// Pedals search
exports.pedal_search = function (req, res, next) {

  let query = {
    'name': { $regex: req.query.name, $options: 'i' },
    'description': { $regex: req.query.description, $options: 'i' }
  };

  if (req.query.brand !== '') { query.brand = { $in: req.query.brand } };
  if (req.query.category !== '') { query.category = { $in: req.query.category } };
  if (req.query.price !== '' && isNaN(parseInt(req.query.price)) === false) { query.price = { $in: req.query.price } };

  Pedal.find(query)
    .populate('brand')
    .populate('category')
    .exec(function (err, pedalsfound) {
      if (err) { return next(err) }
      //Success
      res.json(pedalsfound);
    });

}

// Pedal Create

exports.pedal_create = [
  // Validate and sanitize
  body('name', 'A pedal name is required!').trim().isLength({ min: 1 }).escape(),
  body('description', 'A description is required!').trim().isLength({ min: 1 }).escape(),
  body('price', 'A price is required!').trim().isLength({ min: 1 }).escape(),

  (req, res, next) => {

    // Extract validation errors
    const errors = validationResult(req);

    // Created object form field values
    let selected = {
      name: req.body.name,
      brand: req.body.brand,
      category: req.body.category,
      description: req.body.description,
      price: req.body.price,
      destination: req.body.destination
    }

    if (!errors.isEmpty()) {

      // Render again with error message
      async.parallel({
        brands: function (callback) {
          Brand.find({})
            .exec(callback);
        },
        categories: function (callback) {
          Category.find({})
            .exec(callback);
        },
        pedals: function (callback) {
          Pedal.find({})
            .populate('brand')
            .populate('category')
            .exec(callback)
        }
      },
        function (err, results) {
        if (err) { return next(err) }
        let errorText = ''
        errors.array().forEach((error) => {
          errorText += `${error.msg}
          `
        })
        res.render('index', { title: 'The Pedal Shop', error: err, brands: results.brands, categories: results.categories, pedals: results.pedals, message: `${errorText}`, selected:selected});
      })

    } else {

      // Look for already existing pedal
      Pedal.findOne({ 'name': req.body.name })
      .exec(function (err, found_pedal) {
        if (err) { return next(err) };
        if (found_pedal) {

          // Render with 'already existing' message
          async.parallel({
            brands: function (callback) {
              Brand.find({})
                .exec(callback);
            },
            categories: function (callback) {
              Category.find({})
                .exec(callback);
            },
            pedals: function (callback) {
              Pedal.find({})
                .populate('brand')
                .populate('category')
                .exec(callback)
            }
          },
            function (err, results) {
              if (err) { return next(err) }
              let errorText = ''
              errors.array().forEach((error) => {
                errorText += `${error.msg}`
              })
              res.render('index', { title: 'The Pedal Shop', error: err, brands: results.brands, categories: results.categories, pedals: results.pedals, message: `A pedal named ${found_pedal.name} already exists!`, selected: selected });
            })

        } else {

          // Create pedal and then re-render
          var newPedal = new Pedal ({
            name: req.body.name,
            brand: req.body.brand,
            category: req.body.category,
            description: req.body.description,
            price: req.body.price
          })
          newPedal.save(function(err) {
            if (err) { return next (err) }

            //Re-render with message
            async.parallel({
              brands: function (callback) {
                Brand.find({})
                  .exec(callback);
              },
              categories: function (callback) {
                Category.find({})
                  .exec(callback);
              },
              pedals: function (callback) {
                Pedal.find({})
                  .populate('brand')
                  .populate('category')
                  .exec(callback)
              }
            },
              function (err, results) {
                if (err) { return next(err) }
                let errorText = ''
                errors.array().forEach((error) => {
                  errorText += `${error.msg}`
                })
                res.render('index', { title: 'The Pedal Shop', error: err, brands: results.brands, categories: results.categories, pedals: results.pedals, message: `Successfully created new pedal '${req.body.name}'` });
              })
          })
        }
      })
    }
  }
]


// Pedal update

exports.pedal_update = [
  // Validate and sanitize
  body('name', 'A pedal name is required!').trim().isLength({ min: 1 }).escape(),
  body('description', 'A description is required!').trim().isLength({ min: 1 }).escape(),
  body('price', 'A price is required!').trim().isLength({ min: 1 }).escape(),

  (req, res, next) => {

    // Extract validation errors
    const errors = validationResult(req);

    // Created object form field values
    let selected = {
      name: req.body.name,
      brand: req.body.brand,
      category: req.body.category,
      description: req.body.description,
      price: req.body.price,
      destination: req.body.destination
    }

    if (!errors.isEmpty()) {

      // Render again with error message
      async.parallel({
        brands: function (callback) {
          Brand.find({})
            .exec(callback);
        },
        categories: function (callback) {
          Category.find({})
            .exec(callback);
        },
        pedals: function (callback) {
          Pedal.find({})
            .populate('brand')
            .populate('category')
            .exec(callback)
        }
      },
        function (err, results) {
          if (err) { return next(err) }
          let errorText = ''
          errors.array().forEach((error) => {
            errorText += `${error.msg}`
          })
          res.render('index', { title: 'The Pedal Shop', error: err, brands: results.brands, categories: results.categories, pedals: results.pedals, message: `${errorText}`, selected: selected });
        })

    } else {

      // Look for already existing pedal
      async.parallel({
        currentPedal: function (callback) {
          Pedal.findById(req.params.id)
          .exec(callback);
        },
        existingPedal: function (callback) {
          Pedal.findOne({ name: req.body.name })
          .exec(callback);
        }},
        function updatePedal(err, results) {
          if (err) { return next(err) }
          if (results.existingPedal && (results.existingPedal.name != results.currentPedal.name)){

            // render with 'already existing' message
            async.parallel({
              brands: function (callback) {
                Brand.find({})
                  .exec(callback);
              },
              categories: function (callback) {
                Category.find({})
                  .exec(callback);
              },
              pedals: function (callback) {
                Pedal.find({})
                  .populate('brand')
                  .populate('category')
                  .exec(callback)
              }
            },
              function (err, results) {
                if (err) { return next(err) }
                let errorText = ''
                errors.array().forEach((error) => {
                  errorText += `${error.msg}`
                })
                res.render('index', { title: 'The Pedal Shop', error: err, brands: results.brands, categories: results.categories, pedals: results.pedals, message: `There is already a pedal named '${req.body.name}'`, selected: selected });
              })

          } else {

            // update pedal
            const updatedPedal = new Pedal ({
              name: req.body.name,
              brand: req.body.brand,
              category: req.body.category,
              description: req.body.description,
              price: req.body.price,
              _id: req.params.id
            });
            Pedal.findByIdAndUpdate(req.params.id, updatedPedal, {}, function(err) {

              // redirect to index, 'successfully udpated' message
              async.parallel({
                brands: function (callback) {
                  Brand.find({})
                    .exec(callback);
                },
                categories: function (callback) {
                  Category.find({})
                    .exec(callback);
                },
                pedals: function (callback) {
                  Pedal.find({})
                    .populate('brand')
                    .populate('category')
                    .exec(callback)
                }
              },
                function (err, results) {
                  if (err) { return next(err) }
                  let errorText = ''
                  errors.array().forEach((error) => {
                    errorText += `${error.msg}`
                  })
                  res.render('index', { title: 'The Pedal Shop', error: err, brands: results.brands, categories: results.categories, pedals: results.pedals, message: `Successfully updated pedal '${req.body.name}'`, selected: selected });
                })
            })
          }
        })
    }
  }
]

// Pedal Delete

exports.pedal_delete = function (req, res, next) {
  const name = req.body.name;
  Pedal.findByIdAndRemove(req.params.id, function deletePedal(err) {
    if (err) { return next(err) }

    // Gather new data to render index with message
    async.parallel({
      brands: function (callback) {
        Brand.find({})
          .exec(callback);
      },
      categories: function (callback) {
        Category.find({})
          .exec(callback);
      },
      pedals: function (callback) {
        Pedal.find({})
          .populate('brand')
          .populate('category')
          .exec(callback)
      }
    },
      function (err, results) {
        if (err) { return next(err) }
        res.render('index', { title: 'The Pedal Shop', error: err, brands: results.brands, categories: results.categories, pedals: results.pedals, message: `Successfully deleted pedal '${name}'`});
      })
  })
}


//-------------------------> Pictures management

// Picture search

// Picture create

// Picture update

// Picture delete
