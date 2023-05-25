// /own-recipes
const Recipe = require("../../models/recipe");

const getOwnRecipe = async (req, res) => {
  const { _id: userId } = req.user;
  const { page = 0, limit = 10 } = req.query;

  const startIndex = page * limit;

  const result = await Recipe.find({ owner: userId })
    .skip(startIndex)
    .limit(limit);

  const totalCount = await Recipe.count({ owner: userId });

  const response = {
    data: result,
    totalCount: totalCount,
  };

  res.status(200).json(response);
};

module.exports = getOwnRecipe;
