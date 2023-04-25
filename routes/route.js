const express = require('express');
const router = express.Router();
const {
	getCategories,
	getSubcategories,
	getProducts,
	getInquiries,
	createSubcategory,
	createProduct,
	createInquiry,
	updateProduct,
	deleteProduct,
	deleteInquiry,
	updateSubcategory,
} = require('../controller/controller.js');
const upload = require('./../middleware/multerImage');
const { loginController, refreshController } = require('./../auth/index');

// Route for pre-defined main categories
router.route('/categories').get(getCategories);

//Routes for CRUD of Subcategories
router
	.route('/subcategories')
	.get(getSubcategories)
	.post(upload.fields([{ name: 'subcategory_img', maxCount: 1 }]), createSubcategory);

router.route('/subcategories/:id').put(upload.fields([{ name: 'subcategory_img', maxCount: 1 }]), updateSubcategory);

// Routes for CRUD of Products

router
	.route('/products')
	.get(getProducts)
	.post(upload.fields([{ name: 'product_img', maxCount: 1 }]), createProduct);

router
	.route('/products/:id')
	.put(upload.fields([{ name: 'product_img', maxCount: 1 }]), updateProduct)
	.delete(deleteProduct);

// Routes for Inquiry

router.route('/inquiry').get(getInquiries).post(createInquiry);
router.route('/inquiry/:id').delete(deleteInquiry);

// Route for Admin Panel Login

router.route('/login').post(loginController);
router.route('/refresh').post(refreshController);
module.exports = router;
