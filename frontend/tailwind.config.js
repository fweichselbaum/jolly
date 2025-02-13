import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./index.html",
		"./src/**/*.{js,ts,svelte}",
	],
	theme: {
		extend: {},
	},
	plugins: [daisyui],
	daisyui: {
		themes: [{
			customLight: {
				"primary": "#fac975",
				"secondary": "#f6714c",
				"accent": "#952847",
				"neutral": "#171616",
				"base-100": "#fff",
				"info": "#e0f2fe",
				"success": "#ecfccb",
				"warning": "#fef3c7",
				"error": "#fee2e2",
			},
			customDark: {
				"primary": "#fac975",
				"secondary": "#f6714c",
				"accent": "#952847",
				"neutral": "#fdedbd",
				"base-100": "#171616",
				"info": "#e0f2fe",
				"success": "#ecfccb",
				"warning": "#fef3c7",
				"error": "#fee2e2",
			},
		},],
		darkTheme: "dark",
		base: true,
		styled: true,
		utils: true,
		logs: false,
	},
}

