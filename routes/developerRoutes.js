const express = require('express');
const { createDeveloper,loginDeveloper,updateDeveloperProfile} = require('../controllers/developerController');
const { protect } = require('../middleware/authMiddleware');


const router = express.Router();

router.post('/register', createDeveloper);
router.post('/login', loginDeveloper);
router.put('/updateprofile', updateDeveloperProfile);


module.exports = router;
