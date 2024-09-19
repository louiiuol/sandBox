import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';

@Component({
	standalone: true,
	imports: [RouterOutlet],
	host: {class: 'flex border-1 border-black rounded-lg w-full px-12 py-6'},
	template: `
		<h2>Notes</h2>
		<router-outlet></router-outlet>
	`,
})
export default class NotesLayoutComponent {}
