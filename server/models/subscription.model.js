const subscriptionModel = (Interface, Sequelize) => {
    const Subscription = Interface.define('subscription', {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4,
        },
        orgid: {
            type: Sequelize.STRING
        },
        clientid: {
            type: Sequelize.STRING
        },
        startdate: {
            type: Sequelize.DATE
        },
        expirydate: {
            type: Sequelize.DATE
        },
        productid: {
            type: Sequelize.UUID,
            references: {
                model: 'products',
                key: 'id'
            }
        },
        status: {
            type: Sequelize.STRING,
            defaultValue: 'active'
        },
        description: {
            type: Sequelize.TEXT
        },
    });

    Subscription.associate = (models) => {
        Subscription.belongsTo(models.Product);
    };

    return Subscription;
};

export default subscriptionModel;