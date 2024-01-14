import MODELS from '../config/db.config.js';

const Product = MODELS.Product;
const Category = MODELS.Category;

const findbyId = async (req, res) => {
    let { Id } = req.params;

    await Product.findByPk(Id,
        {
            include: [
                { model: Category, as: "category" }
            ]
        }
    ).then(async (data) => {
        res.json({ status: 200, message: "Success", data: data });
    }).catch(async (error) => {
        res.json({ 'status': 400, 'message': error.message });
    })
}

const insert = async (req, res) => {
    let { title, price, categoryid, property, status } = req.body

    await Product.create({ title: title, price: price, categoryId: categoryid, property: property, status: status }).then(async (data) => {
        res.json({ status: 200, message: "Success", data: data });
    }).catch(async (error) => {
        res.json({ 'status': 400, 'message': error.message });
    })

}

const patch = async (req, res) => {


    const { Id } = req.params;
    const { title, categoryid, price, property, status } = req.body; // Specify the columns you want to update

    try {
        let product = await Product.findByPk(Id);

        if (!product) {
            console.log('product not found');
            return res.status(404).json({ error: 'product not found' });
        }

        if (title) product.title = title;
        if (categoryid) product.categoryId = categoryid;
        if (price) product.price = price;
        if (property) product.property = property;
        if (status) product.status = status;

        let patchedProduct = await product.save();
        res.json({ status: 200, message: "Success", data: patchedProduct });
    }
    catch (error) {
        console.log('error =>', error);
    }

}

const remove = async (req, res) => {
    let { Id } = req.params;

    await Product.update({ status: "deleted" }, { where: { id: Id } }).then(async (data) => {
        res.json({ status: 200, message: "Success", data: data });
    }).catch(async (error) => {
        res.json({ 'status': 400, 'message': error.message });
    })
}

const filter = async (req, res) => {

    await Product.findAll(
        {
            include: [
                { model: Category, as: "category" }
            ]
        }
    ).then(async (data) => {

        res.json({ status: 200, message: "Success", data: data });
    }).catch(async (error) => {
        res.json({ 'status': 400, 'message': error.message });
    })

}

export default {
    findbyId,
    insert,
    patch,
    remove,
    filter,
}

