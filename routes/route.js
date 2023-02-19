const express = require('express');
const router = express.Router();
const { getAllProducts, getProduct, createProduct, updateProduct, deleteProduct } = require('../controller/controller.js');
const upload = require('./../middleware/multerImage');
const { loginController, refreshController } = require('./../auth/index');
router
	.route('/')
	.get(getAllProducts)
	.post(
		upload.fields([
			{ name: 'subCategoryImg', maxCount: 1 },
			{ name: 'productImg', maxCount: 1 },
		]),
		createProduct
	);
router
	.route('/:id')
	.get(getProduct)
	.put(
		upload.fields([
			{ name: 'subCategoryImg', maxCount: 1 },
			{ name: 'productImg', maxCount: 1 },
		]),
		updateProduct
	)
	.delete(deleteProduct);

router.route('/login').post(loginController);
router.route('/refresh').post(refreshController);
module.exports = router;
