import {Component} from '@angular/core';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {SupabaseService} from '../../services/supabase.service';

@Component({
	selector: 'app-auth',
	standalone: true,
	imports: [ReactiveFormsModule],
	template: `
		<div class="row flex-center flex">
			<div
				class="flex flex-col items-center px-12 py-6 outline mx-auto rounded-md mt-6"
				aria-live="polite">
				<h1 class="text-xl">Supabase + Angular</h1>
				<p class="italic py-4">Sign in via magic link with your email below</p>
				<form
					[formGroup]="signInForm"
					(ngSubmit)="onSubmit()"
					class="bg-slate-300/15 px-12 py-6 flex flex-col items-center">
					<div>
						<label
							for="email"
							class="block mb-2 text-sm font-medium text-gray-900 dark:text-whit"
							>Email</label
						>
						<input
							id="email"
							formControlName="email"
							class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
							type="email"
							placeholder="Your email" />
					</div>
					<div class="mt-6">
						<button
							type="submit"
							class="bg-gray-700 p-2 rounded-md my-2 text-white"
							[disabled]="loading">
							{{ loading ? 'Loading' : 'Send magic link' }}
						</button>
					</div>
				</form>
			</div>
		</div>
	`,
})
export default class AuthComponent {
	loading = false;

	signInForm = this.formBuilder.group({
		email: '',
	});

	constructor(
		private readonly supabase: SupabaseService,
		private readonly formBuilder: FormBuilder
	) {}

	async onSubmit(): Promise<void> {
		try {
			this.loading = true;
			const email = this.signInForm.value.email as string;
			const {error} = await this.supabase.signIn(email);
			if (error) throw error;
			alert('Check your email for the login link!');
		} catch (error) {
			if (error instanceof Error) {
				alert(error.message);
			}
		} finally {
			this.signInForm.reset();
			this.loading = false;
		}
	}
}
