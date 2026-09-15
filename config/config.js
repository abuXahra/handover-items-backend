const redis = {
  host: process.env.REDIS_HOST || "localhost",
  port: Number(process.env.REDIS_PORT) || 6379,
  password: process.env.REDIS_PASSWORD || "",
};

const caching = {
  contentCacheDuration: Number(process.env.CONTENT_CACHE_MILLIS) || 60000,
};

module.exports = {
  redis,
  caching,
};
