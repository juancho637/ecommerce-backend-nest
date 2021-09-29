import { registerAs } from '@nestjs/config';

export const databaseConfig = registerAs('database', () => {
  return {
    default: {
      driver: process.env.DB_DEFAULT_DRIVER,
      url: process.env.DB_DEFAULT_URL,
    },
  };
});
