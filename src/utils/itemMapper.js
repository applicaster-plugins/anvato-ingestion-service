const moment = require('moment');
const { config } = require('../config');

module.exports.itemMapper = item => {
  try {
    const {
      obj_id: id,
      c_title_s: title,
      c_description_s: description,
      c_ts_publish_l: published,
      media_url,
      thumbnails
    } = item;

    const enabled = 'true';
    const free = 'true';
    const type = 'video';

    const image_asset = thumbnails
      .map(imageItem => {
        try {
          const { url, role } = imageItem;
          const key = config.imageKeyMapping[role]
            ? config.imageKeyMapping[role]
            : 'image_base';

          return {
            key,
            url
          };
        } catch (err) {
          return null;
        }
      })
      .filter(i => i);

    const image_assets = {
      image_asset
    };

    const external_id = id;
    const date_published = moment(new Date(published)).format(
      'YYYYMMDDTHH:mmZ'
    );

    const alternative_streams = {
      default: media_url
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
