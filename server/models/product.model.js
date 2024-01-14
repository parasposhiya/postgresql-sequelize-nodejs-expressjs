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
        categoryId: {
            type: Sequelize.UUID,
            references: {
                model: 'categories',
                key: 'id'
            }
        },
        price: {
            type: Sequelize.BIGINT
        },
        property: {
            type: Sequelize.JSON
        },
        status: {
            type: Sequelize.STRING,
            defaultValue: 'active'
        }
    });

    Product.associate = function(models) {
        Product.belongsTo(models.Category, {
          foreignKey: 'categoryId',
          as: 'category',
          onDelete: 'CASCADE',
        });
    }

    return Product;
};

export default productModel;