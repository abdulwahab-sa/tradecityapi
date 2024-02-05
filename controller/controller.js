const db = require('../config/dbConfig');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage });

// GET CONTROLLERS

const getCategories = (req, res) => {
	const q = 'SELECT * FROM category';
	db.query(q, (err, data) => {
		if (err) return res.status(500).json({ message: 'Error fetching categories', error: err.message });
		return res.status(200).json(data);
	});
};

const getSubcategories = (req, res) => {
	const q = 'SELECT * FROM subcategory';
	db.query(q, (err, data) => {
		if (err) return res.status(500).json({ message: 'Error fetching subcategories', error: err.message });
		return res.status(200).json(data);
	});
};

const getProducts = (req, res) => {
	const q = 'SELECT * FROM product';
	db.query(q, (err, data) => {
		if (err) return res.json(err);
		return res.json(data);
	});
};

const getInquiries = (req, res) => {
	const q = 'SELECT * FROM inquiry';
	db.query(q, (err, data) => {
		if (err) return res.json(err);
		return res.json(data);
	});
};

// POST CONTROLLERS

const createSubcategory = async (req, res) => {
	// Validate request body parameters
	const { subcategory_title, category_category_id } = req.body;
	const subcategory_img = req.files?.['subcategory_img']?.[0]?.buffer;
	if (!subcategory_title || subcategory_title === '' || !category_category_id || !subcategory_img) {
		return res.status(400).json({ message: 'All fields are required' });
	}

	// Insert subcategory into database
	const q = 'INSERT INTO subcategory (`subcategory_title`, `subcategory_img`, `category_category_id`) VALUES (?, ?, ?);';
	const values = [subcategory_title, subcategory_img, category_category_id];
	db.query(q, values, (err, result) => {
		if (err) {
			return res.status(500).json({ message: 'Error creating subcategory', error: err.message });
		} else {
			if (result.affectedRows > 0) {
				return res.status(201).json({ message: 'Subcategory has been created successfully!' });
			} else {
				return res.status(404).json({ message: 'Subcategory not found' });
			}
		}
	});
};

