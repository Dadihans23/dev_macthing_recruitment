const express = require('express');
const { createDeveloper,loginDeveloper,updateDeveloperProfile,deleteDeveloperAccount , addProjectToPortfolio} = require('../controllers/developerController');
const { protect } = require('../middleware/authMiddleware');


const router = express.Router();

router.post('/register', createDeveloper);
router.post('/login', loginDeveloper);
router.put('/updateprofile', protect , updateDeveloperProfile);
router.delete('/delete', protect, deleteDeveloperAccount);
router.post('/add-project', protect, addProjectToPortfolio);




module.exports = router;
