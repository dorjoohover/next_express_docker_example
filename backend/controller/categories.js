const Category = require("../models/Category");

exports.getCategories = async (req, res, next) => {
  try {
    const category = await Category.getAllCategories();
    res.status(200).json({
      success: true,
      data: category,
    });
  } catch (err) {
    next(err);
  }
};
exports.getCategory = async (req, res, next) => {
  try {
    const category = await Category.getCategoryById(req.params.id);
    if (!category) {
      return res.status(400).json({
        success: false,
        error: req.params.id + "bhgui",
      });
    }
    res.status(200).json({
      success: true,
      data: category,
    });
  } catch (err) {
    next(err);
  }
};
exports.createCategory = async (req, res, next) => {
  const category = await Category.createCategory(req.body);

  res.status(200).json({
    success: true,
    data: category,
  });
};

exports.updateCategory = async (req, res, next) => {
  try {
    // const category = await Category.updateOne(req.params.id, req.body);
    // if (!category) {
    //   return res.status(400).json({
    //     success: false,
    //     error: req.params.id + "bhgui",
    //   });
    // }
    // res.status(200).json({
    //   success: true,
    //   data: category,
    // });
  } catch (err) {
    next(err);
  }
};
exports.deleteCategory = async (req, res, next) => {
  try {
    // const category = await Category.deleteOne(req.params.id);
    // if (!category) {
    //   return res.status(400).json({
    //     success: false,
    //     error: req.params.id + "bhgui",
    //   });
    // }
    // res.status(200).json({
    //   success: true,
    //   data: category,
    // });
  } catch (err) {
    next(err);
  }
};
