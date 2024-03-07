const express = require('express');

const Urlrouter = express.Router();
const { handleGenerateUrl, handleGetStats } = require('../controllers/url');

// /shortner
Urlrouter.post('/', handleGenerateUrl);
Urlrouter.get('/stats/:shortid', handleGetStats);

module.exports = Urlrouter;