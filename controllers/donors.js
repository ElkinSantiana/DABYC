const { donorSchema } = require('../models');

function postDonor(req, res) {
    const neededFields = ["name", "image"];
    const form = req.body;
    const missingFields = neededFields.filter(field => !form[field]);
    if (missingFields.length > 0) {
        return res.status(400).send({ error: `Missing fields: ${missingFields.join(', ')}` });
    }

    const donor = new donorSchema({
        name: form.name,
        image: form.image
    });

    donor.save((err, donation) => {
        if (err) {
            return res.status(500).send({ error: 'Error saving donor' });
        }
        res.send(donation);
    });
}

function editDonor(req, res) {
    const donorId = req.params.id;
    const form = req.body;

    donorSchema.findByIdAndUpdate(donorId, form, { new: true }, (err, donor) => {
        if (err) {
            return res.status(500).send({ error: 'Error editing donor' });
        }
        res.send(donor);
    });
}

function removeDonor(req, res) {
    const donorId = req.params.id;

    donorSchema.findByIdAndRemove(donorId, (err, donor) => {
        if (err) {
            return res.status(500).send({ error: 'Error removing donor' });
        }
        res.send(donor);
    });
}

function getDonors(req, res) {
    donorSchema.find({}, (err, donors) => {
        if (err) {
            return res.status(500).send({ error: 'Error getting donors' });
        }
        res.send(donors);
    });
}

module.exports = {
    postDonor,
    editDonor,
    removeDonor,
    getDonors
}