import type db from '../../../server/db';
import notes from './data/notes.json';
import {NoteTable} from '../schemas';

export default async function seed(db: db) {
	await db.insert(NoteTable).values(notes);
}
