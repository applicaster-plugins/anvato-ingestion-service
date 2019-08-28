const Parser = require('rss-parser');
const builder = require('xmlbuilder');
const btoa = require('btoa');

const { itemMapper } = require('../utils/itemMapper');

const fetch = async (req, res) => {
  try {
    const parser = new Parser({
      customFields: {
        item: [['media:thumbnail', 'thumbnail'], ['media:group', 'mediaGroup'], ['updateDate', 'updateDate']]
      }
    });

    const { url, image_key } = req.query;

    const feed = await parser.parseURL(url);
    const items = feed.items.map(itemMapper(image_key));

    const resources = {};
    const root = builder.create({
      resources
    });

    const idPrefix = btoa(url);
    items.forEach(resource => {
      resource.attributes.external_id = `${idPrefix}_2_${
        resource.attributes.external_id
      }`;
      return root.ele({ resource });
    });

    const result = root.end({ pretty: true });

    res.set('Content-Type', 'text/xml');
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', 0);
    res.send(result);
  } catch (err) {
    res.send(500, err.message);
  }
};

module.exports = { fetch };
