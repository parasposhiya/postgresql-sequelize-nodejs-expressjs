import MODELS from '../config/db.config.js';

const Product = MODELS.Product;

const findbyId = async (req, res) => {
    let { Id } = req.params;

    await Product.findByPk(Id).then(async (data) => {
        res.json({ status: 200, message: "Success", data: data });
    }).catch(async (error) => {
        res.json({ 'status': 400, 'message': error.message });
    })
}

const insert = async (req, res) => {
    let { title, description, version } = req.body

    await Product.create({ title: title, description: description, version: version }).then(async (data) => {
        res.json({ status: 200, message: "Success", data: data });
    }).catch(async (error) => {
        res.json({ 'status': 400, 'message': error.message });
    })

}

const patch = async (req, res) => {


    const { Id } = req.params;
    const { title, description, version, status } = req.body; // Specify the columns you want to update

    try {
        let product = await Product.findByPk(Id);

        if (!product) {
            console.log('product not found');
            return res.status(404).json({ error: 'product not found' });
        }

        if (title) user.title = title;
        if (description) user.description = description;
        if (version) user.version = version;
        if (status) user.status = status;

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

    await Product.findAll().then(async (data) => {

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

