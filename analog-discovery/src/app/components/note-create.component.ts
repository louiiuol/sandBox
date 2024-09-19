import {Component, output} from '@angular/core';
import {FormsModule, NgForm} from '@angular/forms';
import {injectTrpcClient} from '@trpc';
import {take} from 'rxjs';

@Component({
	selector: 'app-note-create',
	standalone: true,
	imports: [FormsModule],
	template: `
		<div
			class="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
			<h2 class="text-[#DD0031] font-medium text-3xl leading-[1.1]">
				Leave a note
			</h2>
			<p class="max-w-[85%] leading-normal sm:text-lg sm:leading-7">
				This is an example of how you can use tRPC to superpower your
				client-server interaction.
			</p>
		</div>
		<form
			class="mt-8 pb-2 flex items-center"
			#f="ngForm"
			(ngSubmit)="addNote(f)">
			<label class="sr-only" for="newNote"> Note </label>
			<input
				required
				autocomplete="off"
				name="newNote"
				[(ngModel)]="newNote"
				class="w-full inline-flex items-center justify-center text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background border border-input hover:text-zinc-950 h-11 px-2 rounded-md" />
			<button
				class="ml-2 inline-flex items-center justify-center text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background border border-input hover:bg-zinc-100 hover:text-zinc-950 h-11 px-8 rounded-md">
				+
			</button>
		</form>
	`,
})
export class NoteCreateComponent {
	newNote = '';

	noteCreated = output<void>();

	private _trpc = injectTrpcClient();

	constructor() {}

	addNote(form: NgForm) {
		if (!form.valid) {
			form.form.markAllAsTouched();
			return;
		}
		this._trpc.note.create
			.mutate(this.newNote)
			.pipe(take(1))
			.subscribe(() => {
				this.newNote = '';
				form.form.reset();
				this.noteCreated.emit();
			});
	}
}
