const express = require("express");
const { donations } = require('../controllers');
const router = express.Router();


router.post('/', donations.postForm); 
router.delete('/:id', donations.removeDonation);
router.get('/', donations.getDonations);

module.exports = router;