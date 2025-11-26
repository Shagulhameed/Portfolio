import 'dotenv/config';
import { defineConfig, env } from '@prisma/config';

export default defineConfig({
  schema: 'prisma/schema.prisma',
  datasource: {
    // takes DATABASE_URL from your .env (file:./dev.db)
    url: env('DATABASE_URL'),
  },
});
