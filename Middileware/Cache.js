const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 60 });

const cacheMiddleware = (req, res, next) => {
  const key = req.originalUrl || req.url;
  const cachedData = cache.get(key);

  if (cachedData) {
    return res.status(200).json(cachedData);
  }

  res.sendResponse = res.json;
  res.json = (body) => {
    cache.set(key, body);
    res.sendResponse(body);
  };

  next();
};

module.exports = cacheMiddleware;
