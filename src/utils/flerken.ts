import { getClient } from '@web/utils/redis';

export async function getFlerkenIp() {
  const redisClient = await getClient();
  const ip = await redisClient.get('flerken:ip');
  return ip;
}
