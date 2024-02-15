import { createClient, RedisClientType } from 'redis';

export const redis = createClient({
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT || '17228'),
  },
});

let client: RedisClientType;

export const getClient = async () => {
  if (!client) {
    client = (await redis.connect()) as RedisClientType;
  }

  return client;
};
