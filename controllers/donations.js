const { donationSchema } = require('../models');

function postForm(req, res) {
    const neededFields = ['fullName', 'email', 'phone', "address", 'kit', 'products'];
    const form = req.body;
    const missingFields = neededFields.filter(field => !form[field]);
    if (missingFields.length > 0) {
        return res.status(400).send({ error: `Missing fields: ${missingFields.join(', ')}` });
    }

    let products = form.products.filter(product => product.name && product.quantity > 0);

    const donation = new donationSchema({
        fullName: form.fullName,
        email: form.email,
        phone: form.phone,
        address: form.address,
        kit: form.kit,
        products: products,
        message: form?.message
    });

    donation.save((err, donation) => {
        if (err) {
            return res.status(500).send({ error: 'Error saving donation' });
        }
        res.send(donation);
    });
}

function getDonations(req, res) {
    donationSchema.find({}, (err, donations) => {
        if (err) {
            return res.status(500).send({ error: 'Error getting donations' });
        }
        res.send(donations);
    });
}

function removeDonation(req, res) {
    donationSchema.findByIdAndRemove(req.params.id, (err, donation) => {
        if (err) {
            return res.status(500).send({ error: 'Error deleting donation' });
        }
        res.send(donation);
    });
}

module.exports = {
    postForm,
    getDonations,
    removeDonation
}