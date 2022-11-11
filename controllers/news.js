const { newSchema } = require('../models');

function postNew(req, res) {
    const neededFields = ['title', 'description', 'image'];
    const form = req.body;
    const missingFields = neededFields.filter(field => !form[field]);
    if (missingFields.length > 0) {
        return res.status(400).send({ error: `Missing fields: ${missingFields.join(', ')}` });
    }

    const data = new newSchema({
        title: form.title,
        description: form.description,
        image: form.image,
        url: form?.url
    });

    data.save((err, post) => {
        if (err) {
            return res.status(500).send({ error: 'Error saving donation' });
        }
        res.send(post);
    });
}

function editNew(req, res) {
    const newId = req.params.id;
    const form = req.body;

    newSchema.findByIdAndUpdate(newId, form, { new: true }, (err, post) => {
        if (err) {
            return res.status(500).send({ error: 'Error editing new' });
        }
        res.send(post);
    });
}

function removeNew(req, res) {
    const newId = req.params.id;

    newSchema.findByIdAndRemove(newId, null, (err, post) => {
        if (err) {
            return res.status(500).send({ error: 'Error removing new' });
        }
        res.send(post);
    });
}

function getNews(req, res) {
    newSchema.find({}, (err, news) => {
        if (err) {
            return res.status(500).send({ error: 'Error getting news' });
        }
        res.send(news);
    });
}

module.exports = {
    postNew,
    editNew,
    removeNew,
    getNews
}