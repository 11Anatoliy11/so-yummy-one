// search
const Recipe = require("../../models/recipe");
const Ingredient = require("../../models/ingredient");

const searchByIngredient = async (req, res) => {
  const { query, page = 0, limit = 10 } = req.query;
  const startIndex = page * limit;

  if (!query) {
    res.status(400);
    throw new Error("Query is required");
  }

  const findIngredient = await Ingredient.find({ ttl: { '$regex': query, $options: 'i' } });
  if (!findIngredient.length) {
    res.status(200).json({
      data: [],
      totalCount: 0
    });
  }
  const ingredientIds = findIngredient.map((ingredient) => ingredient._id);

  const mongoQuery = {
    ingredients: {
      $elemMatch: { id: { $in: ingredientIds } },
    },
  };
  const result = await Recipe.find(mongoQuery).skip(startIndex).limit(limit);
  const totalCount = await Recipe.count(mongoQuery);

  res.status(200).json({
    data: result,
    totalCount: totalCount
  });
};

module.exports = searchByIngredient;
