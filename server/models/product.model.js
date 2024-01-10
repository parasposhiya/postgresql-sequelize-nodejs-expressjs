const productModel = (Interface, Sequelize) => {
    const Product = Interface.define('product', {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4,
        },
        title: {
            type: Sequelize.STRING
        },
        status: {
            type: Sequelize.STRING,
            defaultValue: 'active'
        },
        description: {
            type: Sequelize.TEXT
        },
        version: {
            type: Sequelize.STRING
        },
    });

    Product.associate = (models) => {
        Product.hasMany(models.Subscription, { onDelete: 'CASCADE', onUpdate: 'CASCADE' });
    };

    return Product;
};

export default productModel;