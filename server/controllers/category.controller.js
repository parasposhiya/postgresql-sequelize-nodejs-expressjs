import MODELS from '../config/db.config.js';

const Category = MODELS.Category;

const findbyId = async (req, res) => {
    let { Id } = req.params;

    await Category.findByPk(Id).then(async (data) => {
        res.json({ status: 200, message: "Success", data: data });
    }).catch(async (error) => {
        res.json({ 'status': 400, 'message': error.message });
    })
}

const insert = async (req, res) => {

    let { title, property, status } = req.body;

    await Category.create({ title: title, property: property, status: status }).then(async (data) => {
        res.json({ status: 200, message: "Success", data: data });
    }).catch(async (error) => {
        res.json({ 'status': 400, 'message': error.message });
    })
}

const patch = async (req, res) => {
    let { Id } = req.params;
    let { title, property, status } = req.body;

    try {
        let category = await Category.findByPk(Id);
  
        if (!category) {
          console.log('subscription not found' );
          return res.status(404).json({ error: 'subscription not found' });
        }
    
        if (title) category.title = title;
        if (property) category.property = property;
        if (status) category.status = status;
       
    
        let patchedCategory = await category.save();
        res.json({ status: 200, message: "Success", data: patchedCategory });
      }
      catch (error) {
          console.log('error =>', error);
      }
}

const remove = async (req, res) => {
    let { Id } = req.params;  


    await Category.update({ status: "deleted" }, { where: { id: Id } }).then(async (data) => {
        res.json({ status: 200, message: "Success", data: data });
    }).catch(async (error) => {
        res.json({ 'status': 400, 'message': error.message });
    })
}

const filter = async (req, res) => {

    await Category.findAll().then(async data => {
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
