import type { Config } from 'tailwindcss';
const plugin = require('tailwindcss/plugin');

const config: Config = {
	content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
	theme: {
		extend: {
			colors: {
				primary90: '#003D87',
				primary60: '#0F62FE',
				promary30: '#A6C8FF',
				white: '#ffffff',
				error: '#DA1E28',
				warning: '#DA1E28',
				success: '#DA1E28',
				overlay: '#121619 / 50%',
				coolGray10: '#f2f4f8',
				coolGray20: '#dde1e6',
				coolGray30: '#c1c7cd',
				coolGray40: '#a2a9b0',
				coolGray50: '#878d96',
				coolGray60: '#697077',
				coolGray70: '#4d5358',
				coolGray80: '#343a3f',
				coolGray90: '#21272a',
				coolGray100: '#121619',
			},
		},
		plugins: [
			// plugin(function ({addComponents}) {
			//   addComponents({
			//     '.heading1': {
			//     }
			//   })
			// })
		],
	},
};

// module.exports = {
// 	theme: {
// 		colors: {
// 			primary90: '#003D87',
// 			primary60: '#0F62FE',
// 			promary30: '#A6C8FF',
// 			white: '#ffffff',
// 			error: '#DA1E28',
// 			warning: '#DA1E28',
// 			success: '#DA1E28',
// 			overlay: '#121619 / 50%',
// 			coolGray10: '#f2f4f8',
// 			coolGray20: '#dde1e6',
// 			coolGray30: '#c1c7cd',
// 			coolGray40: '#a2a9b0',
// 			coolGray50: '#878d96',
// 			coolGray60: '#697077',
// 			coolGray70: '#4d5358',
// 			coolGray80: '#343a3f',
// 			coolGray90: '#21272a',
// 			coolGray100: '#121619',
// 		},
// 	},

// 	plugins: [
// 		plugin(function ({ matchUtilities, theme }: any) {
// 			matchUtilities({
// 				'.card': {
// 					backgroundColor: theme('colors.error'),
// 				},
// 			});
// 		}),
// 	],
// };

export default config;
