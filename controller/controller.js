const db = require('../config/dbConfig');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage });

const getAllProducts = async (req, res) => {
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

const getProduct = async (req, res) => {
	try {
		const result = await Product.findOne({ where: { id: `${req.params.id * 1}` } });

		res.json(result);
		res.status(200);
	} catch (err) {
		res.send(err);
	}
};

const createProduct = async (req, res) => {
	try {
		const subCategoryImg = req.files['subCategoryImg'][0].buffer;
		const productImg = req.files['productImg'][0].buffer;

		const result = await Product.create({
			mainCategory: req.body.mainCategory,
			subCategory: req.body.subCategory,
			productName: req.body.productName,
			article: req.body.article,
			productDescription: req.body.productDescription,
			subCategoryImg,
			productImg,
		});
		res.status(201).send(result);
		console.log(result);
	} catch (err) {
		res.send(err);
	}
};

const updateProduct = async (req, res) => {
	try {
		const subCategoryImg = req.files['subCategoryImg'][0].buffer;
		const productImg = req.files['productImg'][0].buffer;

		const result = await Product.findOne({ where: { id: `${req.params.id * 1}` } });
		result.set({
			mainCategory: req.body.mainCategory,
			subCategory: req.body.subCategory,
			productName: req.body.productName,
			article: req.body.article,
			productDescription: req.body.productDescription,
			subCategoryImg,
			productImg,
		});

		await result.save();
		res.status(201).send(result);
	} catch (err) {
		res.send(err);
	}
};

const deleteProduct = async (req, res) => {
	try {
		const result = await Product.destroy({
			where: {
				id: `${req.params.id * 1}`,
			},
		});
		res.status(204).json({
			status: 'success',
			data: null,
		});
	} catch (err) {
		res.send(err);
	}
};

module.exports = { getAllProducts, getProduct, createProduct, deleteProduct, updateProduct };
