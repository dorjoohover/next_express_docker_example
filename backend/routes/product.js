const express = require("express");
const ProductController  = require("../controller/products");
const Product  = require("../models/Product");

const router = express.Router();
const product = new ProductController(new Product());
router.route("/").get(product.getProducts.bind(product)).post(product.createProduct.bind(product));
router.route("/:id").get(product.getProductById.bind(product));
module.exports = router;
