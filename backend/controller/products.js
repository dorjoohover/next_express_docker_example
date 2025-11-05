class ProductController {
  constructor(model) {
    this.model = model;
  }

  async getProducts(req, res, next) {
    try {
      const page = parseInt(req.query.page) || 0;
      const limit = parseInt(req.query.limit) || 10;
      console.log(page, limit)
      const products = await this.model.getAllProducts({page, limit});
      res.status(200).json({
        success: true,
        data: products,
      });
    } catch (err) {
      next(err);
    }
  }
  async getProductById(req, res, next) {
    try {
      const product = await this.model.getProductById(req.params.id);
      if (!product) {
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
  }
  async createProduct(req, res, next) {
    const product = await this.model.createProduct(req.body);

    res.status(200).json({
      success: true,
      data: product,
    });
  }
}

module.exports = ProductController;
