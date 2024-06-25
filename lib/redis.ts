import { connect } from 'redis';

export const redisClient = await connect({
  hostname: Deno.env.get("REDIS_URL"),
  port: Deno.env.get("REDIS_PORT"),
  password: Deno.env.get("REDIS_PASSWORD"),
});
