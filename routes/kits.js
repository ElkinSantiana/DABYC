const express = require("express");
const { kits } = require('../controllers');
const router = express.Router();


router.post('/', kits.postKit);
router.put('/:id', kits.editKit);
router.delete('/:id', kits.removeKit);
router.get('/', kits.getKits);

module.exports = router;