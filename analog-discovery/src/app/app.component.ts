import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {SupabaseService} from './services/supabase.service';
import AccountComponent from './pages/(auth)/account.page';
import AuthComponent from './pages/(auth)/login.page';

@Component({
	selector: 'analog-discovery-root',
	standalone: true,
	imports: [RouterOutlet, AccountComponent, AuthComponent],
	template: `
		<div class="container" style="padding: 50px 0 100px 0">
			@if(session) {
			<app-account [session]="session"></app-account>
			} @else {
			<app-auth></app-auth>
			}
		</div>

		<hr />

		<router-outlet />
	`,
})
export class AppComponent {
	session = this.supabase.session;

	constructor(private readonly supabase: SupabaseService) {}

	ngOnInit() {
		this.supabase.authChanges((_, session) => (this.session = session));
	}
}
