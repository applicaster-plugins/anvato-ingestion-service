const moment = require('moment');
const { getVideoSource } = require('../utils/getVideoSource');

module.exports.itemMapper = (image_key = 'image_base') => item => {
  try {
    const {
      guid,
      title,
      content: description,
      pubDate,
      thumbnail,
      mediaGroup
    } = item;

    const enabled = 'true';
    const free = 'true';
    const type = 'video';

    let image_assets;
    if (!thumbnail) {
      console.log(`item has not thumbnail! ${guid} ${title}`);
    } else {
      const image_asset_base = {
        key: image_key,
        url: thumbnail.$.url
      };

      image_assets = {
        image_asset: [image_asset_base]
      };
    }

    const external_id = guid;
    const date_published = moment(new Date(pubDate)).format('YYYYMMDDTHH:mmZ');

    const videos = mediaGroup['media:content'].map(video => video.$);
    const videoUrl = getVideoSource(videos);

    const alternative_streams = {
      default: videoUrl
    };

    const attributes = {
      enabled,
      free,
      title,
      description,
      external_id,
      date_published,
      alternative_streams,
      image_assets
    };

    const resource = {
      type,
      attributes
    };

    return resource;
  } catch (err) {
    console.log(`Error mapping item:${err.message} ${item}`);
    return {};
  }
};
