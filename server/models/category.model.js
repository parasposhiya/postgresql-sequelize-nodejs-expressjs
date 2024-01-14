const categoryModel = (Interface, Sequelize) => {
    const Category = Interface.define('category', {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4,
        },
        title: {
            type: Sequelize.STRING
        },
        property: {
            type: Sequelize.JSON
        },
        status: {
            type: Sequelize.STRING,
            defaultValue: 'active'
        }
    });

    Category.associate = function (models) {
        Category.hasMany(models.Product, {
            as: 'products',
            foreignKey: 'categoryId',
            onDelete: 'CASCADE'
        });
    };

    return Category;
};

export default categoryModel;