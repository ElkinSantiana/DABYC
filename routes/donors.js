const express = require("express");
const { donors } = require('../controllers');
const router = express.Router();


router.post('/', donors.postDonor);
router.put('/:id', donors.editDonor);
router.delete('/:id', donors.removeDonor);
router.get('/', donors.getDonors);

module.exports = router;