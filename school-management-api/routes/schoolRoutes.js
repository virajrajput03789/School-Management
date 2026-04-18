const express = require('express');
const router = express.Router();
const { addSchool, listSchools } = require('../controllers/schoolController');
const { validateAddSchool, validateListSchools } = require('../middleware/validate');

// API 1 — POST /addSchool
router.post('/addSchool', validateAddSchool, addSchool);

// API 2 — GET /listSchools
router.get('/listSchools', validateListSchools, listSchools);

module.exports = router;
