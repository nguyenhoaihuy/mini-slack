const express = require('express');
const router = express.Router();

router.get('/', (req,res) => {
    res.send('Server response from index');
});

module.exports = router;