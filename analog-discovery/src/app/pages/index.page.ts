import {Component} from '@angular/core';
import {RouterLink} from '@angular/router';

@Component({
	selector: 'app-home',
	standalone: true,
	imports: [RouterLink],
	template: `
		<section
			class="flex max-w-[64rem] flex-col items-center gap-4 text-center mx-auto py-6">
			<img
				class="h-12 w-12"
				src="https://analogjs.org/img/logos/analog-logo.svg"
				alt="AnalogJs logo. Two red triangles and a white analog wave in front" />
			<a
				class="rounded-2xl bg-zinc-200 px-4 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
				target="_blank"
				href="https://twitter.com/analogjs">
				Follow along on Twitter
			</a>
			<h1
				class="font-heading font-medium text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
				<span class="text-[#DD0031]">Analog.</span> The fullstack Angular
				meta-framework
			</h1>
			<p
				class="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
				Analog is for building applications and websites with Angular.
				<br />Powered by Vite.
			</p>
			<div class="space-x-4">
				<a
					class="inline-flex items-center justify-center text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-blue-500 text-zinc-50 hover:bg-blue-500/90 h-11 px-8 rounded-md"
					href="https://analogjs.org"
					>Read the docs</a
				><a
					target="_blank"
					rel="noreferrer"
					class="inline-flex items-center justify-center text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background border border-input hover:bg-zinc-100 hover:text-blue-500 h-11 px-8 rounded-md"
					href="https://github.com/analogjs/analog"
					>Star on GitHub</a
				>
			</div>
		</section>
		<a
			class="inline-flex items-center justify-center text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-blue-500 text-zinc-50 hover:bg-blue-500/90 h-11 px-8 rounded-md"
			routerLink="notes">
			Voir les notes
		</a>
	`,
})
export default class HomeComponent {}
