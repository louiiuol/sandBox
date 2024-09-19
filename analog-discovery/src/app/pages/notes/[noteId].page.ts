import {waitFor} from '@analogjs/trpc';
import {AsyncPipe, DatePipe} from '@angular/common';
import {Component, Input} from '@angular/core';
import {shareReplay, Subject, switchMap, take} from 'rxjs';
import {injectTrpcClient} from '../../../trpc-client';

@Component({
	selector: 'app-note-details',
	standalone: true,
	imports: [AsyncPipe, DatePipe],
	template: `
		<h2>Note Details</h2>
		@if(note$ | async; as note) {
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
		}
	`,
})
export default class NoteDetailsPageComponent {
	@Input({required: true}) noteId!: string;
	private _trpc = injectTrpcClient();
	public triggerRefresh$ = new Subject<void>();
	public note$ = this.triggerRefresh$.pipe(
		switchMap(() => this._trpc.note.getOne.mutate(this.noteId)),
		shareReplay(1)
	);

	constructor() {
		void waitFor(this.note$);
		this.triggerRefresh$.next();
	}

	public removeNote(id: string) {
		this._trpc.note.remove
			.mutate(id)
			.pipe(take(1))
			.subscribe(() => this.triggerRefresh$.next());
	}
}
