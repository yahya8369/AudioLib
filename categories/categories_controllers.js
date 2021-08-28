const Category = require("./categories_models");

exports.createCategory = async (req, res) => {
  let category = new Category({
    name: req.body.name,
    description: req.body.description || "No description",
  });
  try {
    category = await category.save();
    res.status(201).send(category);
  } catch (err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the category.",
    });
  }
};

// Retrieve and return all category from the database.
exports.listCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).send(categories);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving category.",
    });
  }
};

// Find a single category with a categoryId
exports.categoryDetails = async (req, res) => {
    const category = await Category.findById(req.params.categoryId);
    if(!category)
        res.status(404).send({message: "No category with id "+ req.params.categoryId})
    else
        res.status(200).send(category);
};

// Update a category identified by the categoryId in the request
exports.updateCategory = async (req, res) => {
  // Validate Request
  try {
    const category = await Category.findById(req.params.categoryId);
    category.name = req.body.name || category.name
    category.description = req.body.description || category.description
    category.updatedDate = new Date()
    category.save()
    res.json(category);
  } catch (err) {
      res.status(500).send({
        message: "Error retrieving category with id " + req.params.categoryId,
      });
  }
};

// Delete a category with the specified categoryId in the request
exports.deleteCategory = (req, res) => {
  Category.findByIdAndRemove(req.params.categoryId)
    .then((category) => {
      if (!category) {
        res.status(404).send({
          message: "category not found with id " + req.params.categoryId,
        });
      }
      // If delete is successful, return status 204
      else res.status(204);
    })
    .catch((err) => {
      return res.status(500).send({
        message: "Could not delete category with id " + req.params.categoryId,
      });
    });
};