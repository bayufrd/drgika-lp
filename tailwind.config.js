/** @type {import('tailwindcss').Config} */

module.exports = {
	content: ["./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				inter: ["Inter", "sans-serif"]
			},
			colors: {
				"primary": "#505050",
				"secondary": "#888888",
				"accent": "#FC6C85",
			},
			animation: {
				'float': 'float 4s ease-in-out infinite',
			  },
			  keyframes: {
				float: {
				  '0%, 100%': { transform: 'translateY(0)' },
				  '50%': { transform: 'translateY(-20px)' },
				}
			  }
		}
	},
	plugins: []
};
