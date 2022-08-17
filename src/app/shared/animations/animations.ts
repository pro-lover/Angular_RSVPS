import { animate, animateChild, animation, group, query, style, transition, trigger } from '@angular/animations';

export const transitionAnimation = animation([
	style({
		height: '{{ height }}',
		opacity: '{{ opacity }}',
		//backgroundColor: '{{ backgroundColor }}'
	}),
	animate('{{ time }}')
]);

export const slideInAnimation =
trigger('routeAnimations', [
	//transition('HomePage <=> AboutPage', [
	transition('* <=> *', [
		style({ position: 'relative' }),
		query(':enter, :leave', [
				style({
					position: 'absolute',
					top: 0,
					left: 0,
					width: '100%'
				})
		], { optional: true }),
		query(':enter', [
				style({ left: '-100%' })
		], { optional: true }),
		query(':leave', animateChild(), { optional: true }),
		group([
			query(':leave', [
				animate('300ms ease-out', style({ left: '100%' }))
			], { optional: true }),
			query(':enter', [
				animate('300ms ease-out', style({ left: '0%' }))
			], { optional: true }),
		]),
	])
]);
