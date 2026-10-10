/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
  	extend: {
  		fontFamily: {
  			display: ['"EB Garamond"', 'Garamond', '"Iowan Old Style"', 'Georgia', 'serif'],
  			sans: ['"Instrument Sans"', 'system-ui', '-apple-system', '"Segoe UI"', 'sans-serif'],
  		},
  		boxShadow: {
  			card: 'var(--shadow-card)',
  			raised: 'var(--shadow-raised)',
  		},
  		borderRadius: {
  			xl: '1.25rem',
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			surface: {
  				page: 'hsl(var(--surface-page))',
  				card: 'hsl(var(--surface-card))',
  				sunken: 'hsl(var(--surface-sunken))',
  				hover: 'hsl(var(--surface-hover))'
  			},
  			ink: {
  				DEFAULT: 'hsl(var(--ink))',
  				muted: 'hsl(var(--ink-muted))',
  				inverse: 'hsl(var(--ink-inverse))'
  			},
  			brand: {
  				DEFAULT: 'hsl(var(--brand))',
  				on: 'hsl(var(--on-brand))',
  				ink: 'hsl(var(--brand-ink))',
  				soft: 'hsl(var(--brand-soft))'
  			},
  			sage: {
  				DEFAULT: 'hsl(var(--accent-fill))',
  				ink: 'hsl(var(--accent-ink))',
  				soft: 'hsl(var(--accent-soft))'
  			},
  			highlight: 'hsl(var(--highlight))',
  			line: {
  				DEFAULT: 'hsl(var(--line))',
  				strong: 'hsl(var(--line-strong))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
}

