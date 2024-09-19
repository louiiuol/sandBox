import {Component, OnInit, signal} from '@angular/core';
import {TotoComponent} from '../components/toto.component';

@Component({
	standalone: true,
	imports: [TotoComponent],
	selector: 'app-signal-test',
	template: `
		<app-toto [age]="age()" />
		<button (click)="click()">NOOO MEEE</button>
	`,
})
export default class SignalTestComponent implements OnInit {
	age = signal(12);

	constructor() {}

	ngOnInit() {}

	click() {
		this.age.set(24);
	}
}
