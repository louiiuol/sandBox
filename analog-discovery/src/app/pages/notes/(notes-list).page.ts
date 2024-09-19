import {Component} from '@angular/core';
import {injectTrpcClient} from '@trpc';
import {AsyncPipe, DatePipe} from '@angular/common';
import {waitFor} from '@analogjs/trpc';
import {Subject, switchMap, shareReplay, take} from 'rxjs';
import {NoteCreateComponent} from '../../components/note-create.component';

@Component({
	selector: 'app-notes-list',
	standalone: true,
	imports: [AsyncPipe, DatePipe, NoteCreateComponent],
	template: `
		<h2>Notes List</h2>
		@if (notes$ | async; as notes) {
		<div class="mt-4">
			@for (note of notes; track note.id; let i = $index) {
			<div class="note mb-4 p-4 font-normal border border-input rounded-md">
				<div class="flex items-center justify-between">
					<p class="text-sm text-zinc-400">{{ note.createdAt | date }}</p>
					<button
						class="inline-flex items-center justify-center text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background hover:bg-zinc-100 hover:text-zinc-950 h-6 w-6 rounded-md"
						(click)="removeNote(note.id)">
						x
					</button>
				</div>
				<p class="mb-4">{{ note.note }}</p>
			</div>
			} @empty {
			<div class="no-notes text-center rounded-xl p-20">
				<h3 class="text-xl font-medium">No notes yet!</h3>
				<p class="text-zinc-400">Add a new one and see them appear here...</p>
			</div>
			}
		</div>
		} @else {
		<p class="text-center mt-4">Loading...</p>
		}
		<hr />
		<app-note-create (noteCreated)="triggerRefresh$.next()" />
	`,
})
export default class NotesListComponent {
	private _trpc = injectTrpcClient();
	public triggerRefresh$ = new Subject<void>();
	public notes$ = this.triggerRefresh$.pipe(
		switchMap(() => this._trpc.note.list.query()),
		shareReplay(1)
	);
	public newNote = '';

	constructor() {
		void waitFor(this.notes$);
		this.triggerRefresh$.next();
	}

	public removeNote(id: string) {
		this._trpc.note.remove
			.mutate(id)
			.pipe(take(1))
			.subscribe(() => this.triggerRefresh$.next());
	}
}
