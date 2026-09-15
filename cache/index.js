const { createClient } = require("redis");
const { redis } = require("../config/config");

const redisURL = redis.password
  ? `redis://:${redis.password}@${redis.host}:${redis.port}`
  : `redis://${redis.host}:${redis.port}`;

const client = createClient({
  url: redisURL,
});

// Redis events
client.on("connect", () => {
  console.info("Cache is connecting");
});

client.on("ready", () => {
  console.info("Cache is ready");
});

client.on("end", () => {
  console.info("Cache connection ended");
});

client.on("reconnecting", () => {
  console.info("Cache is reconnecting");
});

client.on("error", (error) => {
  console.error("Redis error:", error);
});

// Connect to Redis
async function redisConnect() {
  try {
    await client.connect();
  } catch (error) {
    console.error(
      "Redis connection failed. Retrying in 5 seconds...",
      error.message,
    );

    setTimeout(() => {
      redisConnect();
    }, 5000);
  }
}

redisConnect();

// Graceful shutdown
process.on("SIGINT", async () => {
  if (client.isOpen) {
    await client.disconnect();
  }

  process.exit(0);
});

module.exports = client;