const createProduct = async (req, res) => {
	// Validate request body parameters
	const { product_title, product_article, product_description, subcategory_subcategory_id, category_category_id } = req.body;
	console.log(req.body);
	if (!product_title) {
		throw new Error('Product title is required');
	}
	if (!product_article) {
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
		'INSERT INTO product (`product_title`, `product_img`, `product_description`, `category_category_id`, `subcategory_subcategory_id`, `product_article`) VALUES (?, ?, ?, ?, ?, ?);';
	const values = [product_title, product_img, product_description, category_category_id, subcategory_subcategory_id, product_article];
	db.query(q, values, (err, result) => {
		if (err) {
			return res.status(500).json({ message: 'Error creating product', error: err.message });
		} else {
			if (result.affectedRows > 0) {
				return res.status(201).json({ message: 'Product has been created successfully!' });
			} else {
				return res.status(404).json({ message: 'Product not found' });
			}
		}
	});
};

const createInquiry = async (req, res) => {
	// Validate request body parameters
	const { inquiry_name, inquiry_email, inquiry_phone, inquiry_req_qty, order_detail } = req.body;

	// Insert inquiry into database
	const q =
		'INSERT INTO inquiry (`inquiry_name`, `inquiry_email`, `inquiry_phone`, `inquiry_req_qty`, `order_detail`) VALUES (?, ?, ?, ?, ?);';
	const values = [inquiry_name, inquiry_email, inquiry_phone, inquiry_req_qty, order_detail];
	db.query(q, values, (err, result) => {
		if (err) {
			return res.status(500).json({ message: 'Error creating inquiry', error: err.message });
		} else {
			if (result.affectedRows > 0) {
				return res.status(201).json({ message: 'Inquiry has been created successfully!' });
			} else {
				return res.status(404).json({ message: 'Inquiry not found' });
			}
		}
	});
};

// UPDATE CONTROLLERS
/*
const updateProduct = async (req, res) => {
	// Validate request body parameters
	const product_id = parseInt(req.params.id);
	const { product_title, product_article, product_description, subcategory_subcategory_id, category_category_id } = req.body;

	// Get product image from request
	const product_img = req.files?.['product_img']?.[0]?.buffer;

	// Insert Product into database

	const q = `UPDATE product SET product_title=?, product_article=?, product_img=?, product_description=?, category_category_id=?, subcategory_subcategory_id=? WHERE product.product_id= ?`;

	const values = [
		product_title,
		product_article,
		product_img,
		product_description,
		subcategory_subcategory_id,
		category_category_id,
		product_id,
	];

	db.query(q, values, (err, result) => {
		if (err) {
			return res.status(500).json({ message: 'Error updating product', error: err.message });
		} else {
			if (result.affectedRows > 0) {
				return res.status(200).json({ message: 'Product has been updated successfully!' });
			} else {
				return res.status(404).json({ message: 'Product not found' });
			}
		}
	});
};
*/

const updateProduct = async (req, res) => {
	// Validate request body parameters
	const product_id = parseInt(req.params.id);
	const { product_title, product_article, product_description, subcategory_subcategory_id, category_category_id } = req.body;

	// Get product image from request if available
	const product_img = req.files?.['product_img']?.[0]?.buffer;

	// Construct the base update query
	let q = 'UPDATE product SET ';
	const values = [];

	// Construct the SET clause for the update query
	const setClauses = [];
	if (product_title) {
		setClauses.push('product_title = ?');
		values.push(product_title);
	}
	if (product_article) {
		setClauses.push('product_article = ?');
		values.push(product_article);
	}
	if (product_description) {
		setClauses.push('product_description = ?');
		values.push(product_description);
	}
	if (subcategory_subcategory_id) {
		setClauses.push('subcategory_subcategory_id = ?');
		values.push(subcategory_subcategory_id);
	}
	if (category_category_id) {
		setClauses.push('category_category_id = ?');
		values.push(category_category_id);
	}
	if (product_img) {
		setClauses.push('product_img = ?');
		values.push(product_img);
	}

	// If no fields to update, return with a message
	if (setClauses.length === 0) {
		return res.status(400).json({ message: 'No fields to update' });
	}

	// Add the set clauses to the update query
	q += setClauses.join(', ');

	// Add the WHERE clause
	q += ' WHERE product.product_id = ?';
	values.push(product_id);

	// Execute the update query
	db.query(q, values, (err, result) => {
		if (err) {
			return res.status(500).json({ message: 'Error updating product', error: err.message });
		} else {
			if (result.affectedRows > 0) {
				return res.status(200).json({ message: 'Product has been updated successfully!' });
			} else {
				return res.status(404).json({ message: 'Product not found' });
			}
		}
	});
};

const updateSubcategory = async (req, res) => {
	// Validate request body parameters
	const subcategory_id = parseInt(req.params.id);
	const { subcategory_title, category_category_id } = req.body;

	// Get Subcategory Image from request
	const subcategory_img = req.files?.['subcategory_img'][0].buffer;

	// Insert Subcategory into database

	let q = 'UPDATE subcategory SET ';
	const values = [];

	// Construct the SET clause for the update query
	const setClauses = [];
	if (subcategory_title) {
		setClauses.push('subcategory_title=?');
		values.push(subcategory_title);
	}
	if (category_category_id) {
		setClauses.push('category_category_id=?');
		values.push(category_category_id);
	}
	if (subcategory_img) {
		setClauses.push('subcategory_img=?');
		values.push(subcategory_img);
	}

	// If no fields to update, return with a message
	if (setClauses.length === 0) {
		return res.status(400).json({ message: 'No fields to update' });
	}

	// Add the set clauses to the update query
	q += setClauses.join(', ');

	// Add the WHERE clause
	q += ' WHERE subcategory.subcategory_id = ?';
	values.push(subcategory_id);

	db.query(q, values, (err, result) => {
		if (err) {
			return res.status(500).json({ message: 'Error updating subcategory', error: err.message });
		} else {
			if (result.affectedRows > 0) {
				return res.status(200).json({ message: 'Subcategory has been updated successfully!' });
			} else {
				return res.status(404).json({ message: 'Subcategory not found' });
			}
		}
	});
};

// DELETE CONTROLLERS

const deleteProduct = async (req, res) => {
	try {
		const product_id = req.params.id;
		const q = 'DELETE FROM product WHERE product_id = ?';

		db.query(q, [product_id]);

		res.status(200).json({ message: 'Product deleted successfully!' });
	} catch (error) {
		return res.status(500).json({ message: 'Error deleting product', error: error.message });
	}
};

const deleteInquiry = async (req, res) => {
	try {
		const inquiry_id = req.params.id;

		const q = 'DELETE FROM inquiry WHERE inquiry_id = ?';

		db.query(q, [inquiry_id]);
		res.status(200).json({ message: 'Inquiry deleted successfully!' });
	} catch (error) {
		return res.status(500).json({ message: 'Error deleting inquiry', error: error.message });
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
/*

SELECT 
    p.product_id, 
    p.product_title, 
    p.product_description,
    p.product_img,
    c.category_title, 
    s.subcategory_title
FROM 
    heroku_8b885150d94607e.product AS p 
    JOIN heroku_8b885150d94607e.subcategory AS s ON p.subcategory_subcategory_id = s.subcategory_id
    JOIN heroku_8b885150d94607e.category AS c ON s.category_category_id = c.category_id;

 -----------------------------------------------------
const getProducts = (req, res) => {
	const q = `SELECT 
			p.product_id, 
			p.product_title, 
			p.product_description,
			p.product_img,
			c.category_title, 
			s.subcategory_title
		FROM 
			heroku_8b885150d94607e.product AS p 
			JOIN heroku_8b885150d94607e.subcategory AS s ON p.subcategory_subcategory_id = s.subcategory_id
			JOIN heroku_8b885150d94607e.category AS c ON s.category_category_id = c.category_id`;
	db.query(q, (err, data) => {
		if (err) return res.json(err);
		return res.json(data);
	});
};

*/
