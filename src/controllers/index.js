const builder = require('xmlbuilder');
const axios = require('axios');

const { config } = require('../config');
const { itemMapper } = require('../utils/itemMapper');

const fetch = async (req, res) => {
  try {
    const response = await axios.get(config.api.baseUrl);
    const items = response.data.docs.map(itemMapper);

    const resources = {};
    const root = builder.create({
      resources
    });

    items.forEach(resource => {
      return root.ele({ resource });
    });

    const result = root.end({ pretty: true });

    res.set('Content-Type', 'text/xml');
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', 0);
    res.send(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports = { fetch };
