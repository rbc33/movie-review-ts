import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
	plugins: [react(), tailwindcss()],
	preview: {
		host: true,
		port: 4173,
		allowedHosts: ['movies.rbenthem.com'],
	},
})
