const db = require('../config/dbConfig');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage });

// GET CONTROLLERS

const getCategories = async (req, res) => {
	try {
		const q = 'SELECT * FROM category';
		db.query(q, (err, data) => {
			if (err) return res.json(err);
			return res.json(data);
		});
	} catch (err) {
		res.send(err);
	}
};

const getSubcategories = async (req, res) => {
	try {
		const q = 'SELECT * FROM subcategory';
		db.query(q, (err, data) => {
			if (err) return res.json(err);
			return res.json(data);
		});
	} catch (err) {
		res.send(err);
	}
};

const getProducts = async (req, res) => {
	try {
		const q = 'SELECT * FROM product';
		db.query(q, (err, data) => {
			if (err) return res.json(err);
			return res.json(data);
		});
	} catch (err) {
		res.send(err);
	}
};

const getInquiries = async (req, res) => {
	try {
		const q = 'SELECT * FROM inquiry';
		db.query(q, (err, data) => {
			if (err) return res.json(err);
			return res.json(data);
		});
	} catch (error) {
		res.send(error);
	}
};

// POST CONTROLLERS

const createSubcategory = async (req, res) => {
	try {
		const subcategory_img = req.files?.['subcategory_img']?.[0]?.buffer;
		if (!subcategory_img) {
			throw new Error('No subcategory image found in request');
		}

		const q = 'INSERT INTO subcategory (`subcategory_title`, `subcategory_img`, `category_category_id`) VALUES (?, ?, ?);';
		const values = [req.body.subcategory_title, subcategory_img, req.body.category_category_id];

		const [result] = await db.promise().query(q, values);
		return res.status(200).json({ message: 'Subcategory has been created successfully!', data: result });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: 'Error creating subcategory', error });
	}
};

/*

const createSubcategory = async (req, res) => {
	try {
		const subcategory_img = req.files['subcategory_img'][0].buffer;
		const q = 'INSERT INTO subcategory (`subcategory_title`, `subcategory_img`, `category_category_id`) VALUES (?);';
		const values = [req.body.subcategory_title, subcategory_img, req.body.category_category_id];
		db.query(q, values, (err, data) => {
			if (err) return res.json(err);
			return res.json({ message: 'Subcategory has been created successfully!', data });
		});
	} catch (error) {
		res.send(error);
	}
};
*/
const createProduct = async (req, res) => {
	try {
		const product_img = req.files['product_img'][0].buffer;
		const q =
			'INSERT INTO product (`product_title`, `product_img`, `product_description`, `category_category_id`, `subcategory_subcategory_id`) VALUES (?)';
		const values = [req.body.title, product_img, req.body.product_description, req.body.category_id, req.body.subcategory_id];
		db.query(q, values, (err, data) => {
			if (err) return res.json(err);
			return res.json(data, 'Product has been created successfully!');
		});
	} catch (err) {
		res.send(err);
	}
};

const createInquiry = async (req, res) => {
	try {
		const q = 'INSERT INTO inquiry (`name`, `email`, `phone`, `req_qty`, `order_detail`) VALUES (?)';
		const values = [req.body.name, req.body.email, req.body.phone, req.body.req_qty, req.body.order_detail];
		db.query(q, values, (err, data) => {
			if (err) return res.json(err);
			return res.json(data, 'Inquiry has been created successfully!');
		});
	} catch (err) {
		res.send(err);
	}
};

// UPDATE CONTROLLERS

const updateProduct = async (req, res) => {
	try {
		const product_id = req.params.id;
		const product_img = req.files['product_img'][0].buffer;

		const q =
			'UPDATE product SET `product_title`=?, `product_img`=?, `product_description`=?, `category_category_id`=?, `subcategory_subcategory_id`=? ';

		const values = [req.body.title, product_img, req.body.product_description, req.body.category_id, req.body.subcategory_id];

		db.query(q, [...values, product_id], (err, data) => {
			if (err) return res.json(err);
			return res.json(data, 'Product has been updated');
		});
	} catch (err) {
		res.send(err);
	}
};

const updateSubcategory = async (req, res) => {
	try {
		const subcategory_id = req.params.id;
		const subcategory_img = req.files['subcategory_img'][0].buffer;

		const q = 'UPDATE subcategory SET `subcategory_title`=?, `subcategory_img`=?,  `category_category_id`=?';

		const values = [req.body.title, subcategory_img, req.body.category_id];

		db.query(q, [...values, subcategory_id], (err, data) => {
			if (err) return res.json(err);
			return res.json(data, 'Subcategory has been updated');
		});
	} catch (err) {
		res.send(err);
	}
};

// DELETE CONTROLLERS

const deleteProduct = async (req, res) => {
	try {
		const product_id = req.params.id;

		const q = 'DELETE FROM product WHERE product_id = ?';

		db.query(q, [product_id], (err, data) => {
			if (err) return res.json(err);
			return res.json('Product has been deleted');
		});
	} catch (err) {
		res.send(err);
	}
};

const deleteInquiry = async (req, res) => {
	try {
		const inquiry_id = req.params.id;

		const q = 'DELETE FROM inquiry WHERE inquiry_id = ?';

		db.query(q, [inquiry_id], (err, data) => {
			if (err) return res.json(err);
			return res.json('Inquiry has been deleted');
		});
	} catch (err) {
		res.send(err);
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
