module.exports = (app) => {
    const categories = require("./categories_controllers");
  
    // Create a new Note
    app.post("/categories/", categories.createCategory);
  
    // Retrieve all category
    app.get("/categories", categories.listCategories);
  
    // Retrieve a single Note with categoryId
    app.get("/categories/:categoryId", categories.categoryDetails);
  
    // Update a Note with categoryId
    app.put("/categories/:categoryId", categories.updateCategory);
  
    // Delete a Note with categoryId
    app.delete("/categories/:categoryId", categories.deleteCategory);
  };