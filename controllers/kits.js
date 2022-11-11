const { kitSchema } = require('../models');

function postKit(req, res) {
    const neededFields = ["name", "image", "products"];
    const form = req.body;
    const missingFields = neededFields.filter(field => !form[field]);
    if (missingFields.length > 0) {
        return res.status(400).send({ error: `Missing fields: ${missingFields.join(', ')}` });
    }

    if (!Array.isArray(form.products) || form.products.length === 0) {
        return res.status(400).send({ error: `Missing products` });
    }

    const kit = new kitSchema({
        name: form.name,
        image: form.image,
        products: form.products
    });

    kit.save((err, kit) => {
        if (err) {
            return res.status(500).send({ error: 'Error saving kit' });
        }
        res.send(kit);
    });
}

function editKit(req, res) {
    const kitId = req.params.id;
    const form = req.body;

    kitSchema.findByIdAndUpdate(kitId, form, { new: true }, (err, kit) => {
        if (err) {
            return res.status(500).send({ error: 'Error editing kit' });
        }
        res.send(kit);
    });
}

function removeKit(req, res) {
    const kitId = req.params.id;

    kitSchema.findByIdAndRemove(kitId, (err, kit) => {
        if (err) {
            return res.status(500).send({ error: 'Error removing kit' });
        }
        res.send(kit);
    });
}

function getKits(req, res) {
    kitSchema.find({}, (err, kits) => {
        if (err) {
            return res.status(500).send({ error: 'Error getting kits' });
        }
        res.send(kits);
    });
}

module.exports = {
    postKit,
    editKit,
    removeKit,
    getKits
}