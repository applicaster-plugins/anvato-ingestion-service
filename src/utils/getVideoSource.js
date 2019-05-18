getVideoSource = videos => {
  const source = videos.reduce((currentSource, element) => {
    if (
      element.url &&
      element.type &&
      element.type.toLowerCase() === 'video/mp4'
    ) {
      if (currentSource) {
        if (currentSource.height < element.height) {
          return element;
        }
      } else {
        return element;
      }
    }
    return currentSource;
  }, null);
  return source.url;
};

module.exports = { getVideoSource };
