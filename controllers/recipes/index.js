const getCategoriesList = require("./getCategoriesList");
const getMainPage = require("./mainPageCategories");
const getRecipeByID = require("./getRecipeByID");
const getRecipeByCategory = require("./getRecipeByCategory");
const addOwnRecipe = require("./addOwnRecipe");
const deleteOwnRecipe = require("./deleteOwnRecipe");
module.exports = {
  getCategoriesList,
  getMainPage,
  getRecipeByID,
  getRecipeByCategory,
  addOwnRecipe,
  deleteOwnRecipe,
};
