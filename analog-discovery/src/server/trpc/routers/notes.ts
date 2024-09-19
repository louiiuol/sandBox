import {z} from 'zod';
import {publicProcedure, router} from '../trpc';
import {NoteTable} from '../../../server/db/schemas';
import {db} from '../../../server/db';
import {eq} from 'drizzle-orm';

export const noteRouter = router({
	create: publicProcedure
		.input(z.string())
		.mutation(
			async ({input}) =>
				await db.insert(NoteTable).values({note: input}).returning()
		),
	list: publicProcedure.query(async () => await db.select().from(NoteTable)),
	getOne: publicProcedure.input(z.string()).mutation(async ({input}) => {
		return (
			await db.selectDistinct().from(NoteTable).where(eq(NoteTable.id, input))
		)[0];
	}),
	remove: publicProcedure.input(z.string()).mutation(async ({input}) => {
		await db.delete(NoteTable).where(eq(NoteTable.id, input));
		return input;
	}),
});
