const Recipe = require("../../models/recipe");

const searchByTitle = async (req, res) => {
  const { query, page = 0, limit = 10 } = req.query;
  if (!query) {
    res.status(400);
    throw new Error("Query is required");
  }

  const startIndex = page * limit;

  const mongoQuery = {
    title: { $regex: query, $options: "i" },
  };

  const result = await Recipe.find(mongoQuery).skip(startIndex).limit(limit);
  const totalCount = await Recipe.count(mongoQuery);

  res.status(200).json({
    data: result,
    totalCount: totalCount,
  });
};

module.exports = searchByTitle;
