import {Table, getTableName, sql} from 'drizzle-orm';

import {db, connection} from '../db';
import * as schema from '../db/schemas';
import * as seeds from './seeds';

async function resetTable(db: db, table: Table) {
	return db.execute(
		sql.raw(`TRUNCATE TABLE ${getTableName(table)} RESTART IDENTITY CASCADE`)
	);
}

for (const table of [schema.NoteTable]) {
	// await db.delete(table); // clear tables without truncating / resetting ids
	await resetTable(db, table);
}

await seeds.note(db);

await connection.end();
