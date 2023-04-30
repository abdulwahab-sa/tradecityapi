const db = require('../config/dbConfig');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage });

// GET CONTROLLERS

const getCategories = async (req, res) => {
	try {
		const q = 'SELECT * FROM category';
		const result = await db.query(q);
		return res.status(200).json({ result });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

const getSubcategories = async (req, res) => {
	try {
		const q = 'SELECT * FROM subcategory';
		const result = await db.query(q);
		return res.status(200).json({ result });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

const getProducts = async (req, res) => {
	try {
		const q = 'SELECT * FROM product';
		const result = await db.query(q);
		return res.status(200).json({ result });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

const getInquiries = async (req, res) => {
	try {
		const q = 'SELECT * FROM inquiry';
		const result = await db.query(q);
		return res.status(200).json({ result });
	} catch (error) {
		res.status(500).json({ error: err.message });
	}
};

// POST CONTROLLERS

const createSubcategory = async (req, res) => {
	try {
		// Validate request body parameters
		const { subcategory_title, category_category_id } = req.body;
		if (!subcategory_title) {
			throw new Error('Subcategory title is required');
		}
		if (!category_category_id) {
			throw new Error('Category ID is required');
		}

		// Get subcategory image from request
		const subcategory_img = req.files?.['subcategory_img']?.[0]?.buffer;
		if (!subcategory_img) {
			throw new Error('No subcategory image found in request');
		}

		// Insert subcategory into database
		const q = 'INSERT INTO subcategory (`subcategory_title`, `subcategory_img`, `category_category_id`) VALUES (?, ?, ?);';
		const values = [subcategory_title, subcategory_img, category_category_id];
		const result = await db.query(q, values);

		// Return success response
		return res.status(201).json({ message: 'Subcategory has been created successfully!', data: result });
	} catch (error) {
		// Log error and return error response
		console.error(error);
		return res.status(500).json({ message: 'Error creating subcategory', error: error.message });
	}
};

const createProduct = async (req, res) => {
	try {
		// Validate request body parameters
		const { product_title, article, subcategory_subcategory_id, category_category_id } = req.body;
		if (!product_title) {
			throw new Error('Product title is required');
		}
		if (!article) {
			throw new Error('Article is required');
		}

		if (!subcategory_subcategory_id) {
			throw new Error('Subcategory ID is required');
		}

		if (!category_category_id) {
			throw new Error('Category ID is required');
		}

		// Get product image from request
		const product_img = req.files?.['product_img']?.[0]?.buffer;
		if (!product_img) {
			throw new Error('No product image found in request');
		}

		// Insert product into database
		const q =
			'INSERT INTO product (`product_title`, `product_img`, `product_description`, `category_category_id`, `subcategory_subcategory_id`) VALUES (?, ?, ?, ?, ?);';
		const values = [product_title, product_img, article, category_category_id, subcategory_subcategory_id];
		const result = await db.query(q, values);

		// Return success response
		return res.status(201).json({ message: 'Product has been created successfully!', data: result });
	} catch (error) {
		// Log error and return error response
		console.error(error);
		return res.status(500).json({ message: 'Error creating product', error: error.message });
	}
};

const createInquiry = async (req, res) => {
	try {
		// Validate request body parameters
		const { name, email, phone, req_qty, order_detail } = req.body;
		if (!name) {
			throw new Error('Name is required');
		}
		if (!email) {
			throw new Error('Email is required');
		}

		if (!phone) {
			throw new Error('Phone is required');
		}

		if (!req_qty) {
			throw new Error('Quantity is required');
		}

		if (!order_detail) {
			throw new Error('Order Detail is required');
		}

		// Insert inquiry into database
		const q = 'INSERT INTO inquiry (`name`, `email`, `phone`, `req_qty`, `order_detail`) VALUES (?, ?, ?, ?, ?);';
		const values = [name, email, article, req_qty, order_detail];
		const result = await db.query(q, values);

		// Return success response
		return res.status(201).json({ message: 'Inquiry has been created successfully!', data: result });
	} catch (error) {
		// Log error and return error response
		console.error(error);
		return res.status(500).json({ message: 'Error creating inquiry', error: error.message });
	}
};

// UPDATE CONTROLLERS

const updateProduct = async (req, res) => {
	try {
		// Validate request body parameters
		const product_id = req.params.id;
		const { product_title, article, product_description, subcategory_subcategory_id, category_category_id } = req.body;

		// Get product image from request
		const product_img = req.files?.['product_img']?.[0]?.buffer;
		if (!product_img) {
			throw new Error('No product image found in request');
		}

		// Insert Product into database

		const q =
			'UPDATE product SET `product_title`=?, `product_img`=?, `product_description`=?, `category_category_id`=?, `subcategory_subcategory_id`=? ';

		const values = [product_title, article, product_img, product_description, subcategory_subcategory_id, category_category_id];

		const result = await db.query(q, [...values, product_id]);

		// Return success response
		res.status(200).json({ message: 'Product has been updated successfully!', data: result });
	} catch (err) {
		return res.status(500).json({ message: 'Error updating product', error: err.message });
	}
};

const updateSubcategory = async (req, res) => {
	try {
		// Validate request body parameters
		const subcategory_id = req.params.id;
		const [subcategory_title, category_category_id] = req.body;

		// Get Subcategory Image from request
		const subcategory_img = req.files['subcategory_img'][0].buffer;

		// Insert Subcategory into database

		const q = 'UPDATE subcategory SET `subcategory_title`=?, `subcategory_img`=?,  `category_category_id`=?';

		const values = [subcategory_title, subcategory_img, category_category_id];
		const result = await db.query(q, [...values, subcategory_id]);

		// Return success response
		return res.status(200).json({ message: 'Subcategory has been updated successfully!', data: result });
	} catch (err) {
		return res.status(500).json({ message: 'Error updating subcategory', error: err.message });
	}
};

// DELETE CONTROLLERS

const deleteProduct = async (req, res) => {
	try {
		const product_id = req.params.id;
		const result = await db.query(q, [product_id]);
		result && res.status(200).json({ message: 'Product deleted successfully!' });
	} catch (err) {
		return res.status(500).json({ message: 'Error deleting product', error: err.message });
	}
};

const deleteInquiry = async (req, res) => {
	try {
		const inquiry_id = req.params.id;

		const q = 'DELETE FROM inquiry WHERE inquiry_id = ?';

		const result = await db.query(q, [inquiry_id]);
		result && res.status(200).json({ message: 'Inquiry deleted successfully!' });
	} catch (err) {
		return res.status(500).json({ message: 'Error deleting inquiry', error: err.message });
	}
};

module.exports = {
	getCategories,
	getSubcategories,
	getProducts,
	getInquiries,
	createSubcategory,
	createProduct,
	createInquiry,
	updateProduct,
	updateSubcategory,
	deleteProduct,
	deleteInquiry,
};
