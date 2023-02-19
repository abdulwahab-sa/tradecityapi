module.exports = (sequelize, DataTypes) => {
	const Product = sequelize.define('product', {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		mainCategory: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		subCategory: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		productName: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		article: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		productDescription: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		subCategoryImg: {
			type: DataTypes.BLOB('long'),
			allowNull: false,
		},
		productImg: {
			type: DataTypes.BLOB('long'),
			allowNull: false,
		},
	});
	return Product;
};
