import type { Config } from 'tailwindcss';

const config: Config = {
	content: ['./src/**/*.{js,ts,jsx,tsx,mdx,scss}'],
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
			spacing: {
				x1: '8px',
				x2: '16px',
				x3: '24px',
				x4: '32px',
				x6: '48px',
				x8: '64px',
				x10: '80px',
				x12: '96px',
			},
			fontSize: {
				'heading-1': ['54px', { lineHeight: '110%', letterSpacing: '0', fontWeight: '700' }],
				'heading-2': ['42px', { lineHeight: '110%', letterSpacing: '0', fontWeight: '700' }],
				'heading-3': ['32px', { lineHeight: '110%', letterSpacing: '0', fontWeight: '700' }],
				'heading-4': ['24px', { lineHeight: '110%', letterSpacing: '0', fontWeight: '700' }],
				'heading-5': ['20px', { lineHeight: '110%', letterSpacing: '0', fontWeight: '700' }],
				'heading-6': ['18px', { lineHeight: '110%', letterSpacing: '0', fontWeight: '700' }],

				'subtitle-M': ['16px', { lineHeight: '110%', letterSpacing: '0', fontWeight: '500' }],
				'subtitle-S': ['14px', { lineHeight: '110%', letterSpacing: '0', fontWeight: '500' }],

				'body-L': ['18px', { lineHeight: '140%', letterSpacing: '0', fontWeight: '400' }],
				'body-M': ['16px', { lineHeight: '140%', letterSpacing: '0', fontWeight: '400' }],
				'body-S': ['14px', { lineHeight: '140%', letterSpacing: '0', fontWeight: '400' }],
				'body-XS': ['12px', { lineHeight: '140%', letterSpacing: '0', fontWeight: '400' }],
				'body-XXS': ['10px', { lineHeight: '140%', letterSpacing: '0', fontWeight: '400' }],

				caption: ['20px', { lineHeight: '100%', letterSpacing: '1px', fontWeight: '700' }],

				'button-L': ['20px', { lineHeight: '100%', letterSpacing: '0.5px', fontWeight: '500' }],
				'button-M': ['16px', { lineHeight: '100%', letterSpacing: '0.5px', fontWeight: '500' }],
				'button-S': ['14px', { lineHeight: '100%', letterSpacing: '0.5px', fontWeight: '500' }],

				'menu&tabs': ['16px', { lineHeight: '100%', letterSpacing: '0', fontWeight: '500' }],
			},
		},
		plugins: [],
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
