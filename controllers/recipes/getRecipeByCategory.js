// recipes/:category
const Recipe = require("../../models/recipe");

const getRecipeByCategory = async (req, res) => {
  const { category, page = 0, limit = 8 } = req.params;
  const startIndex = page * limit;

  const result = await Recipe.find({ category: category })
    .sort({
      createdAt: -1,
    })
    .skip(startIndex)
    .limit(limit);

  const totalCount = await Recipe.count({ category: category });

  res.status(200).json({
    data: result,
    totalCount: totalCount,
  });
};
module.exports = getRecipeByCategory;
