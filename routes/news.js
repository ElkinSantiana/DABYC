const express = require("express");
const { news } = require('../controllers');
const router = express.Router();


router.post('/', news.postNew);
router.put('/:id', news.editNew);
router.delete('/:id', news.removeNew);
router.get('/', news.getNews);

module.exports = router;