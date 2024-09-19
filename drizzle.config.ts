import {defineConfig} from 'drizzle-kit';
import env from './analog-discovery/src/env';

export default defineConfig({
	schema: './analog-discovery/src/server/db/schemas/*',
	out: './analog-discovery/src/server/db/migrations',
	dialect: 'postgresql',
	dbCredentials: {
		url: env.DATABASE_URL,
	},
	verbose: true,
	strict: true,
});
