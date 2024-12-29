const Redis = require("ioredis"); // Import Redis client

const configs = require("./configs");

// Initialize Redis client using the provided URI
const redisClient = new Redis("redis://127.0.0.1:6379");

// Event listeners for connection success and error handling
redisClient.on("connect", () => {
  console.log("Connect To Redis Successfully.");
});

redisClient.on("error", (error) => {
  console.error("Redis connection error:", error);
});

module.exports = redisClient; // Export the Redis client for reuse
