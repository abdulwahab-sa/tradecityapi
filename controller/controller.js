const db = require('../models');
const Product = db.products;
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage });

const getAllProducts = async (req, res) => {
	try {
		const result = await Product.findAll({
			include: {
				all: true,
			},
		});

		result.forEach((product) => {
			product.productImg = product.productImg.toString('base64');
			product.subCategoryImg = product.subCategoryImg.toString('base64');
		});

		return res.status(200).json(result);
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
