const express = require('express');
const { fetch } = require('../controllers');

module.exports = () => {
  const router = express.Router();

  router.get('/fetch', fetch);

  return router;
};
