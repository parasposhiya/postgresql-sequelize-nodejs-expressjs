import MODELS from '../config/db.config.js';

const Subscription = MODELS.Subscription;

const findbyId = async (req, res) => {
    let { Id } = req.params;

    await Subscription.findByPk(Id).then(async (data) => {
        res.json({ status: 200, message: "Success", data: data });
    }).catch(async (error) => {
        res.json({ 'status': 400, 'message': error.message });
    })
}

const insert = async (req, res) => {

    let { orgid, clientid, startdate, expirydate, productid, status, description } = req.body;

    await Subscription.create({ orgid: orgid, clientid: clientid, startdate: startdate, expirydate: expirydate, productid: productid, status: status, description: description }).then(async (data) => {
        res.json({ status: 200, message: "Success", data: data });
    }).catch(async (error) => {
        res.json({ 'status': 400, 'message': error.message });
    })
}

const patch = async (req, res) => {
    let { Id } = req.params;
    let { orgid, clientid, startdate, expirydate, productid, status, description } = req.body;

    try {
        let subscription = await Subscription.findByPk(Id);
  
        if (!subscription) {
          console.log('subscription not found' );
          return res.status(404).json({ error: 'subscription not found' });
        }
    
        if (orgid) subscription.orgid = orgid;
        if (clientid) subscription.clientid = clientid;
        if (startdate) subscription.startdate = startdate;
        if (expirydate) subscription.expirydate = expirydate;
        if (productid) subscription.productid = productid;
        if (status) subscription.status = status;
        if (description) subscription.description = description;
       
    
        let patchedsubscription = await subscription.save();
        res.json({ status: 200, message: "Success", data: patchedsubscription });
      }
      catch (error) {
          console.log('error =>', error);
      }
}

const remove = async (req, res) => {
    let { Id } = req.params;  


    await Subscription.update({ status: "deleted" }, { where: { id: Id } }).then(async (data) => {
        res.json({ status: 200, message: "Success", data: data });
    }).catch(async (error) => {
        res.json({ 'status': 400, 'message': error.message });
    })
}

const filter = async (req, res) => {

    await Subscription.findAll().then(async data => {
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
