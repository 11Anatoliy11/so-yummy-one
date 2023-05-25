// /get-favorite

const Recipe = require("../../models/recipe");
const User = require("../../models/user");

const getFavoriteRecipe = async (req, res) => {
  const { _id: userId } = req.user;
  const { page = 0, limit = 10 } = req.query;

  const user = await User.findById(userId);

  const favoriteRecipes = user.favorites;

  if (!favoriteRecipes) {
    return res.json({
      message: "No favorites have been added yet",
    });
  }

  const startIndex = page * limit;
  const query = {
    _id: { $in: favoriteRecipes },
  };

  const data = await Recipe.find(query).skip(startIndex).limit(limit);
  const count = await Recipe.count(query);
  const response = {
    data: data,
    totalCount: count
  };

  res.status(200).json(response);
};

module.exports = getFavoriteRecipe;
