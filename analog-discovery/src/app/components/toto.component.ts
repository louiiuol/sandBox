import {HttpClient} from '@angular/common/http';
import {
	Component,
	computed,
	effect,
	model,
	OnInit,
	Signal,
	signal,
} from '@angular/core';

import {toSignal} from '@angular/core/rxjs-interop';
import {of} from 'rxjs';

@Component({
	standalone: true,
	imports: [],
	selector: 'app-toto',
	template: `
		<button (click)="growUp()">Click me</button>
		{{ isAdult() }}

		@if (isAdult()) {
		<h1>Vous êtes majeur</h1>
		}
	`,
})
export class TotoComponent implements OnInit {
	age = model.required<number>();

	yolo = signal(false);

	isAdult = computed(() => this.age() > 17);

	data: Signal<{name: string}>;

	constructor(private http: HttpClient) {
		effect(() => {
			console.log(`You now have ${this.age()} years old`);
		});
		this.data = toSignal(this.getOneObject(), {initialValue: {name: 'hi'}});
	}

	ngOnInit() {}

	growUp() {
		this.age.set(this.age() + 1);
	}

	getOneObject = () => of({name: 'hello'});
}
