const db = require('../config/dbConfig');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage });

// GET CONTROLLERS

const getCategories = (req, res) => {
	const q = 'SELECT * FROM category';
	db.query(q, (err, data) => {
		if (err) return res.json(err);
		return res.json(data);
	});
};

const getSubcategories = (req, res) => {
	const q = 'SELECT * FROM subcategory';
	db.query(q, (err, data) => {
		if (err) return res.json(err);
		return res.json(data);
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
		const result = db.query(q, values);

		// Get the inserted subcategory from database
		/*
		const selectQuery = 'SELECT * FROM subcategory WHERE `subcategory_id` = ?';
		const selectValues = [insertId];
		const [subcategory] = await db.query(selectQuery, selectValues);
*/
		// Return success response
		if (result) return res.status(201).json({ message: 'Subcategory has been created successfully!' });
	} catch (error) {
		// Log error and return error response
		console.error(error);
		return res.status(500).json({ message: 'Error creating subcategory', error: error.message });
	}
};

const createProduct = async (req, res) => {
	try {
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
		const result = db.query(q, values);
		/*
		// Get the inserted product from database
		const selectQuery = 'SELECT * FROM product WHERE `product_id` = ?';
		const selectValues = [insertId];
		await db.query(selectQuery, selectValues);
		*/
		// Return success response
		if (result) return res.status(201).json({ message: 'Product has been created successfully!' });
	} catch (error) {
		// Log error and return error response
		console.error(error);
		return res.status(500).json({ message: 'Error creating product', error: error.message });
	}
};

const createInquiry = async (req, res) => {
	try {
		// Validate request body parameters
		const { inquiry_name, inquiry_email, inquiry_phone, inquiry_req_qty, order_detail } = req.body;

		// Insert inquiry into database
		const q =
			'INSERT INTO inquiry (`inquiry_name`, `inquiry_email`, `inquiry_phone`, `inquiry_req_qty`, `order_detail`) VALUES (?, ?, ?, ?, ?);';
		const values = [inquiry_name, inquiry_email, inquiry_phone, inquiry_req_qty, order_detail];
		const inquiry = db.query(q, values);

		// Return success response
		if (inquiry) return res.status(201).json({ message: 'Inquiry has been created successfully!' });
	} catch (error) {
		// Log error and return error response
		console.error(error);
		return res.status(500).json({ message: 'Error creating inquiry', error: error.message });
	}
};

// UPDATE CONTROLLERS

const updateProduct = async (req, res) => {
	// Validate request body parameters
	const product_id = parseInt(req.params.id);
	const { product_title, product_article, product_description, subcategory_subcategory_id, category_category_id } = req.body;

	// Get product image from request
	const product_img = req.files?.['product_img']?.[0]?.buffer;

	// Insert Product into database

	const q = `UPDATE product SET product_title=?, product_article?, product_img=?, product_description=?, category_category_id=?, subcategory_subcategory_id=? WHERE product_id= ?`;

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

const updateSubcategory = async (req, res) => {
	try {
		// Validate request body parameters
		const subcategory_id = req.params.id;
		const { subcategory_title, category_category_id } = req.body;

		// Get Subcategory Image from request
		const subcategory_img = req.files['subcategory_img'][0].buffer;

		// Insert Subcategory into database

		const q = 'UPDATE subcategory SET `subcategory_title`=?, `subcategory_img`=?,  `category_category_id`=? WHERE `subcategory_id`=?';

		const values = [subcategory_title, subcategory_img, category_category_id, subcategory_id];
		const result = db.query(q, values);

		// Return success response
		if (result) return res.status(200).json({ message: 'Subcategory has been updated successfully!' });
	} catch (error) {
		return res.status(500).json({ message: 'Error updating subcategory', error: error.message });
	}
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
